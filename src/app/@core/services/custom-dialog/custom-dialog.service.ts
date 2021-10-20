/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthDialogService } from '@app/components/custom-dialogs/auth-diloag/auth-dialog.service';
import { CreateGroupService } from './../../../components/custom-dialogs/create-group-dialog/create-group.service';
import { CreateNFTDiloagService } from './../../../components/custom-dialogs/create-ntf-diloag/create-nft-diloag.service';
import { StripeDialogService } from './../../../components/custom-dialogs/stripe-dialog/stripe-dialog.service';

@Injectable({
  providedIn: 'root',
})
export class CustomDialogService {

  private _mapDialogref: MatDialogRef<any, any>;

  constructor(
    protected router: Router,
    private authDialogService: AuthDialogService,
    private createNFTDiloagService: CreateNFTDiloagService,
    private createGroupService: CreateGroupService,
    private stripeDialogService: StripeDialogService,
    public matDialog: MatDialog
  ) {}


  // openUserSignInDialog(): void {
  //   this.matDialog.open(UserSignInComponent);
  // }

  async showUserSignInDialog(isPage = false) {
    this.matDialog.closeAll();
    this._mapDialogref = await this.authDialogService.openUserSignIn();
    this._mapDialogref.componentInstance.isPage = isPage;
    // (await this._mapDialogref).afterClosed().subscribe((result) => {
    //   console.log('Mat Dialog Results user sign in:', result);
    // });
  }

  async showAdminSignInDialog(isPage = false) {
    this.matDialog.closeAll();
    this._mapDialogref = await this.authDialogService.openAdminSignIn();
    this._mapDialogref.componentInstance.isPage = isPage;
    // (await this._mapDialogref).afterClosed().subscribe((result) => {
    //   console.log('Mat Dialog Results admin sign in:', result);
    // });
  }

  async showCreateNFTDialog() {
    this.matDialog.closeAll();
    this._mapDialogref = await this.createNFTDiloagService.openCreateNFTComponent();
    // (await this._mapDialogref).afterClosed().subscribe((result) => {
    //   console.log('Mat Dialog Results admin sign in:', result);
    // });
  }

  async showCreateNFTOptionsDialog() {
    this.matDialog.closeAll();
    this._mapDialogref = await this.createNFTDiloagService.openCreateNFTOptionsComponent();
    // (await this._mapDialogref).afterClosed().subscribe((result) => {
    //   console.log('Mat Dialog Results admin sign in:', result);
    // });
  }

  async showCreateNFTStyleDialog() {
    this.matDialog.closeAll();
    this._mapDialogref = await this.createNFTDiloagService.openCreateNFTStyleComponent();
    // (await this._mapDialogref).afterClosed().subscribe((result) => {
    //   console.log('Mat Dialog Results admin sign in:', result);
    // });
  }

  async showCreateGroupDialog() {
    this.matDialog.closeAll();
    this._mapDialogref = await this.createGroupService.openCreateGroup();
    // (await this._mapDialogref).afterClosed().subscribe((result) => {
    //   console.log('Mat Dialog Results admin sign in:', result);
    // });
  }

  async showStripeKeyDialog() {
    this.matDialog.closeAll();
    this._mapDialogref = await this.stripeDialogService.openStripeKeyComponent();
    // (await this._mapDialogref).afterClosed().subscribe((result) => {
    //   console.log('Mat Dialog Results admin sign in:', result);
    // });
  }

  async showStripePaymenDialog() {
    this.matDialog.closeAll();
    this._mapDialogref = await this.stripeDialogService.openStripePaymentComponent();
    // (await this._mapDialogref).afterClosed().subscribe((result) => {
    //   console.log('Mat Dialog Results admin sign in:', result);
    // });
  }

  closeDialogs() {
    this.matDialog.closeAll();
  }

}
