import { Component } from '@angular/core';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';

@Component({
  selector: 'app-create-nft-style',
  templateUrl: './create-nft-style.component.html',
  styleUrls: ['./create-nft-style.component.scss']
})
export class CreateNFTStyleComponent {

  constructor(
    private customDialogService: CustomDialogService,
  ) { }

  close():void {
    this.customDialogService.closeDialogs();
  }
}
