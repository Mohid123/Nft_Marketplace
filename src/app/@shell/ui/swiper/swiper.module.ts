import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SwiperModule } from 'swiper/angular';
import { BlurHashModule } from './../blurhash/blurhash.module';
import { SwiperComponent } from './swiper.component';


@NgModule({
  declarations: [
    SwiperComponent
  ],
  imports: [

  BlurHashModule,
  CommonModule,
    SwiperModule
  ],
  exports: [SwiperComponent]
})
export class SwipeModule { }
