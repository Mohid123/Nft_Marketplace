/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthDialogService } from '@app/components/custom-dialogs/auth-diloag/auth-dialog.service';

@Injectable({
  providedIn: 'root',
})
export class CustomDialogService {

  private _mapDialogref: MatDialogRef<any, any>;

  constructor(
    protected router: Router,
    private authDialogService: AuthDialogService,
    public matDialog: MatDialog
  ) {}


  // openUserSignInDialog(): void {
  //   this.matDialog.open(UserSignInComponent);
  // }

  async ShowUserSignInDialog() {
    this.matDialog.closeAll();
    this._mapDialogref = await this.authDialogService.openUserSignIn();
    // (await this._mapDialogref).afterClosed().subscribe((result) => {
    //   console.log('Mat Dialog Results user sign in:', result);
    // });
  }

  async ShowAdminSignInDialog() {
    this.matDialog.closeAll();
    this._mapDialogref = await this.authDialogService.openAdminSignIn();
    // (await this._mapDialogref).afterClosed().subscribe((result) => {
    //   console.log('Mat Dialog Results admin sign in:', result);
    // });
  }

  closeDialogs() {
    this.matDialog.closeAll();
  }

}
