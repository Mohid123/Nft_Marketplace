import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { ROUTER_UTILS } from './../../../@core/utils/router.utils';
import { AuthService } from './../../../pages/auth/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements AfterViewInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isCollapsed = false;

  constructor(
    private authService: AuthService,
    private observer: BreakpointObserver,
    private router: Router,
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
  }

  onClickSignOut(): void {
    this.authService.signOut();

    const { root, signIn } = ROUTER_UTILS.config.auth;
    this.router.navigate(['/', root, signIn]);
  }
}
