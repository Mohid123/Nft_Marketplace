import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { ROLE_TYPE_UTILS } from '@app/@core/utils/role-type.utils';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { Observable } from 'rxjs';
import { RouteService } from './../services/route.service';

@Injectable({
  providedIn: 'root'
})
export class NoAdminGuard implements CanLoad , CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private routeService: RouteService,
  ) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const userRole = this.authService.role;

      if (this.authService.isLoggedIn) {
        if (userRole == ROLE_TYPE_UTILS.admin) {
          this.router.navigate([
            this.routeService.clubName || '/',
            ROUTER_UTILS.config.admin.root,
          ]);
          return false;
        }

        return true;
      } else {
        return true;
      }
  }

  canActivate() {
    const userRole = this.authService.role;

    if (this.authService.isLoggedIn) {
      if (userRole == ROLE_TYPE_UTILS.admin) {
        this.router.navigate([
          this.routeService.clubName || '/',
          ROUTER_UTILS.config.admin.root,
        ]);
        return false;
      }

      return true;
    } else {
      return true;
    }
  }
}
