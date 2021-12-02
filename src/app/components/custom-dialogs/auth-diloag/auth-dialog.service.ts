import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminSignInComponent } from './admin-sign-in/admin-sign-in.component';
import { AsyncAuthDialog } from './async-auth-dialog';
import { UserSignInComponent } from './user-sign-in/user-sign-in.component';
import { UserSignUpComponent } from './user-sign-up/user-sign-up.component';

@Injectable({
  providedIn: 'root',
})
export class AuthDialogService extends AsyncAuthDialog<UserSignInComponent | AdminSignInComponent | UserSignUpComponent> {
  constructor(protected matDialog: MatDialog) {
    super(matDialog);
  }

  async openUserSignIn(): Promise<MatDialogRef<UserSignInComponent>> {
    const { AuthDialogModule: AuthDialogModule } = await import(
      './../auth-diloag/auth-diloag.module'
    );
    return this.matDialog.open(AuthDialogModule.getUserSignInComponent(), {
      disableClose: false,
      panelClass: ['user-sign-in-dialog-overlay', 'action-dialog'],
    });
  }

  async openUserSignUp(): Promise<MatDialogRef<UserSignUpComponent>> {
    const { AuthDialogModule: AuthDialogModule } = await import(
      './../auth-diloag/auth-diloag.module'
    );
    return this.matDialog.open(AuthDialogModule.getUserSignUpComponent(), {
      disableClose: false,
      panelClass: ['user-sign-up-dialog-overlay', 'action-dialog'],
    });
  }

  async openAdminSignIn(): Promise<MatDialogRef<AdminSignInComponent>> {
    const { AuthDialogModule: AuthDialogModule } = await import(
      './../auth-diloag/auth-diloag.module'
    );
    return this.matDialog.open(AuthDialogModule.getAdminSignInComponent(), {
      disableClose: true,
      panelClass: ['admin-sign-in-dialog-overlay', 'action-dialog'],
    });
  }
}
