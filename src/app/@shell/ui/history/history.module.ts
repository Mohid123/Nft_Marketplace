import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomPipes } from './../../../@core/pipes/main-pipe.module';
import { TimeAgoPipe } from './../../../@core/pipes/time-ago.pipe';
import { HistoryComponent } from './history.component';



@NgModule({
  declarations: [HistoryComponent],
  imports: [
    CommonModule,
    CustomPipes,
  ],
  exports: [HistoryComponent],
  providers : [
    TimeAgoPipe
  ]
})
export class HistoryModule { }
