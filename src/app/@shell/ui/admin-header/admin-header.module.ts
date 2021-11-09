import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileButtonModule } from '../profile-button/profile-button.module';
import { AdminHeaderComponent } from './admin-header/admin-header.component';



@NgModule({
  declarations: [
    AdminHeaderComponent
  ],
  imports: [
    CommonModule,
    ProfileButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AdminHeaderComponent,
  ]
})
export class AdminHeaderModule { }
