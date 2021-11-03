import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { RouteService } from '@app/@core/services/route.service';
import { Observable } from 'rxjs';
import { AuthService } from './../../pages/auth/services/auth.service';
import { ROUTER_UTILS } from './../utils/router.utils';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

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
      return true;
    } else {
      this.router.navigate([this.routeService.clubName || '/', ROUTER_UTILS.config.auth.root,ROUTER_UTILS.config.auth.signIn]);
      return false;
    }
  }

}
