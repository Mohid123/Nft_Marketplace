import { Component, Input, OnDestroy } from '@angular/core';
import { LoggedInUser } from '@app/@core/models/logged-in-user.model';
import { NFT } from '@app/@core/models/NFT.model';
import { ApiResponse } from '@app/@core/models/response.model';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
import { NFTService } from '@app/@core/services/nft.service';
import { ROLE_TYPE_UTILS } from '@app/@core/utils/role-type.utils';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, take, takeUntil } from 'rxjs/operators';
import { RouteService } from './../../../@core/services/route.service';

@Component({
  selector: 'app-nft-card',
  templateUrl: './nft-card.component.html',
  styleUrls: ['./nft-card.component.scss']
})
export class NftCardComponent implements OnDestroy {

  @Input() nft:NFT;
  @Input() walletPage:boolean;
  roles = ROLE_TYPE_UTILS;

  destroy$ = new Subject();
  public clubName: string;

  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;
  loggedInUser$: Observable<LoggedInUser> = this.authService.loggedInUser$;
  role$: Observable<ROLE_TYPE_UTILS> = this.authService.role$;
  isAdminPanel$: Observable<boolean> = this.routeService.isAdminPanel$;

  constructor(
    private routeService: RouteService,
    private customDialogService: CustomDialogService,
    private authService: AuthService,
    private nftService: NFTService,
  ) {
    this.routeService.clubName$.pipe(distinctUntilChanged(),takeUntil(this.destroy$)).subscribe((clubName) => {
      this.clubName = clubName;
    });
  }

  buyNow():void {
    this.customDialogService.showStripePaymenDialog(this.nft);
  }

  async resale():Promise<void> {
    const dialogRef = await this.customDialogService.showReSaleDialog(this.nft);;
    dialogRef.afterClosed().subscribe((resalePrice: number) => {
      if(resalePrice > 0) {
        this.nftService.updateNftResaleStatus(this.nft.id , true , resalePrice.toString()).subscribe((result:ApiResponse<any>)=>{
          if (!result.hasErrors()) {
            this.nftService.getNft(this.nft.id).pipe(take(1)).subscribe((result:ApiResponse<NFT>) => {
              if (!result.hasErrors()) {
                // console.log('nft after activate resale:',result.data);
                this.nft = result.data;
              }
            });
          }
        })
      }
    });
  }

  cancelResale(): void {
    // console.log('cancelResale:',);
    this.nftService.updateNftResaleStatus(this.nft.id , false).subscribe((result:ApiResponse<any>)=>{
      if (!result.hasErrors()) {
        this.nftService.getNft(this.nft.id).pipe(take(1)).subscribe((result:ApiResponse<NFT>) => {
          if (!result.hasErrors()) {
            // console.log('nft after activate resale:',result.data);
            this.nft = result.data;
          }
        });
      }
    })
  }


  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
