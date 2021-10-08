import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AsyncDialog } from '../async-dialog';
import { UserSignInComponent } from './user-sign-in/user-sign-in.component';

@Injectable({
  providedIn: 'root',
})
export class AuthDialogService extends AsyncDialog<UserSignInComponent> {
  constructor(protected matDialog: MatDialog) {
    super(matDialog);
  }

  async open(): Promise<MatDialogRef<UserSignInComponent>> {
    const { AuthDialogModule: AuthDialogModule } = await import(
      './../auth-diloag/auth-diloag.module'
    );
    return this.matDialog.open(AuthDialogModule.getUserSignInComponent(), {
      disableClose: true,
      panelClass: 'sign-in-dialog-overlay',
    });
  }
}
