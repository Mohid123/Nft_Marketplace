import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouteService } from '@app/@core/services/route.service';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  public clubName: string;
  destroy$ = new Subject();
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;
  routeUrl = ROUTER_UTILS;

  constructor(

    private routeService: RouteService,
    private authService: AuthService,

    private router: Router
  ) {
    this.routeService.clubName$.pipe(distinctUntilChanged(),takeUntil(this.destroy$)).subscribe((clubName) => {
      this.clubName = clubName;
    });
   }

}
