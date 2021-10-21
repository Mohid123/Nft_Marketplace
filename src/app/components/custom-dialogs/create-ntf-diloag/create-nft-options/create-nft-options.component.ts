import { Component } from '@angular/core';
import { NFT } from '@app/@core/models/NFT.model';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
import { NFTService } from './../../../../@core/services/nft.service';

@Component({
  selector: 'app-create-nft-options',
  templateUrl: './create-nft-options.component.html',
  styleUrls: ['./create-nft-options.component.scss']
})
export class CreateNFTOptionsComponent {

  type: any

  constructor(
    private customDialogService: CustomDialogService,
    private nftService: NFTService,
  ) {

  }

  ticketsClick():void {

    this.nftService.createNft = new NFT();
    this.nftService.createNft.type = 'member';

    console.log(this.type);
    this.customDialogService.showCreateNFTDialog()
  }



  close():void {
    this.customDialogService.closeDialogs();
  }
}
