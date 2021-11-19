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
  public filterStatus: string;
  public filterPrice: string;
  public filterSort: string;

  public isLoading:boolean;
  public type = '';
  priceRange = [
    {
      from: '1',
      to: '100'
    },
    {
      from: '101',
      to: '200'
    },
    {
      from: '201',
      to: '300'
    },
    {
      from: '301',
      to: '400'
    },
    {
      from: '401',
      to: '500'
    },
    {
      from: '501',
      to: '600'
    },
    {
      from: '601',
      to: '700'
    },
    {
      from: '701',
      to: '800'
    },
    {
      from: '801',
      to: '900'
    },
    {
      from: '901',
      to: '1000'
    },
    {
      from: '+1000'
    },
    {
      from: 'All',
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
      name: 'All',
    },
    {
      name: 'Minted',
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
    this.isLoading = false;
    this.routeService.clubName$.pipe(takeUntil(this.destroy$)).subscribe((clubName) => {
      this.clubName = clubName;
      if(this.clubName)
        this.resetFilters();
    });
  }

  ngOnInit(): void {
    const param = {
      limit: this.limit
    }
    this.groupService.getAllGroupsByClub(this.clubName, 0, param);
  }

  getPendingForSaleNfts():void {
    const params: any = {
      nftStatus: this.filterStatus,
      price: this.filterPrice,
      tokenId: this.filterSort,
    }
    console.log('this.filterPrice:',this.filterPrice);
    console.log('params:',params);
    this.nftService.getPendingForSaleNfts(this.clubName,this.page, this.NftLimit ,params).pipe(take(1))
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
    this.getPendingForSaleNfts();
  }

  next():void {
    this.page++;
    this.getPendingForSaleNfts();
  }

  previous():void {
    this.page--;
    this.getPendingForSaleNfts();
  }

  filterBy (group:Group) :void {
    this.page = 1;
    this.filterGroup = group;
    this.getPendingForSaleNfts();
  }

  filterByStatus(status: string):void {
    this.page = 1;
    this.filterStatus = status;
    this.getPendingForSaleNfts();
  }

  filterByPrice(price: string):void {
    this.page = 1;
    this.filterPrice = price;
    console.log('this.filterPrice:',this.filterPrice);
    this.getPendingForSaleNfts();
  }

  filterBySort(sort: string):void {
    this.page = 1;
    this.filterSort = sort;
    this.getPendingForSaleNfts();
  }

  resetFilters():void {
    this.page = 1;
    this.filterStatus = '';
    this.filterPrice = '';
    this.filterSort = '';
    this.getPendingForSaleNfts();
  }

  updateStatus(id:string, status:string):void {
    this.nftService.updateNft(id,status).pipe(take(1)).subscribe((result:ApiResponse<NFT>) => {
      if (!result.hasErrors()) {
        this.getPendingForSaleNfts();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
