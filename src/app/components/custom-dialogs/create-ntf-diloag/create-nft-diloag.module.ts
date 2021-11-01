import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateMembershipComponent } from './create-membership/create-membership.component';
import { CreateNFTOptionsComponent } from './create-nft-options/create-nft-options.component';
import { CreateNFTStyleComponent as CreateNFTticketOptionsComponent } from './create-nft-ticket-options/create-nft-ticket-options.component';
import { CreateNFTticketComponent } from './create-nft-ticket/create-nft-ticket.component';
import { CreateNFTMembershipOptionsComponent } from './create-ntf-membership-options/create-nft-membership-options.component';

@NgModule({
  declarations: [
    CreateNFTticketComponent,
    CreateNFTOptionsComponent,
    CreateNFTticketOptionsComponent,
    CreateNFTMembershipOptionsComponent,
    CreateMembershipComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CreateNFTDiloagModule {

  static getCreateNFTticketComponent(): typeof CreateNFTticketComponent {
    return CreateNFTticketComponent;
  }
  static getCreateNFTOptionsComponent(): typeof CreateNFTOptionsComponent {
    return CreateNFTOptionsComponent;
  }
  static getCreateMembershipComponent(): typeof CreateMembershipComponent {
    return CreateMembershipComponent;
  }
  static getCreateNFTticketOptionsComponent(): typeof CreateNFTticketOptionsComponent {
    return CreateNFTticketOptionsComponent;
  }
  static getCreateNFTMembershipOptionsComponent(): typeof CreateNFTMembershipOptionsComponent {
    return CreateNFTMembershipOptionsComponent;
  }
}
