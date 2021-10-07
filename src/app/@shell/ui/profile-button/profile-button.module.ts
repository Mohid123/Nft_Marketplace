import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ProfileButtonComponent } from './profile-button/profile-button.component';



@NgModule({
  declarations: [
    ProfileButtonComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule
  ],
  exports: [
    ProfileButtonComponent
  ]
})
export class ProfileButtonModule { }
