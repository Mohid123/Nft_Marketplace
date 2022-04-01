import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SwiperModule } from 'swiper/angular';
import { SwiperComponent } from './swiper.component';



@NgModule({
  declarations: [
    SwiperComponent
  ],
  imports: [

  CommonModule,
    SwiperModule
  ],
  exports: [SwiperComponent]
})
export class SwipeModule { }
