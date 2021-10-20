import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NFT } from '@app/@core/models/NFT.model';
import { take } from 'rxjs/operators';
import { ResponseEventByNFT } from './../../../@core/models/response-events-by-nft.model';
import { ApiResponse } from './../../../@core/models/response.model';
import { NFTService } from './../../../@core/services/nft.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.page.html',
  styleUrls: ['./card-detail.page.scss']
})

export class CardDetailPage  implements OnInit {

  public nft: NFT;
  public responseEventByNFT: ResponseEventByNFT;
  public nftId: string;
  public clubName: string;

  constructor(
    private activatedRoute : ActivatedRoute,
    private nftService: NFTService,
  ) {
    this.nftId = this.activatedRoute.snapshot.params.nftId;
    this.clubName = this.activatedRoute.snapshot.params.clubName;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {
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
    // this.nftService.getNft('');
  }

}
