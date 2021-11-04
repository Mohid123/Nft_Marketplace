import { Component, OnInit } from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
import { environment } from '@environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { take } from 'rxjs/operators';
import { NFTList } from './../../../@core/models/NFTList.model';
import { ApiResponse } from './../../../@core/models/response.model';
import { NFTService } from './../../../@core/services/nft.service';
import { RouteService } from './../../../@core/services/route.service';

@Component({
  selector: 'app-admin-market-place',
  templateUrl: './admin-market-place.page.html',
  styleUrls: ['./admin-market-place.page.scss'],
})
export class AdminMarketPlacePage implements OnInit {

  public nftList: NFTList;
  public clubName: string;

  private _isLoading:boolean;

  public limit = environment.limit  ;
  public nftLimit = environment.limit ;
  public page:number;
  public searchValu = '';

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];


  constructor(
    private customDialogService: CustomDialogService,
    private nftService: NFTService,
    private routeService: RouteService,
    private spinner: NgxSpinnerService
  ) {
    this.page = 1;
    this._isLoading = false;
    this.clubName = this.routeService.clubName;
    this.getNfts();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {
    console.log('market palce:');
    // this.nftService.getNft('');
  }

  getNfts(): void {
    if (this._isLoading) return
    this.spinner.show();
    this.nftService.getAllNftsAdminPanel(this.clubName, this.page, this.searchValu )
      .pipe(take(1))
      .subscribe((result:ApiResponse<NFTList>) => {
        console.log('res:',result);
        setTimeout(() => {
          this.spinner.hide();
          }, 500);
        if (!result.hasErrors()) {
          this.nftList = result.data;
        }
        this._isLoading = false;
      });
  }

  createNFT():void {
    this.customDialogService.showCreateNFTOptionsDialog();
  }

  search(searchValu) {
    this.searchValu = searchValu;
    this.page = 1;
    this.getNfts();
  }

  next():void {
    this.page++;
    this.getNfts();
  }

  previous():void {
    this.page--;
    this.getNfts();
  }

}
