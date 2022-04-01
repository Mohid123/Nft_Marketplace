import { ViewportScroller } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivationStart, Router } from '@angular/router';
import { ROLE_TYPE_UTILS } from '@app/@core/utils/role-type.utils';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { SeoService } from '@core/services/seo';
import { ThemeService } from '@core/services/theme';
import { AngularFaviconService } from 'angular-favicon';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CreatorService } from './@core/services/creator.service';
import { CustomDialogService } from './@core/services/custom-dialog/custom-dialog.service';
import { RouteService } from './@core/services/route.service';
import { NotFoundPage } from './@shell/ui/not-found/not-found.page';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];

  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;
  role$: Observable<ROLE_TYPE_UTILS> = this.authService.role$;
  isAdminPanel$: Observable<boolean> = this.routeService.isAdminPanel$;
  creator$ = this.creatorService.Creator$;

  showHedader$ = this.themeService.showHeader$;
  showFooter$ = this.themeService.showFooter$;

  roles = ROLE_TYPE_UTILS;



  constructor(
    private seoService: SeoService,
    private themeService: ThemeService,
    private authService: AuthService,
    private creatorService: CreatorService,
    private customDialogService: CustomDialogService,
    private ngxFavicon: AngularFaviconService,
    private routeService: RouteService,
    private router: Router,
    private viewportScroller: ViewportScroller,

    private toastr: ToastrService,
    // private viewportScroller: ViewportScroller
  ) {
    this.routeService.listenToRouter();
  }

  ngOnInit(): void {
    this.runGlobalServices();
    // OFFLINE/ONLINE CHECK
    this.onlineEvent = fromEvent(window, "online");
    this.offlineEvent = fromEvent(window, "offline");
    //ONLINE CHECK
    this.subscriptions.push(
      this.onlineEvent.subscribe((e) => {
        this.toastr.success("You are now back online", "Internet Status");
      })
    );
    //OFFLINE CHECK
    this.subscriptions.push(
      this.offlineEvent.subscribe((e) => {
        this.toastr.error(
          "You are offline. Please Check your Internet Connection",
          "Internet Status"
        );
      })
    );

    this.router.events.pipe(
      filter((event) => event instanceof ActivationStart),
      ).subscribe((event: any) => {
        if(event?.snapshot?.component?.name.toString() === NotFoundPage.name) {
          // console.log('event.snapshot.component:',event.snapshot.component.name);
          this.ngxFavicon.setFavicon("../assets/icons/favicon.png");
          this.themeService.setHeader(false);
          this.themeService.setFooter(false);
        } else {
          this.themeService.setHeader(true);
          this.themeService.setFooter(true);
        }
      })
  }

  ngOnDestroy() {
    // this.unsubscribe.forEach((sb) => sb.unsubscribe());
    // UNSUBSCRIBE FROM OBSERVABLE
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }



  private runGlobalServices(): void {
    this.seoService.init();
    this.themeService.init();
  }

  onActivate(event):void {
    if(document.getElementById('admin-main')) {
      document.getElementById('admin-main').scrollIntoView()
    }
    if(document.getElementById('user-main')) {
      document.getElementById('user-main').scrollIntoView()
    }
  }
}
