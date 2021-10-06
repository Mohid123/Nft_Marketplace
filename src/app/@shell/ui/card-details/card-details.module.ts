import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardDetailsComponent } from './card-details.component';



@NgModule({
  declarations: [CardDetailsComponent],
  imports: [
    CommonModule
  ],
  exports: [CardDetailsComponent]
})
export class CardDetailsModule { }
