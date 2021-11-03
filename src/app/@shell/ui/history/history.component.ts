import { Component, Input } from '@angular/core';
import { ResponseEventByNFT } from './../../../@core/models/response-events-by-nft.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {

  @Input() responseEventByNFT:ResponseEventByNFT;
  // @Input() nft:NFT;

  calculateDiff(createdAt){
    const currentDate = new Date();
    createdAt = new Date(createdAt);

     return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(createdAt.getFullYear(), createdAt.getMonth(), createdAt.getDate()) ) /(1000 * 60 * 60 * 24));
   }

}
