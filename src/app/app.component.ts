import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ROLE_TYPE_UTILS } from '@app/@core/utils/role-type.utils';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { SeoService } from '@core/services/seo';
import { ThemeService } from '@core/services/theme';
import { Observable } from 'rxjs';
import { CreatorService } from './@core/services/creator.service';
import { CustomDialogService } from './@core/services/custom-dialog/custom-dialog.service';
import { RouteService } from './@core/services/route.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;
  role$: Observable<ROLE_TYPE_UTILS> = this.authService.role$;
  isAdminPanel$: Observable<boolean> = this.routeService.isAdminPanel$;
  creator$ = this.creatorService.Creator$;

  roles = ROLE_TYPE_UTILS;

  constructor(
    private seoService: SeoService,
    private themeService: ThemeService,
    private authService: AuthService,
    private creatorService: CreatorService,
    private customDialogService: CustomDialogService,
    private routeService: RouteService,
    private viewportScroller: ViewportScroller
  ) {
    this.routeService.listenToRouter();
  }

  ngOnInit(): void {
    this.runGlobalServices();
  }

  private runGlobalServices(): void {
    this.seoService.init();
    this.themeService.init();
  }

  onActivate(event):void {
    if(document.getElementById('admin-main')) {
      document.getElementById('admin-main').scrollIntoView()
    }
  }
}
