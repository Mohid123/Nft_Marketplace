import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QrCodeModule } from 'ng-qrcode';
import { MaxLengthModule } from './../../../@core/directives/max-length/max-length.module';
import { CreateMembershipComponent } from './create-membership/create-membership.component';
import { CreateNFTOptionsComponent } from './create-nft-options/create-nft-options.component';
import { CreateNFTStyleComponent as CreateNFTticketOptionsComponent } from './create-nft-ticket-options/create-nft-ticket-options.component';
import { CreateNFTticketComponent } from './create-nft-ticket/create-nft-ticket.component';
import { CreateNFTMembershipOptionsComponent } from './create-ntf-membership-options/create-nft-membership-options.component';
import { TicketPreviewComponent } from './ticket-preview/ticket-preview.component';

@NgModule({
  declarations: [
    CreateNFTticketComponent,
    CreateNFTOptionsComponent,
    CreateNFTticketOptionsComponent,
    CreateNFTMembershipOptionsComponent,
    CreateMembershipComponent,
    TicketPreviewComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QrCodeModule,
    MaxLengthModule,
  ]
})
export class CreateNFTDiloagModule {

  static getCreateNFTticketComponent(): typeof CreateNFTticketComponent {
    return CreateNFTticketComponent;
  }
  static getCreateNFTticketPreviewComponent(): typeof TicketPreviewComponent {
    return TicketPreviewComponent;
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
