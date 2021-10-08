import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { ROLE_TYPE_UTILS } from '@app/@core/utils/role-type.utils';
import { Observable } from 'rxjs';
import { AuthService } from './../../pages/auth/services/auth.service';
import { ROUTER_UTILS } from './../utils/router.utils';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (this.authService.isLoggedIn) {
        const userRole = this.authService.role;

        if (userRole == ROLE_TYPE_UTILS.user) {
          this.router.navigate(['/']);
          return false;
        }

        return true;
      } else {
        this.router.navigate(['/',  ROUTER_UTILS.config.auth.root ,ROUTER_UTILS.config.auth.adminSignIn]);
        return false;
      }
  }
}
