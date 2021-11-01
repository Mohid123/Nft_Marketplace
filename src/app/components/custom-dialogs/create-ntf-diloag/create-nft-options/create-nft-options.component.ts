import { Component } from '@angular/core';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';

@Component({
  selector: 'app-create-nft-options',
  templateUrl: './create-nft-options.component.html',
  styleUrls: ['./create-nft-options.component.scss']
})
export class CreateNFTOptionsComponent {

  type: any

  constructor(
    private customDialogService: CustomDialogService
  ) {

  }

  ticketsClick():void {
    if(this.type == "Tickets")
      this.customDialogService.showCreateNFTticketDialog();
    else
      this.customDialogService.showCreateMembership();
  }

  close():void {
    this.customDialogService.closeDialogs();
  }
}
