/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';

@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.page.html',
  styleUrls: ['./market-place.page.scss']
})
export class MarketPlacePage implements OnInit {

  constructor( private customDialogService: CustomDialogService) {

   }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {
  }

  test(){
    this.customDialogService.ShowCreateNFTDialog();

  }

}
