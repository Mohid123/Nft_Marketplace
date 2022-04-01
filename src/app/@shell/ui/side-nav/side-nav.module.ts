import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { NavListComponent } from './nav-list.component';


@NgModule({
  declarations: [
    NavListComponent
  ],
  imports: [

  CommonModule,
    MatListModule
  ],
  exports: [
    NavListComponent
  ]
})
export class SideNavModule { }
