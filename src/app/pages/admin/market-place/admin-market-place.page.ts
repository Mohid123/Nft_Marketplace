import { Component } from '@angular/core';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';

@Component({
  selector: 'app-admin-market-place',
  templateUrl: './admin-market-place.page.html',
  styleUrls: ['./admin-market-place.page.scss'],
})
export class AdminMarketPlacePage {
  constructor(
    private customDialogService: CustomDialogService,
  ) {}

  createNFT():void {
    this.customDialogService.showCreateNFTOptionsDialog();
  }
}
