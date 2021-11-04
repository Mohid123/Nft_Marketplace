import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CardDetailsComponent } from './card-details.component';



@NgModule({
  declarations: [CardDetailsComponent],
  imports: [
    NgxSpinnerModule,
    CommonModule
  ],
  exports: [CardDetailsComponent]
})
export class CardDetailsModule { }
