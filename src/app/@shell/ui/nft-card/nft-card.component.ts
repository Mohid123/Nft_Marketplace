import { Component, Input, OnDestroy } from '@angular/core';
import { NFT } from '@app/@core/models/NFT.model';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { RouteService } from './../../../@core/services/route.service';

@Component({
  selector: 'app-nft-card',
  templateUrl: './nft-card.component.html',
  styleUrls: ['./nft-card.component.scss']
})
export class NftCardComponent implements OnDestroy {

  @Input() nft:NFT;

  destroy$ = new Subject();
  public clubName: string;

  constructor(
    private routeService: RouteService,
  ) {
    this.routeService.clubName$.pipe(distinctUntilChanged(),takeUntil(this.destroy$)).subscribe((clubName) => {
      this.clubName = clubName;
    });
  }


  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
