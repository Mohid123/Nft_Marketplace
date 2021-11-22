/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';
import { CreatorService } from '@app/@core/services/creator.service';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
import { environment } from '@environments/environment';
import { Subject } from 'rxjs';
import { distinctUntilChanged, take, takeUntil } from 'rxjs/operators';
import { NFTList } from './../../../@core/models/NFTList.model';
import { ApiResponse } from './../../../@core/models/response.model';
import { NFTService } from './../../../@core/services/nft.service';
import { RouteService } from './../../../@core/services/route.service';

@Component({
  selector: 'app-admin-market-place',
  templateUrl: './admin-market-place.page.html',
  styleUrls: ['./admin-market-place.page.scss'],
})
export class AdminMarketPlacePage implements OnInit ,OnDestroy {

  creator$ = this.creatorService.Creator$;
  destroy$ = new Subject();
  public nftList: NFTList;
  public clubName: string;

  public isLoading:boolean;

  public limit = environment.limit  ;
  public nftLimit = environment.limit ;
  public page:number;
  public searchValu = '';
  public filterType: string;
  public filterStatus: string;
  public filterPrice: string;
  public filterSort: string;

  nftStatus = [
    {
      name: 'All',
    },
    {
      name: 'Active',
    },
    {
      name: 'Draft',
    },
    {
      name: 'Sold',
    },
    // {
    //   name: 'Resale',
    // },
    {
      name: 'Transferring',
    },
    {
      name: 'Minting',
    },
    {
      name: 'Minted',
    },
    // {
    //   name: 'Error',
    // },

  ]


  priceRange = [
    {
      from: 'All',
    },
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

  ]

  orderBy = [
    {
      order: 'Ascending',
    },
    {
      order: 'Descending',
    }
  ]

  types = [
    {
      type: 'Ticket'
    },
    {
      type: 'Membership Card'
    }
  ]


  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];


  constructor(
    private customDialogService: CustomDialogService,
    private creatorService: CreatorService,
    private nftService: NFTService,
    private routeService: RouteService,
  ) {
    this.page = 1;
    this.isLoading = false;
    this.clubName = this.routeService.clubName;
    this.getNfts();

    this.nftService.cardCreatedSuccess$.pipe(distinctUntilChanged(),takeUntil(this.destroy$)).subscribe((nftId) => {
      if(nftId && this.clubName)
        this.getNfts();
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {
    // console.log('market palce:');
    // this.nftService.getNft('');
  }

  getNfts(): void {
    if (this.isLoading) return
    const params: any = {
      nftStatus: this.filterStatus,
      price: this.filterPrice,
      tokenId: this.filterSort,
      type: this.filterType
    }
    this.isLoading = true;
    this.nftService.getAllNftsAdminPanel(this.clubName, this.page, this.searchValu , params)
      .pipe(take(1))
      .subscribe((result:ApiResponse<NFTList>) => {
        if (!result.hasErrors()) {
          this.nftList = result.data;
        }
        this.isLoading = false;
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

  filterByPrice(price: string):void {
    this.page = 1;
    this.filterPrice = price;
    this.getNfts();
  }

  filterByStatus(status: string):void {
    this.page = 1;
    this.filterStatus = status;
    this.getNfts();
  }

  filterBySort(sort: string):void {
    this.page = 1;
    this.filterSort = sort;
    this.getNfts();
  }

  filterByType(sort: string):void {
    this.page = 1;
    this.filterType = sort;
    this.getNfts();
  }

  resetFilters():void {
    this.page = 1;
    this.filterStatus = '';
    this.filterPrice = '';
    this.filterSort = '';
    this.filterType = '';
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

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

}
