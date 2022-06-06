/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { ViewportScroller } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreatorService } from '@app/@core/services/creator.service';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Group } from './../../../@core/models/group.model';
import { NFTList } from './../../../@core/models/NFTList.model';
import { ApiResponse } from './../../../@core/models/response.model';
import { GroupService } from './../../../@core/services/group.service';
import { NFTService } from './../../../@core/services/nft.service';
import { RouteService } from './../../../@core/services/route.service';
import { StripeService } from './../../../@core/services/stripe.service';

// install Swiper modules
SwiperCore.use([Pagination, Navigation ]);


@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.page.html',
  styleUrls: ['./market-place.page.scss'],
  // encapsulation: ViewEncapsulation.None

})
export class MarketPlacePage implements OnInit ,OnDestroy {

  creator$ = this.creatorService.Creator$;
  destroy$ = new Subject();
  finished: boolean;

  public isLoading:boolean;
  public type = '';

  public nftList: NFTList;
  public clubName: string;
  public limit = 6 ;
  public nftLimit = 12 ;
  public page:number;
  public scrollPage: number;

  public groups$ = this.groupService.groups$;
  public filterGroup: Group;
  public searchValu = '';

  private getAllNfts$ = new BehaviorSubject<Array<any>>([]);
  public nfts$: Observable<Array<any>> = this.getAllNfts$.asObservable();
  filterButtons = [
    { text: '', isClicked: true },
    { text: 'Membership Card', isClicked: false },
    { text: 'Ticket', isClicked: false },
    { text: 'Custom', isClicked: false },
  ]

  constructor(
    private customDialogService: CustomDialogService,
    private creatorService: CreatorService,
    private groupService: GroupService,
    private scroller: ViewportScroller,
    private nftService: NFTService,
    private routeService: RouteService,
    private stripeService: StripeService,
  ) {
    this.page = 1;
    this.scrollPage = 2;
    this.isLoading = false;
    this.routeService.clubName$.pipe(distinctUntilChanged(),takeUntil(this.destroy$)).subscribe((clubName) => {
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
    const param = {
      limit: this.limit
    }
    this.groupService.getAllGroupsByClub(this.clubName, 0, param);
  }

  setActive(button: any): void {
    for(const but of this.filterButtons) {
      but.isClicked = false;
    }
     button.isClicked = true;
  }

  onScroll() {
    // if (this.isLoading) return

    if(this.nftList?.totalCount >= this.scrollPage * this.nftLimit) {

      this.finished = false
      debugger
      this.nftService.getAllNftsByClub(this.clubName, this.scrollPage++, this.nftLimit ,this.searchValu ,this.filterGroup?.id, this.type)
      .pipe(tap((res: ApiResponse<NFTList> ) => {
        const initialData =  this.getAllNfts$.value;
        const latestData = [...initialData, ...res.data?.data]
        this.getAllNfts$.next(latestData);
        // console.log(this.getAllNfts$.value)
      })).subscribe();
    }
    else if(this.nftList?.totalCount <= this.scrollPage * this.nftLimit) {
      debugger
      this.finished = true;
    }

        // if(this.nftList?.totalCount <= this.page * this.nftLimit) {
        //   this.finished = true;
        // }
        // debugger
        // const completeData = latestData[latestData.length - 1]
        // const lastItem = res.data?.data[res.data?.data.length - 1]
        // if(completeData === lastItem){

        //   this.isLoading = false;
        // }


  }


  getNfts(): void {
    if (this.isLoading) return
    this.isLoading = true;
    this.nftService.getAllNftsByClub(this.clubName, this.page, this.nftLimit ,this.searchValu ,this.filterGroup?.id, this.type)
      .pipe(tap((result:ApiResponse<NFTList>) => {
         if (!result.hasErrors()) {
          this.getAllNfts$.next(result.data?.data)
          this.nftList = result.data;
        }
      }))
      .subscribe(() => {
        this.isLoading = false;
      });
  }

  goDown1() {
    this.scroller.scrollToAnchor("targetRed");
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
    debugger
    this.type = type;
    this.page = 1;
    this.getNfts();
    this.scrollPage = 2;
    this.onScroll();
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
