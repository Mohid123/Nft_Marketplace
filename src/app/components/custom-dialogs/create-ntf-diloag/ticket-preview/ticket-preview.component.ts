import { Component, Input, OnInit } from '@angular/core';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
import { NFTService } from '@app/@core/services/nft.service';

@Component({
  selector: 'app-ticket-preview',
  templateUrl: './ticket-preview.component.html',
  styleUrls: ['./ticket-preview.component.scss']
})
export class TicketPreviewComponent implements OnInit {

  @Input() img: any;

  constructor(
    private customDialogService: CustomDialogService,
    private nftService:NFTService,
  ) { }

  ngOnInit(): void {
    this.nftService.createNFTImg;
  }

  close():void {
    this.customDialogService.showCreateNFTticketDialog();
  }

}
