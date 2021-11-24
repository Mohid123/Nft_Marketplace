import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AsyncImageCropperDialog } from './async-image-cropper-dialog';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';

@Injectable({
  providedIn: 'root'
})
export class ImageCropperService extends AsyncImageCropperDialog<ImageCropperComponent> {

  constructor(protected matDialog: MatDialog) {
    super(matDialog);
  }

  async openImageCropperComponent(): Promise<
  MatDialogRef<ImageCropperComponent>
> {
  const { ImageCropModule: ImageCropperModule } = await import(
    './image-crop.module'
  );
  return this.matDialog.open(
    ImageCropperModule.getImageCropperComponent(),
    {
      disableClose: false,
      panelClass: ['image-cropper-overlay', 'action-dialog'],
    },
  );
}
}
