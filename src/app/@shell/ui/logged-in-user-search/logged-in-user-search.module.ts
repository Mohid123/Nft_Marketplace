import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoggedInUserSearchComponent } from './logged-in-user-search.component';



@NgModule({
  declarations: [LoggedInUserSearchComponent],
  imports: [
    CommonModule
  ],
  exports : [LoggedInUserSearchComponent]
})
export class LoggedInUserSearchModule { }
