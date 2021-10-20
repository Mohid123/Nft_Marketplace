/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input } from '@angular/core';
import { NFT } from './../../../@core/models/NFT.model';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent {
  public userName: any
  public profilePic: any

  @Input() nft:NFT;

  ngOnInit(): void {
    this.userName = JSON.parse(localStorage.getItem('App/user'))
    this.profilePic = JSON.parse(localStorage.getItem('App/user'))

  }

}
