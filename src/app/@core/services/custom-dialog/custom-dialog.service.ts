/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NFT } from '@app/@core/models/NFT.model';
import { AuthDialogService } from '@app/components/custom-dialogs/auth-diloag/auth-dialog.service';
import { AuthService } from '@app/pages/auth/services/auth.service';
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
    private authService: AuthService,
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

  async showCreateNFTticketDialog() {
    this.matDialog.closeAll();
    this._mapDialogref = await this.createNFTDiloagService.openCreateNFTticketComponent();
    // (await this._mapDialogref).afterClosed().subscribe((result) => {
    //   console.log('Mat Dialog Results admin sign in:', result);
    // });
  }

  async showCreateMembership() {
    this.matDialog.closeAll();
    this._mapDialogref = await this.createNFTDiloagService.openCreateMembershipComponent();
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

  async showCreateNFTticketOptionsDialog() {
    this.matDialog.closeAll();
    this._mapDialogref = await this.createNFTDiloagService.openCreateNFTticketOptionsComponent();
    // (await this._mapDialogref).afterClosed().subscribe((result) => {
    //   console.log('Mat Dialog Results admin sign in:', result);
    // });
  }

  async showCreateNFTticketPreviewDialog(img) {
    this.matDialog.closeAll();
    this._mapDialogref = await this.createNFTDiloagService.openCreateNFTticketPreviewComponent();
    this._mapDialogref.componentInstance.img = img;
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

  async showStripePaymenDialog(nft:NFT) {
    if(this.authService.isLoggedIn) {
    this.matDialog.closeAll();
    this._mapDialogref = await this.stripeDialogService.openStripePaymentComponent();
    this._mapDialogref.componentInstance.nft = nft;
    // (await this._mapDialogref).afterClosed().subscribe((result) => {
    //   console.log('Mat Dialog Results admin sign in:', result);
    // });
    } else {
      this.showUserSignInDialog();
    }
  }

  closeDialogs() {
    this.matDialog.closeAll();
  }

}
