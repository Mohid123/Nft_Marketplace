import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AdminSignInComponent } from './admin-sign-in/admin-sign-in.component';
import { UserSignInComponent } from './user-sign-in/user-sign-in.component';

@NgModule({
  declarations: [
    UserSignInComponent,
    AdminSignInComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    ToastrModule.forRoot()
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
