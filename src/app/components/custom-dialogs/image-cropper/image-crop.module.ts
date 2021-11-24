import { ImageCropperModule } from 'ngx-image-cropper';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// import { ImageCropperModule } from './image-cropper/image-cropper.module';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';



@NgModule({
  declarations: [
    ImageCropperComponent
  ],
  imports: [
    CommonModule,
    ImageCropperModule,
  ]
})
export class ImageCropModule {
  getImageCropperComponent

  static getImageCropperComponent(): typeof ImageCropperComponent {
    return ImageCropperComponent;
  }
}
