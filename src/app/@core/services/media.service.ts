import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { MediaUpload } from '../models/requests/media-upload.model';
import { ResponseAddMedia } from '../models/response-add-media.model';
import { ApiResponse } from '../models/response.model';
import { ApiService } from './api.service';

type uploadMedia = MediaUpload | ResponseAddMedia | any;
@Injectable({
  providedIn: 'root'
})
export class MediaService extends ApiService<uploadMedia> {


  maxWidth = 538; // Max width for the image
  maxHeight = 529;    // Max height for the image

  constructor(
    @Inject(DOCUMENT) private document: Document,
    protected http: HttpClient,
    protected toastrService: ToastrService) {
    super(http);
  }

  uploadMedia(folderName: string, file:FormData): Observable<ApiResponse<uploadMedia>>{
    return this.postMedia(`/media-upload/mediaFiles/${folderName}`, file).pipe(take(1),tap((result:ApiResponse<uploadMedia>)=>{
      if (result.hasErrors()) {
        this.toastrService.error(result?.errors[0]?.error?.message)
      }
    }))
  }

  convertToImg (singlefile :string, fileName:string) :Promise<File | null> {
    // console.log('si:',singlefile);
    // console.log('fi:',fileName);
    return new Promise<File>((resolve) => {
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = singlefile;
      // console.log('img:',img);
      img.onload = () => {
        canvas.width = 72;
        canvas.height = 64;
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0,72, 64); // destination rectangle
        resolve(this.dataURLtoFile(canvas.toDataURL(), fileName));
      }
    });
  }

  dataURLtoFile(dataurl:string, filename:string) :File {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  compressImage(singlefile) {
    return new Promise<any>((resolve, reject) => {
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = URL.createObjectURL(singlefile);
      img.onload = () => {
        const newSize = this.calculateAspectRatioFit(img?.width, img?.height);
        canvas.width = newSize.width;
        canvas.height = newSize.height;
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, newSize.width, newSize.height); // destination rectangle
        resolve(this.dataURLtoFile(canvas.toDataURL(), 'thumbnail.jpg'));
      }
    });
  }


  calculateAspectRatioFit(srcWidth, srcHeight): { width: number, height: number } {
    const ratio = Math.min(this.maxWidth / srcWidth, this.maxHeight / srcHeight);
    return { width: srcWidth * ratio, height: srcHeight * ratio };
  }

  public generateThumbnail(videoFile: Blob,imageName): Promise<any> {
    const video: HTMLVideoElement = this.document.createElement('video');
    const canvas: HTMLCanvasElement = this.document.createElement('canvas');
    const canvasCompressImage: HTMLCanvasElement = document.createElement('canvas');
    const context: CanvasRenderingContext2D = canvas.getContext('2d');
    const contextCompressImage: CanvasRenderingContext2D = canvasCompressImage.getContext('2d');
    return new Promise<any>((resolve, reject) => {
      canvas.addEventListener('error', reject);
      video.addEventListener('error', reject);
      video.addEventListener('loadedmetadata', () => {
        video.currentTime = Math.round(video.duration / 2);
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      });
      video.addEventListener('canplay', event => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        var img = new Image();
        img.src = canvas.toDataURL();
        img.onload = () => {
          let newSize = this.calculateAspectRatioFit(img?.width, img?.height);
          canvasCompressImage.width = newSize.width;
          canvasCompressImage.height = newSize.height;
          contextCompressImage.drawImage(img, 0, 0, img.width, img.height, 0, 0, newSize.width, newSize.height); // destination rectangle
          resolve(this.dataURLtoFile(canvasCompressImage.toDataURL(), imageName + '.jpg'));
        }
      });
      if (videoFile.type) {
        video.setAttribute('type', videoFile.type);
      }
      video.preload = 'auto';
      video.src = window.URL.createObjectURL(videoFile);
      video.load();
    });
  }

}
