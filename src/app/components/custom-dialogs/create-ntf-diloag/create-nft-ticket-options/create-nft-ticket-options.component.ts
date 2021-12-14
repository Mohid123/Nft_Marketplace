import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
import { MediaService } from '@app/@core/services/media.service';
import { ToastrService } from 'ngx-toastr';
import { Group } from '../../../../@core/models/group.model';
import { NFT } from '../../../../@core/models/NFT.model';
import { NFTService } from '../../../../@core/services/nft.service';
import { TransactionService } from './../../../../@core/services/transaction.service';

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
  balance: number;

  public createNft: FormGroup;

  constructor(
    private customDialogService: CustomDialogService,
    private nftService: NFTService,
    private mediaService: MediaService,
    private toastr: ToastrService,
    private transactionService: TransactionService,
    private formBuilder: FormBuilder,
  ) {
    this.balance = this.transactionService.checkBalance();

    this.createNft = this.formBuilder.group({
      price: new FormControl('', [Validators.required, Validators.min(1) ,Validators.max(999999)]),
      copies: new FormControl('', [Validators.required, Validators.min(1) ,Validators.max(this.balance || 999999)]),
      mint: new FormControl(true),
      sale: new FormControl(false),
    });

    this.img = this.nftService.createNFTImg;
    this.nftForm = this.nftService.createNFT;
  }

  save():void {
    this.nftForm.price = this.createNft.controls.price.value;
    // this.createNft = this.nftService.createNftForm;
    this.nftForm.numberOfCopies = this.createNft.controls.copies.value;
    this.nftForm.forSale = this.createNft.controls.sale.value;
    this.nftForm.freezeNft = this.createNft.controls.mint.value;
    this.nftService.requestCreateNFT(this.nftForm,this.img);
  }

  clickSale(data): void {
    if(data == false) {
      this.createNft.controls.mint.setValue(true);
      this.createNft.controls.mint.disable();
    } else {
      this.createNft.controls.mint.enable();
    }
  }

  close(): void {
    this.customDialogService.closeDialogs();
  }
}
