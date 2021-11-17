/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NFTService } from '@app/@core/services/nft.service';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Group } from './../../../@core/models/group.model';
import { NFT } from './../../../@core/models/NFT.model';
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
  public isLoading$ = this.groupService.isLoading$;
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
  priceRange = [
    {
      from:  '€1 - €100',
    },
    {
      from: '€100 - €200',
    },
    {
      from: '€200 - €300',
    },
    {
      from: '€300 - €400',
    },
    {
      from: '€400 - €500',
    },
    {
      from: '€500 - €600',
    },
    {
      from: '€600 - €700',
    },
    {
      from: '€700 - €800',
    },
    {
      from: '€800 - €900',
    },
    {
      from: '€900 - €1000',
    },
  ]

  orderBy = [
    {
      order: 'Ascending',
    },
    {
      order: 'Descending',
    }
  ]

  nftStatus = [
    {
      name: 'Active',
    },
    {
      name: 'Draft',
    },

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

  updateStatus(id:string, status:string):void {
    this.nftService.updateNft(id,status).pipe(take(1)).subscribe((result:ApiResponse<NFT>) => {
      if (!result.hasErrors()) {
        this.getSoldNFTs();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
