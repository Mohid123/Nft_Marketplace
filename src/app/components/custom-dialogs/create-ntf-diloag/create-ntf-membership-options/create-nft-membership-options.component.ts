import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
import { NFTService } from '@app/@core/services/nft.service';
import { ToastrService } from 'ngx-toastr';
import { Group } from './../../../../@core/models/group.model';
import { NFT } from './../../../../@core/models/NFT.model';
import { MediaService } from './../../../../@core/services/media.service';

@Component({
  selector: 'app-create-nft-membership-options',
  templateUrl: './create-nft-membership-options.component.html',
  styleUrls: ['./create-nft-membership-options.component.scss']
})
export class CreateNFTMembershipOptionsComponent  {
  @Input() group: Group;
  img: FormData;
  nftForm: NFT;

  public createNft: FormGroup;

  price: any;

  constructor(
    private customDialogService: CustomDialogService,
    private nftService: NFTService,
    private mediaService: MediaService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
  ) {

    this.createNft = this.formBuilder.group({
      price: new FormControl('', [Validators.required, Validators.max(999999)]),
      // mint: [false, Validators.requiredTrue],
      // sale: [false, Validators.requiredTrue],


    });
    this.img = this.nftService.createNFTImg;
    this.nftForm = this.nftService.createNFT;
  }



  save():void {
    this.nftForm.price = this.createNft.controls.price.value;
    // this.createNft = this.nftService.createNftForm;
    this.nftForm.numberOfCopies = 1;
    this.nftService.requestCreateNFT(this.nftForm,this.img);
  }

  close(): void {
    this.customDialogService.closeDialogs();
  }
}
