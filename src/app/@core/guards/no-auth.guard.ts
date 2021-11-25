import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { getItem, StorageItem } from '@app/@core/utils';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { Observable } from 'rxjs';
import { ROUTER_UTILS } from '../utils/router.utils';
import { RouteService } from './../services/route.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private routeService: RouteService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree {
    const isLoggedIn = this.authService.isLoggedIn;

    if (isLoggedIn) {
      if(route?.params?.clubName !== getItem(StorageItem.ActiveClub)) {
        return true;
      }
      this.router.navigate([
        this.routeService.clubName || '/',
        ROUTER_UTILS.config.base.home,
      ]);
      return false;
    }

    return true;
  }
}
