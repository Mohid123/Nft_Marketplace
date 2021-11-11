/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { distinctUntilChanged, take, takeUntil } from 'rxjs/operators';
import { Group } from './../../../@core/models/group.model';
import { NFTList } from './../../../@core/models/NFTList.model';
import { ApiResponse } from './../../../@core/models/response.model';
import { GroupService } from './../../../@core/services/group.service';
import { NFTService } from './../../../@core/services/nft.service';
import { RouteService } from './../../../@core/services/route.service';
import { StripeService } from './../../../@core/services/stripe.service';


@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.page.html',
  styleUrls: ['./market-place.page.scss'],
})
export class MarketPlacePage implements OnInit ,OnDestroy {

  destroy$ = new Subject();

  private _isLoading:boolean;
  public type = '';

  public nftList: NFTList;
  public clubName: string;
  public limit = 6 ;
  public nftLimit = 12 ;
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
    private stripeService: StripeService,
  ) {
    this.page = 1;
    this._isLoading = false;
    this.routeService.clubName$.pipe(takeUntil(this.destroy$)).subscribe((clubName) => {
      this.clubName = clubName;
      if(this.clubName)
        this.getNfts();
    });

    this.stripeService.purchaseSuccess$.pipe(distinctUntilChanged(),takeUntil(this.destroy$)).subscribe((nftId) => {
      if(nftId && this.clubName)
        this.getNfts();
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {
    this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
    }, 1000);
    console.log('market palce:');
    this.groupService.getAllGroupsByClub(this.clubName, 0, 0);
  }

  getNfts(): void {
    this.spinner.show();
    if (this._isLoading) return
    this.nftService.getAllNftsByClub(this.clubName, this.page, this.nftLimit ,this.searchValu ,this.filterGroup?.id, this.type)
      .pipe(take(1))
      .subscribe((result:ApiResponse<NFTList>) => {
        if (!result.hasErrors()) {
          this.nftList = result.data;
        }
        this.spinner.hide();
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
    this.customDialogService.showCreateNFTticketDialog();
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

  setType(type:string) {
    this.type = type;
    this.page = 1;
    this.getNfts();
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
