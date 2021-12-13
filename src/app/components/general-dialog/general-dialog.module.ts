import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialog } from './confirmation/confirmation.dialog';



@NgModule({
  declarations: [
    ConfirmationDialog,
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ]
})
export class GeneralDialogModule { }
