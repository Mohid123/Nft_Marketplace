import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NftCardComponent } from './nft-card.component';



@NgModule({
  declarations: [NftCardComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NftCardComponent
  ]
})
export class CardModule { }
