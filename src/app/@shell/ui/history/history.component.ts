import { Component, Input } from '@angular/core';
import { ResponseEventByNFT } from './../../../@core/models/response-events-by-nft.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {

  @Input() responseEventByNFT:ResponseEventByNFT;

}
