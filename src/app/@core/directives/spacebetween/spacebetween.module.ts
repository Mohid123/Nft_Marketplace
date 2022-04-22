import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SpaceBetweenDirective } from './space-between.directive';


@NgModule({
  declarations: [SpaceBetweenDirective],
  imports: [

  CommonModule
  ],

  exports: [SpaceBetweenDirective]
})
export class SpacebetweenModule { }
