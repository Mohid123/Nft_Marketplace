import { Component, OnInit } from '@angular/core';
import { ROLE_TYPE_UTILS } from '@app/@core/utils/role-type.utils';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { SeoService } from '@core/services/seo';
import { ThemeService } from '@core/services/theme';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { Creator } from './@core/models/creator.model';
import { ApiResponse } from './@core/models/response.model';
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

  roles = ROLE_TYPE_UTILS;

  constructor(
    private seoService: SeoService,
    private themeService: ThemeService,
    private authService: AuthService,
    private creatorService: CreatorService,
    private customDialogService: CustomDialogService,
    private routeService: RouteService,
  ) {
    this.routeService.listenToRouter();
  }

  ngOnInit(): void {
    this.runGlobalServices();


    this.isAdminPanel$.pipe(distinctUntilChanged()).subscribe(isAdminPanel => {
      if(isAdminPanel) {
        this.creatorService.getCreator(this.routeService.clubName).subscribe((result:ApiResponse<Creator>) => {
          console.log('result:',result);
          if(!result.hasErrors()) {
            if(!result.data.stripeSecretKey) {
              this.customDialogService.showStripeKeyDialog();
            }
          }
        })
      }
    })
  }

  private runGlobalServices(): void {
    this.seoService.init();
    this.themeService.init();
  }
}
