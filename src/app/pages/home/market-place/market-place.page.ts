/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreatorService } from '@app/@core/services/creator.service';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
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

  creator$ = this.creatorService.Creator$;
  destroy$ = new Subject();

  public isLoading:boolean;
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
    private creatorService: CreatorService,
    private groupService: GroupService,
    private nftService: NFTService,
    private routeService: RouteService,
    private stripeService: StripeService,
  ) {
    this.page = 1;
    this.isLoading = false;
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
    this.groupService.getAllGroupsByClub(this.clubName, 0, 0);
  }

  getNfts(): void {
    if (this.isLoading) return
    this.isLoading = true;
    this.nftService.getAllNftsByClub(this.clubName, this.page, this.nftLimit ,this.searchValu ,this.filterGroup?.id, this.type)
      .pipe(take(1))
      .subscribe((result:ApiResponse<NFTList>) => {
        if (!result.hasErrors()) {
          this.nftList = result.data;
        }
        this.isLoading = false;
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

  filterBy (group:Group) :void {
    this.page = 1;
    this.filterGroup = group;
    this.getNfts();
  }

  search(searchValu: string): void {
    this.searchValu = searchValu;
    this.page = 1;
    this.getNfts();
  }

  setType(type:string): void {
    this.type = type;
    this.page = 1;
    this.getNfts();
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
