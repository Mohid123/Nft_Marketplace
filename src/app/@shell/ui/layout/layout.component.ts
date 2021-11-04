import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { CreatorService } from '@app/@core/services/creator.service';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { Subject } from 'rxjs';
import { delay, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { RouteService } from './../../../@core/services/route.service';
import { AuthService } from './../../../pages/auth/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements AfterViewInit, OnDestroy {

  destroy$ = new Subject();
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isCollapsed = false;
  adminRouteUrl = ROUTER_UTILS.config.admin;
  clubName = '';

  creator$ = this.creatorService.Creator$;

  constructor(
    private authService: AuthService,
    private creatorService: CreatorService,
    private observer: BreakpointObserver,
    private router: Router,
    private routeService: RouteService,
    ) {}

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 768px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

      this.routeService.clubName$
        .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
        .subscribe((clubName) => {
          this.clubName = clubName;
        });
  }

  onClickSignOut(): void {
    this.authService.signOut();
    this.router.navigate(['auth','admin-sign-in']);
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
