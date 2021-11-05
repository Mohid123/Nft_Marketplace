import { Component, Input } from '@angular/core';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
import { MediaService } from '@app/@core/services/media.service';
import { ToastrService } from 'ngx-toastr';
import { Group } from '../../../../@core/models/group.model';
import { NFT } from '../../../../@core/models/NFT.model';
import { NFTService } from '../../../../@core/services/nft.service';

@Component({
  selector: 'app-create-nft-ticket-options',
  templateUrl: './create-nft-ticket-options.component.html',
  styleUrls: ['./create-nft-ticket-options.component.scss'],
})
export class CreateNFTStyleComponent {
  @Input() group: Group;
  img: FormData;
  nftForm: NFT;

  price: any;
  copy: number;

  constructor(
    private customDialogService: CustomDialogService,
    private nftService: NFTService,
    private mediaService: MediaService,
    private toastr: ToastrService
  ) {
    this.img = this.nftService.createNFTImg;
    this.nftForm = this.nftService.createNFT;
  }

  save():void {
    this.nftForm.price = String(this.price);
    this.nftForm.numberOfCopies = +this.copy;
    this.nftService.requestCreateNFT(this.nftForm,this.img);
  }

  close(): void {
    this.customDialogService.closeDialogs();
  }
}
