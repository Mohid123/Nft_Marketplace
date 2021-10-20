import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { ROLE_TYPE_UTILS } from '@app/@core/utils/role-type.utils';
import { Observable } from 'rxjs';
import { AuthService } from './../../pages/auth/services/auth.service';
import { RouteService } from './../services/route.service';
import { ROUTER_UTILS } from './../utils/router.utils';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanLoad, CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private routeService: RouteService,
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[],
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isLoggedIn) {
      const userRole = this.authService.role;

      if (userRole == ROLE_TYPE_UTILS.admin) {
        this.router.navigate([this.routeService.clubName || '/', ROUTER_UTILS.config.admin.root]);
        return false;
      }

      return true;
    } else {
      this.router.navigate([this.routeService.clubName || '/', ROUTER_UTILS.config.auth.root,ROUTER_UTILS.config.auth.signIn]);
      return false;
    }
  }

  canActivate() {
    if (this.authService.isLoggedIn) {
      const userRole = this.authService.role;

      if (userRole == ROLE_TYPE_UTILS.admin) {
        this.router.navigate([this.routeService.clubName || '/', ROUTER_UTILS.config.admin.root]);
        return false;
      }

      return true;
    } else {
      this.router.navigate([this.routeService.clubName || '/', ROUTER_UTILS.config.auth.root, ROUTER_UTILS.config.auth.signIn]);
      return false;
    }
  }
}
