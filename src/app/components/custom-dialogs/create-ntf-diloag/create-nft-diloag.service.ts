import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AsyncCreateNFTDialog } from './async-create-nft-dialog';
import { CreateMembershipComponent } from './create-membership/create-membership.component';
import { CreateNFTOptionsComponent } from './create-nft-options/create-nft-options.component';
import { CreateNFTStyleComponent } from './create-nft-ticket-options/create-nft-ticket-options.component';
import { CreateNFTticketComponent } from './create-nft-ticket/create-nft-ticket.component';
import { CreateNFTMembershipOptionsComponent } from './create-ntf-membership-options/create-nft-membership-options.component';

@Injectable({
  providedIn: 'root',
})
export class CreateNFTDiloagService extends AsyncCreateNFTDialog< CreateNFTticketComponent | CreateMembershipComponent | CreateNFTOptionsComponent | CreateNFTStyleComponent | CreateNFTMembershipOptionsComponent> {
  constructor(protected matDialog: MatDialog) {
    super(matDialog);
  }

  async openCreateNFTticketComponent(): Promise<MatDialogRef<CreateNFTticketComponent>> {
    const { CreateNFTDiloagModule: CreateNFTDiloagModule } = await import(
      './create-nft-diloag.module'
    );
    return this.matDialog.open(CreateNFTDiloagModule.getCreateNFTticketComponent(), {
      disableClose: true,
      panelClass: ['create-nft-dialog-overlay', 'action-dialog'],
    });
  }

  async openCreateMembershipComponent(): Promise<MatDialogRef<CreateMembershipComponent>> {
    const { CreateNFTDiloagModule: CreateNFTDiloagModule } = await import(
      './create-nft-diloag.module'
    );
    return this.matDialog.open(CreateNFTDiloagModule.getCreateMembershipComponent(), {
      disableClose: true,
      panelClass: ['create-nft-membership-dialog-overlay', 'action-dialog'],
    });
  }

  async openCreateNFTOptionsComponent(): Promise<MatDialogRef<CreateNFTOptionsComponent>> {
    const { CreateNFTDiloagModule: CreateNFTDiloagModule } = await import(
      './create-nft-diloag.module'
    );
    return this.matDialog.open(CreateNFTDiloagModule.getCreateNFTOptionsComponent(), {
      disableClose: true,
      panelClass: ['create-nft-options-dialog-overlay', 'action-dialog'],
    });
  }

  async openCreateNFTticketOptionsComponent(): Promise<MatDialogRef<CreateNFTStyleComponent>> {
    const { CreateNFTDiloagModule: CreateNFTDiloagModule } = await import(
      './create-nft-diloag.module'
    );
    return this.matDialog.open(CreateNFTDiloagModule.getCreateNFTticketOptionsComponent(), {
      disableClose: true,
      panelClass: ['create-nft-style-dialog-overlay', 'action-dialog'],
    });
  }

  async openCreateNFTMembershipOptionsComponent(): Promise<MatDialogRef<CreateNFTMembershipOptionsComponent>> {
    const { CreateNFTDiloagModule: CreateNFTDiloagModule } = await import(
      './create-nft-diloag.module'
    );
    return this.matDialog.open(CreateNFTDiloagModule.getCreateNFTMembershipOptionsComponent(), {
      disableClose: true,
      panelClass: ['create-nft-style-dialog-overlay', 'action-dialog'],
    });
  }
}
