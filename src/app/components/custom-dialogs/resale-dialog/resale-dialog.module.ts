import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaxLengthModule } from './../../../@core/directives/max-length/max-length.module';
import { NumberOnlyModule } from './../../../@core/directives/number-only/number-only.module';
import { ResaleDialog } from './resale/resale.dialog';

@NgModule({
  declarations: [
    ResaleDialog
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaxLengthModule,
    NumberOnlyModule,
  ],
  exports: [
    ResaleDialog
  ]
})
export class ResaleDialogModule {
  static getResaleDialog(): typeof ResaleDialog {
    return ResaleDialog;
  }
}
