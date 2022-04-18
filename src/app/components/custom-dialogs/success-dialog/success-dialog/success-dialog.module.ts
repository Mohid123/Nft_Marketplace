import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SuccessDialogComponent } from './success-dialog/success-dialog/success-dialog.component';



@NgModule({
  declarations: [
    SuccessDialogComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SuccessDialogModule {
  static getSuccessDialogComponent(): typeof SuccessDialogComponent {
    return SuccessDialogComponent;
  }
}
