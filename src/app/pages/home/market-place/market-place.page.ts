/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { take } from 'rxjs/operators';
import { environment } from './../../../../environments/environment.prod';
import { Group } from './../../../@core/models/group.model';
import { NFTList } from './../../../@core/models/NFTList.model';
import { ApiResponse } from './../../../@core/models/response.model';
import { GroupService } from './../../../@core/services/group.service';
import { NFTService } from './../../../@core/services/nft.service';
import { RouteService } from './../../../@core/services/route.service';


@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.page.html',
  styleUrls: ['./market-place.page.scss'],
})
export class MarketPlacePage implements OnInit {


  private _isLoading:boolean;

  public nftList: NFTList;
  public clubName: string;
  public limit = 6 ;
  public nftLimit = environment.limit ;
  public page:number;

  public groups$ = this.groupService.groups$;
  public filterGroup: Group;
  public searchValu = '';

  constructor(
    private customDialogService: CustomDialogService,
    private groupService: GroupService,
    private nftService: NFTService,
    private routeService: RouteService,
    private spinner: NgxSpinnerService,
  ) {
    this.page = 1;
    this._isLoading = false;
    this.clubName = this.routeService.clubName;
    this.getNfts();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    console.log('market palce:');
    this.groupService.getAllGroupsByClub(this.clubName, 0, 0);
    // this.nftService.getNft('');
  }

  getNfts(): void {
    if (this._isLoading) return
    this.nftService.getAllNftsByClub(this.clubName, this.page,this.searchValu ,this.filterGroup?.id)
      .pipe(take(1))
      .subscribe((result:ApiResponse<NFTList>) => {
        if (!result.hasErrors()) {
          this.nftList = result.data;
        }
        this._isLoading = false;
      });
  }

  next():void {
    this.page++;
    this.getNfts();
  }

  previous():void {
    this.page--;
    this.getNfts();
  }

  test() {
    this.customDialogService.showCreateNFTDialog();
  }

  test2() {
    this.customDialogService.showCreateNFTOptionsDialog();
  }

  priceModal() {
    // this.customDialogService.showCreateNFTStyleDialog();
  }

  filterBy (group:Group) :void {
    this.page = 1;
    this.filterGroup = group;
    this.getNfts();
    console.log('group:',group);

  }

  search(searchValu) {
    this.searchValu = searchValu;
    this.page = 1;
    this.getNfts();
  }
}
