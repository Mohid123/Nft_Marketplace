import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppBannerComponent } from './app-banner.component';



@NgModule({
  declarations: [AppBannerComponent],
  imports: [
    CommonModule
  ],
  exports: [AppBannerComponent]
})
export class AppBannerModule { }
