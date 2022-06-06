import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreatorService } from '@app/@core/services/creator.service';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, take, takeUntil } from 'rxjs/operators';
import { environment } from './../../../../environments/environment.prod';
import { Group } from './../../../@core/models/group.model';
import { NFTList } from './../../../@core/models/NFTList.model';
import { ResponseGroupsByClub } from './../../../@core/models/response-groups-by-club.model';
import { ApiResponse } from './../../../@core/models/response.model';
import { GroupService } from './../../../@core/services/group.service';
import { NFTService } from './../../../@core/services/nft.service';
import { RouteService } from './../../../@core/services/route.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit, OnDestroy {

  destroy$ = new Subject();
  creator$ = this.creatorService.Creator$;
  groups$ = this.groupService.groups$;

  public type = '';
  finished: boolean;

  public nftList: NFTList;
  public clubName: string;
  public groups: Group[];
  public totalCount: number;

  public limit = 6;
  public page: number;
  public scrollPage: number;
  public nftLimit = environment.limit;

  public isLoading: boolean;
  public filterGroup: Group;
  private getAllNftsByUser$ = new BehaviorSubject<Array<any>>([]);
  public nfts$: Observable<Array<any>> = this.getAllNftsByUser$.asObservable();
  public searchValue = '';

  filterButtons = [
    { text: '', isClicked: true },
    { text: 'Membership Card', isClicked: false },
    { text: 'Ticket', isClicked: false },
    { text: 'Custom', isClicked: false },
  ]

  constructor(
    private authService: AuthService,
    private creatorService: CreatorService,
    private groupService: GroupService,
    private nftService: NFTService,
    private routeService: RouteService,
  ) {
    this.page = 1;
    this.isLoading = false;
    this.routeService.clubName$.pipe(distinctUntilChanged(),takeUntil(this.destroy$)).subscribe((clubName) => {
      this.clubName = clubName;
      if(this.clubName){
        this.getGroups();
        this.getNfts();
      }
    });
  }

  ngOnInit(): void {
    const param = {
      limit: this.limit,
    };
    this.groupService.getAllGroupsByClub(this.clubName, 0, param);
  }

  getNfts(): void {
    if (this.isLoading) return;
    this.isLoading = true;
    this.nftService
      .getAllNftsByUser(
        this.clubName,
        this.authService?.loggedInUser?.id,
        this.page,
        this.searchValue,
        this.filterGroup?.id,
        this.type,
      )
      .pipe(take(1))
      .subscribe((result: ApiResponse<NFTList>) => {
        if (!result.hasErrors()) {
          this.getAllNftsByUser$.next(result.data?.data)
          this.nftList = result.data;
        }
        this.isLoading = false;
      });
  }

  onScroll() {
    this.nftService.getAllNftsByUser(this.clubName,this.authService?.loggedInUser?.id, this.scrollPage++, this.searchValue ,this.filterGroup?.id, this.type)
    .pipe(map((res: ApiResponse<NFTList> ) => {
      if(this.nftList?.totalCount >= this.scrollPage * this.nftLimit) {
        debugger
        this.finished = false
        const initialData =  this.getAllNftsByUser$.value;
        const latestData = [...initialData, ...res.data?.data]
        this.getAllNftsByUser$.next(latestData);
      }
      else if(this.nftList?.totalCount <= this.scrollPage * this.nftLimit) {
        debugger
        this.finished = true;
      }
      // console.log(this.getAllNfts$.value)
    })).subscribe();
  }

  setActive(button: any): void {
    for(const but of this.filterButtons) {
      but.isClicked = false;
    }
     button.isClicked = true;
  }

  next():void {
    this.page++;
    this.getNfts();
  }

  previous(): void {
    this.page--;
    this.getNfts();
  }

  getGroups(): void {
    this.groupService
      .getUsersGroups(
        this.clubName,
        this.authService?.loggedInUser?.id,
        this.page,
      )
      .pipe(take(1))
      .subscribe((result: ApiResponse<ResponseGroupsByClub>) => {
        if (!result.hasErrors()) {
          this.totalCount = result.data.totalCount;
          this.groups = result.data?.data;
        }
      });
  }

  filterBy(group: Group): void {
    this.page = 1;
    this.filterGroup = group;
    this.getNfts();
    this.scrollPage = 2;
    debugger
    this.onScroll();
  }

  search(searchValue: string): void {
    this.searchValue = searchValue;
    this.page = 1;
    this.getNfts();
  }

  setType(type: string): void {
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
