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
  @Input() videoFile: any;
  @Input() isTicket: any;
  @Input() isMembership: any;



  constructor(
    private customDialogService: CustomDialogService,
    private nftService:NFTService,
  ) { }

  ngOnInit(): void {
    this.nftService.createNFTImg;
  }

  close():void {
    if (this.isTicket) this.customDialogService.showCreateNFTticketDialog();
    else if(this.isMembership) this.customDialogService.showCreateMembership();
    else this.customDialogService.showCreateCustomTicketDialog()
  }

}
