/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input } from '@angular/core';
import { NFT } from './../../../@core/models/NFT.model';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent {

  @Input() nft:NFT;

}
