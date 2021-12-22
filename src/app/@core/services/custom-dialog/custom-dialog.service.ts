/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NFT } from '@app/@core/models/NFT.model';
import { SubscriptionPlan } from '@app/@core/models/subscription-plan.model';
import { AuthDialogService } from '@app/components/custom-dialogs/auth-diloag/auth-dialog.service';
import { ResaleDialog } from '@app/components/custom-dialogs/resale-dialog/resale/resale.dialog';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ExportKeyService as ExportKeyDialogService } from '../../../components/custom-dialogs/export-key/export-key-dialog.service';
import { CreateGroupService } from './../../../components/custom-dialogs/create-group-dialog/create-group.service';
import { CreateNFTDiloagService } from './../../../components/custom-dialogs/create-ntf-diloag/create-nft-diloag.service';
import { ImageCropperService } from './../../../components/custom-dialogs/image-cropper/image-cropper.service';
import { LoadingDialogService } from './../../../components/custom-dialogs/loading-dialog/loading-dialog/loading-dialog.service';
import { StripeDialogService } from './../../../components/custom-dialogs/stripe-dialog/stripe-dialog.service';
import { ConfirmationDialog } from './../../../components/general-dialog/confirmation/confirmation.dialog';

@Injectable({
  providedIn: 'root',
})
export class CustomDialogService {

  private _imgCrop$ = new BehaviorSubject<any>(
    null,
  );
  public readonly imgCrop$: Observable<any> =
    this._imgCrop$.asObservable();

  private _mapDialogref: MatDialogRef<any, any>;
  private _imgCropDialogref: MatDialogRef<any, any>;

  constructor(
    protected router: Router,
    private authService: AuthService,
    private authDialogService: AuthDialogService,
    private createNFTDiloagService: CreateNFTDiloagService,
    private createGroupService: CreateGroupService,
    private exportKeyDialogService: ExportKeyDialogService,
    private loadingDialogService: LoadingDialogService,
    private stripeDialogService: StripeDialogService,
    private imageCropperService: ImageCropperService,
    public matDialog: MatDialog
  ) {}


  // openUserSignInDialog(): void {
  //   this.matDialog.open(UserSignInComponent);
  // }

  async showUserSignInDialog(isPage = false,page?:string) {
    this.matDialog.closeAll();
    this._mapDialogref = await this.authDialogService.openUserSignIn();
    this._mapDialogref.componentInstance.isPage = isPage;
    this._mapDialogref.componentInstance.page = page;
    // (await this._mapDialogref).afterClosed().subscribe((result) => {
    //   console.log('Mat Dialog Results user sign in:', result);
    // });
  }

  async showUserSignUpDialog(isPage = false,page?:string) {
    this.matDialog.closeAll();
    this._mapDialogref = await this.authDialogService.openUserSignUp();
    this._mapDialogref.componentInstance.isPage = isPage;
    this._mapDialogref.componentInstance.page = page;
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

  async showCreateCustomTicketDialog() {
    this.matDialog.closeAll();
    this._mapDialogref = await this.createNFTDiloagService.openCreateCustomticketComponent();
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

  async showCreateNFTMembershipOptionsDialog() {
    this.matDialog.closeAll();
    this._mapDialogref = await this.createNFTDiloagService.openCreateNFTMembershipOptionsComponent();
    // (await this._mapDialogref).afterClosed().subscribe((result) => {
    //   console.log('Mat Dialog Results admin sign in:', result);
    // });
  }

  async showCreateNFTticketPreviewDialog(img,isTicket, isMembership) {
    this.matDialog.closeAll();
    this._mapDialogref = await this.createNFTDiloagService.openCreateNFTticketPreviewComponent();
    this._mapDialogref.componentInstance.img = img;
    this._mapDialogref.componentInstance.isTicket = isTicket;
    this._mapDialogref.componentInstance.isMembership = isMembership;
    // this._mapDialogref.componentInstance.isTicket = isCustom;
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

  async showStripePaymenDialog(nft?:NFT, subscriptionPlan?: SubscriptionPlan) {
    if(this.authService.isLoggedIn) {
    this.matDialog.closeAll();
    this._mapDialogref = await this.stripeDialogService.openStripePaymentComponent();
    this._mapDialogref.componentInstance.nft = nft;
    this._mapDialogref.componentInstance.subscriptionPlan = subscriptionPlan;
    // (await this._mapDialogref).afterClosed().subscribe((result) => {
    //   console.log('Mat Dialog Results admin sign in:', result);
    // });
    } else {
      this.showUserSignInDialog();
    }
  }

  async showLoadingDialog(status) {
    this.matDialog.closeAll();
    this._mapDialogref = await this.loadingDialogService.getLoadingDialogComponent();
    this._mapDialogref.componentInstance.status = status;
  }

  async showExportKeyDialog() {
    this.matDialog.closeAll();
    this._mapDialogref = await this.exportKeyDialogService.getExportKeyComponent();
  }

  showImageCropperDialog(img,aspectRatio,maintainAspectRatio) {
    // this.matDialog.closeAll();
    return new Promise<MatDialogRef<any,any>>(async (resolve, reject) => {
      this._imgCropDialogref = await this.imageCropperService.openImageCropperComponent();
      this._imgCropDialogref.componentInstance.maintainAspectRatio = maintainAspectRatio;
      this._imgCropDialogref.componentInstance.aspectRatio = aspectRatio;
      this._imgCropDialogref.componentInstance.img = img;
      resolve(this._imgCropDialogref);
    })

  }

  closeImgCropDialogs(img) {
    this._imgCropDialogref.close(img);
  }

  closeDialogs() {
    this.matDialog.closeAll();
  }

  showConfirmationDialog(message,confirmButtonText,cancelButtonText) : MatDialogRef<ConfirmationDialog, any> {
    const dialogRef = this.matDialog.open(ConfirmationDialog,{
      panelClass: ['confirmation-dialog-overlay', 'action-dialog'],
    });

    dialogRef.componentInstance.message = message;
    dialogRef.componentInstance.confirmButtonText = confirmButtonText;
    dialogRef.componentInstance.cancelButtonText = cancelButtonText;
    return dialogRef;
  }

  async showReSaleDialog(nft) : Promise<MatDialogRef<ResaleDialog, any>> {
    const { ResaleDialogModule: ResaleDialogModule } = await import(
      '../../../components/custom-dialogs/resale-dialog/resale-dialog.module'
    );
    const dialogRef = this.matDialog.open(ResaleDialogModule.getResaleDialog(),{
      panelClass: ['resale-dialog-overlay', 'action-dialog'],
    });

    dialogRef.componentInstance.nft = nft;
    return dialogRef;
  }

}
