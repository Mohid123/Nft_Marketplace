import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/response.model';
import { MediaUpload } from './../models/requests/media-upload.model';
import { ApiService } from './api.service';

type uploadMedia = MediaUpload;
@Injectable({
  providedIn: 'root'
})
export class MediaUploadService extends ApiService<uploadMedia> {

  constructor( protected http: HttpClient) {
    super(http);
  }

  uploadMedia(folderName, file): Observable<ApiResponse<uploadMedia>>{

    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.post(`/media-upload/mediaFiles/${folderName}`, formData)
  }
}
