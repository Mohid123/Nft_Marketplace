import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TrimModule } from './../../../@core/directives/trim/trim.module';
import { AdminSignInComponent } from './admin-sign-in/admin-sign-in.component';
import { UserSignInComponent } from './user-sign-in/user-sign-in.component';
import { UserSignUpComponent } from './user-sign-up/user-sign-up.component';

@NgModule({
  declarations: [
    UserSignInComponent,
    AdminSignInComponent,
    UserSignUpComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    TrimModule,
    ToastrModule.forRoot()
  ]
})

export class AuthDialogModule {

  static getUserSignInComponent(): typeof UserSignInComponent {
    return UserSignInComponent;
  }

  static getUserSignUpComponent(): typeof UserSignUpComponent {
    return UserSignUpComponent;
  }

  static getAdminSignInComponent(): typeof AdminSignInComponent {
    return AdminSignInComponent;
  }
}
