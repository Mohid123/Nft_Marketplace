import { Component, Input, OnInit } from '@angular/core';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
import { NFT } from './../../../@core/models/NFT.model';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {
  public userName: any
  public profilePic: any

  @Input() nft:NFT;
  constructor(
    private customDialogService: CustomDialogService,
  ) { }

  ngOnInit(): void {
    this.userName = JSON.parse(localStorage.getItem('App/user'))
    this.profilePic = JSON.parse(localStorage.getItem('App/user'))

  }

  buyNow():void {
    this.customDialogService.showStripePaymenDialog(this.nft);
  }
}
