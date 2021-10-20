import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NFT } from '@app/@core/models/NFT.model';
import { ApiResponse } from './../../../@core/models/response.model';
import { NFTService } from './../../../@core/services/nft.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.page.html',
  styleUrls: ['./card-detail.page.scss']
})

export class CardDetailPage  implements OnInit {

  public nft: NFT;
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
    this.nftService.getNft(this.nftId).subscribe((result:ApiResponse<NFT>) => {
      if (result.status) {
        this.nft = result.data;
      }
    });
    // this.nftService.getNft('');
  }

}
