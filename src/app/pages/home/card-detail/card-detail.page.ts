import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NFT } from '@app/@core/models/NFT.model';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ResponseEventByNFT } from './../../../@core/models/response-events-by-nft.model';
import { ApiResponse } from './../../../@core/models/response.model';
import { NFTService } from './../../../@core/services/nft.service';
import { StripeService } from './../../../@core/services/stripe.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.page.html',
  styleUrls: ['./card-detail.page.scss']
})

export class CardDetailPage  implements OnInit, OnDestroy {

  destroy$ = new Subject();
  public nft: NFT;
  public responseEventByNFT: ResponseEventByNFT;
  public nftId: string;
  public clubName: string;

  purchaseSuccess$ = this.stripeService.purchaseSuccess$;

  constructor(
    private activatedRoute : ActivatedRoute,
    private nftService: NFTService,
    private stripeService: StripeService,
  ) {
    this.nftId = this.activatedRoute.snapshot.params.nftId;
    this.clubName = this.activatedRoute.snapshot.params.clubName;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {

    this.getDetails();

    this.purchaseSuccess$.pipe(takeUntil(this.destroy$)).subscribe(id => {
      if(id == this.nft?.id) {
        this.getDetails();
      }
    })
    // this.nftService.getNft('');
  }

  getDetails():void {
    this.nftService.getNft(this.nftId).pipe(take(1)).subscribe((result:ApiResponse<NFT>) => {
      if (!result.hasErrors()) {
        this.nft = result.data;
      }
    });
    this.nftService.getEventsByNft(this.nftId).pipe(take(1)).subscribe((result:ApiResponse<ResponseEventByNFT>) => {
      if (!result.hasErrors()) {
        this.responseEventByNFT = result.data;
      }
    });
  }

  ngOnDestroy(): void {
      this.destroy$.complete();
      this.destroy$.unsubscribe();
  }

}
