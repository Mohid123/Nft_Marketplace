import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlurHashModule } from './../blurhash/blurhash.module';
import { NftCardComponent } from './nft-card.component';


@NgModule({
  declarations: [NftCardComponent],
  imports: [

  CommonModule,
    RouterModule,
    BlurHashModule
  ],
  exports: [
    NftCardComponent
  ]
})
export class CardModule { }
