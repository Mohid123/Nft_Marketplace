import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AsyncCreateNFTDialog } from './async-create-nft-dialog';
import { CreateNFTOptionsComponent } from './create-nft-options/create-nft-options.component';
import { CreateNFTStyleComponent } from './create-nft-style/create-nft-style.component';
import { CreateNFTComponent } from './create-nft/create-nft.component';
import { CreateNFTMintingComponent } from './create-ntf-minting/create-nft-minting.component';

@Injectable({
  providedIn: 'root',
})
export class CreateNFTDiloagService extends AsyncCreateNFTDialog< CreateNFTComponent | CreateNFTOptionsComponent | CreateNFTStyleComponent | CreateNFTMintingComponent> {
  constructor(protected matDialog: MatDialog) {
    super(matDialog);
  }

  async openCreateNFTComponent(): Promise<MatDialogRef<CreateNFTComponent>> {
    const { CreateNFTDiloagModule: CreateNFTDiloagModule } = await import(
      './create-nft-diloag.module'
    );
    return this.matDialog.open(CreateNFTDiloagModule.getCreateNFTComponent(), {
      disableClose: true,
      panelClass: ['create-nft-dialog-overlay', 'action-dialog'],
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

  async openCreateNFTStyleComponent(): Promise<MatDialogRef<CreateNFTStyleComponent>> {
    const { CreateNFTDiloagModule: CreateNFTDiloagModule } = await import(
      './create-nft-diloag.module'
    );
    return this.matDialog.open(CreateNFTDiloagModule.getCreateNFTStyleComponent(), {
      disableClose: true,
      panelClass: ['create-nft-style-dialog-overlay', 'action-dialog'],
    });
  }

  async openCreateNFTMintingComponent(): Promise<MatDialogRef<CreateNFTMintingComponent>> {
    const { CreateNFTDiloagModule: CreateNFTDiloagModule } = await import(
      './create-nft-diloag.module'
    );
    return this.matDialog.open(CreateNFTDiloagModule.getCreateNFTMintingComponent(), {
      disableClose: true,
      panelClass: ['create-nft-style-dialog-overlay', 'action-dialog'],
    });
  }
}
