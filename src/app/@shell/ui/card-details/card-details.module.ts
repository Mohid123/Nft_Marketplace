import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CardDetailsComponent } from './card-details.component';



@NgModule({
  declarations: [CardDetailsComponent],
  imports: [
    NgxSpinnerModule,
    MatDialogModule,
    CommonModule
  ],
  exports: [CardDetailsComponent]
})
export class CardDetailsModule { }
