import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateMembershipComponent } from './create-membership/create-membership.component';
import { CreateNFTOptionsComponent } from './create-nft-options/create-nft-options.component';
import { CreateNFTStyleComponent } from './create-nft-style/create-nft-style.component';
import { CreateNFTComponent } from './create-nft/create-nft.component';
import { CreateNFTMintingComponent } from './create-ntf-minting/create-nft-minting.component';



@NgModule({
  declarations: [
    CreateNFTComponent,
    CreateNFTOptionsComponent,
    CreateNFTStyleComponent,
    CreateNFTMintingComponent,
    CreateMembershipComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CreateNFTDiloagModule {

  static getCreateNFTComponent(): typeof CreateNFTComponent {
    return CreateNFTComponent;
  }
  static getCreateNFTOptionsComponent(): typeof CreateNFTOptionsComponent {
    return CreateNFTOptionsComponent;
  }
  static getCreateNFTStyleComponent(): typeof CreateNFTStyleComponent {
    return CreateNFTStyleComponent;
  }
  static getCreateNFTMintingComponent(): typeof CreateNFTMintingComponent {
    return CreateNFTMintingComponent;
  }
}
