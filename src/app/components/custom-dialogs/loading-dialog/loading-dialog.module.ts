import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingDialogComponent } from './loading-dialog/loading-dialog/loading-dialog.component';



@NgModule({
  declarations: [
    LoadingDialogComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LoadingDialogModule {
  static getLoadingDialogComponent(): typeof LoadingDialogComponent {
    return LoadingDialogComponent;
  }
}
