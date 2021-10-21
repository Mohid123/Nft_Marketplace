import { Component } from '@angular/core';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
import { take } from 'rxjs/operators';
import { NFTService } from './../../../../@core/services/nft.service';

@Component({
  selector: 'app-create-nft-style',
  templateUrl: './create-nft-style.component.html',
  styleUrls: ['./create-nft-style.component.scss']
})
export class CreateNFTStyleComponent {
  price: any;
  constructor(
    private customDialogService: CustomDialogService,
    private nftService: NFTService,
  ) {
    console.log('this:',this.nftService.createNft);
  }

  save() {
    // this.nftService.createNft = new NFT();

    this.nftService.addNft(this.nftService.createNft).pipe(take(1)).subscribe(res=> {
      console.log('res:',res);
    });
  }

  close():void {
    this.customDialogService.closeDialogs();
  }
}
