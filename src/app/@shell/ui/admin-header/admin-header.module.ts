import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProfileButtonModule } from '../profile-button/profile-button.module';
import { AdminHeaderComponent } from './admin-header/admin-header.component';



@NgModule({
  declarations: [
    AdminHeaderComponent
  ],
  imports: [
    CommonModule,
    ProfileButtonModule
  ],
  exports: [
    AdminHeaderComponent,
  ]
})
export class AdminHeaderModule { }
