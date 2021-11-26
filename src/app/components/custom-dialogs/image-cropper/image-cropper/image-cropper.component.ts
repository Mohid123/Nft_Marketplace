import { Component, Input } from '@angular/core';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
import { NFTService } from '@app/@core/services/nft.service';
import { Dimensions, ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss']
})
export class ImageCropperComponent {

  @Input() img: any;
  @Input() aspectRatio: any;
  @Input() maintainAspectRatio: any;

  constructor(
    private customDialogService: CustomDialogService,
    private nftService:NFTService,
  ) {

  }

  close():void {
    this.customDialogService.closeImgCropDialogs(null);
    // if (this.isTicket) this.customDialogService.showCreateNFTticketDialog();
    // else this.customDialogService.showCreateMembership();
  }

  crop():void {
    this.customDialogService.closeImgCropDialogs(this.croppedImage);
  }

    imageChangedEvent: any = '';
    croppedImage: any = '';
    canvasRotation = 0;
    rotation = 0;
    scale = 1;
    showCropper = true;

    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
    }

    imageLoaded() {
        this.showCropper = true;
    }

    cropperReady(sourceImageDimensions: Dimensions) {
        console.log('Cropper ready', sourceImageDimensions);
    }

    loadImageFailed() {
        console.log('Load failed');
    }

}
