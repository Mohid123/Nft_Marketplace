import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminSignInComponent } from './admin-sign-in/admin-sign-in.component';
import { UserSignInComponent } from './user-sign-in/user-sign-in.component';

@NgModule({
  declarations: [
    UserSignInComponent,
    AdminSignInComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})

export class AuthDialogModule {

  static getUserSignInComponent(): typeof UserSignInComponent {
    return UserSignInComponent;
  }

  static getAdminSignInComponent(): typeof AdminSignInComponent {
    return AdminSignInComponent;
  }
}