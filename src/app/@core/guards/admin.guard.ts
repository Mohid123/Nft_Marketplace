import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { ROLE_TYPE_UTILS } from '@app/@core/utils/role-type.utils';
import { Observable } from 'rxjs';
import { getItem, StorageItem } from '../utils';
import { AuthService } from './../../pages/auth/services/auth.service';
import { RouteService } from './../services/route.service';
import { ROUTER_UTILS } from './../utils/router.utils';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private routeService: RouteService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

      if (this.authService.isLoggedIn) {
        const userRole = this.authService.role;

        if (userRole == ROLE_TYPE_UTILS.user) {
          this.router.navigate([
            route?.params?.clubName || '/',
            ROUTER_UTILS.config.admin.root,
          ]);
          return false;
        }

        if(route?.params?.clubName == getItem(StorageItem.ActiveClub)) {
          return true;
        } else {
          this.router.navigate([
            route?.params?.clubName || '/',
            ROUTER_UTILS.config.auth.root,
            ROUTER_UTILS.config.auth.adminSignIn,
          ]);
          return false;
        }
      } else {
        this.router.navigate([
          route?.params?.clubName || '/',
          ROUTER_UTILS.config.auth.root,
          ROUTER_UTILS.config.auth.adminSignIn,
        ]);
        return false;
      }
  }
}
