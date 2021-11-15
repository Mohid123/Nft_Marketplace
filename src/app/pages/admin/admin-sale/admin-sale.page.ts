/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NFTService } from '@app/@core/services/nft.service';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Group } from './../../../@core/models/group.model';
import { NFTList } from './../../../@core/models/NFTList.model';
import { ApiResponse } from './../../../@core/models/response.model';
import { CreatorService } from './../../../@core/services/creator.service';
import { GroupService } from './../../../@core/services/group.service';
import { RouteService } from './../../../@core/services/route.service';
import { AuthService } from './../../auth/services/auth.service';

@Component({
  selector: 'app-admin-sale.page',
  templateUrl: './admin-sale.page.html',
  styleUrls: ['./admin-sale.page.scss']
})
export class AdminSalePage implements OnInit, OnDestroy {

  creator$ = this.creatorService.Creator$;
  destroy$ = new Subject();

  public clubName: string;

  public nftList: NFTList;
  public limit = 6 ;
  public NftLimit = 12 ;
  public page:number;

  public groups$ = this.groupService.groups$;
  public filterGroup: Group;

  public isLoading:boolean;
  public type = '';

  constructor(
    private authService: AuthService,
    private creatorService: CreatorService,
    private groupService: GroupService,
    private nftService: NFTService,
    private routeService: RouteService,
  ) {
    this.page = 1;
    this.isLoading = false;
    this.routeService.clubName$.pipe(takeUntil(this.destroy$)).subscribe((clubName) => {
      this.clubName = clubName;
      if(this.clubName)
        this.getSoldNFTs();
    });
  }

  ngOnInit(): void {
    this.groupService.getAllGroupsByClub(this.clubName, 0, 0);
  }

  getSoldNFTs():void {
    this.nftService.getRecentSoldNfts(this.page, this.NftLimit ,this.filterGroup?.id, this.type).pipe(take(1))
    .subscribe((result:ApiResponse<NFTList>) => {
      console.log('result.dataresult.data:',result.data);
      if (!result.hasErrors()) {
        this.nftList = result.data;
      }
      this.isLoading = false;
    });

  }

  setType(type:string): void {
    this.type = type;
    this.page = 1;
    this.getSoldNFTs();
  }

  next():void {
    this.page++;
    this.getSoldNFTs();
  }

  previous():void {
    this.page--;
    this.getSoldNFTs();
  }

  filterBy (group:Group) :void {
    this.page = 1;
    this.filterGroup = group;
    this.getSoldNFTs();
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
