import { Component } from '@angular/core';
import { NFT } from '@app/@core/models/NFT.model';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
import { NFTService } from '@app/@core/services/nft.service';

@Component({
  selector: 'app-create-nft-options',
  templateUrl: './create-nft-options.component.html',
  styleUrls: ['./create-nft-options.component.scss']
})
export class CreateNFTOptionsComponent {

  type: any

  constructor(
    private nftService: NFTService,
    private customDialogService: CustomDialogService,
  ) {

  }

  ticketsClick():void {
    this.nftService.createNFT = new NFT();
    this.nftService.createNFTImg = null;
    this.nftService.createNftForm = null;
    if(this.type == "Tickets")
      this.customDialogService.showCreateNFTticketDialog();
    else if (this.type == "CustomTickets")
      this.customDialogService.showCreateCustomTicketDialog();
    else
      this.customDialogService.showCreateMembership();
  }

  close():void {
    this.customDialogService.closeDialogs();
  }
}
