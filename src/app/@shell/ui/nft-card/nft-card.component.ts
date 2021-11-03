import { Component, Input, OnDestroy } from '@angular/core';
import { LoggedInUser } from '@app/@core/models/logged-in-user.model';
import { NFT } from '@app/@core/models/NFT.model';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
import { ROLE_TYPE_UTILS } from '@app/@core/utils/role-type.utils';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { RouteService } from './../../../@core/services/route.service';

@Component({
  selector: 'app-nft-card',
  templateUrl: './nft-card.component.html',
  styleUrls: ['./nft-card.component.scss']
})
export class NftCardComponent implements OnDestroy {

  @Input() nft:NFT;
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
    private authService: AuthService
  ) {
    this.routeService.clubName$.pipe(distinctUntilChanged(),takeUntil(this.destroy$)).subscribe((clubName) => {
      this.clubName = clubName;
    });
  }

  buyNow():void {
    this.customDialogService.showStripePaymenDialog(this.nft);
  }


  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
