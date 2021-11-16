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

  nftStatus = [
    {
      name: 'Active',
    },
    {
      name: 'Draft',
    },
    {
      name: 'Sold',
    },
    {
      name: 'Resale',
    },
    {
      name: 'Transfering',
    },
    {
      name: 'Minting',
    },
    {
      name: 'Minted',
    }
  ]


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
    console.log('market palce:');
    // this.nftService.getNft('');
  }

  getNfts(): void {
    if (this.isLoading) return
    this.isLoading = true;
    this.nftService.getAllNftsAdminPanel(this.clubName, this.page, this.searchValu )
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
