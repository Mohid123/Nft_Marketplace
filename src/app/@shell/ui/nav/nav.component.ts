import { Component, OnDestroy } from '@angular/core';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { RouteService } from './../../../@core/services/route.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnDestroy {

  destroy$ = new Subject();
  public clubName: string;

  isLogedIn$ = this.authService.isLoggedIn$;
  routeUrl = ROUTER_UTILS;

  constructor(
    private authService: AuthService,
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
