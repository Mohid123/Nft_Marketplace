import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrimDirective } from './trim.directive';



@NgModule({
  declarations: [
    TrimDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TrimDirective,
  ],
})
export class TrimModule { }
