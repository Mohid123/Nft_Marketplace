import { Injectable } from '@angular/core';
import { ActivationStart, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounce, filter } from 'rxjs/operators';
import { RouterState } from './../models/routerState.model';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  private navEnd$ = this.router.events.pipe(filter((event) => event instanceof NavigationEnd));
  private _routerState = new BehaviorSubject<RouterState>(({
    params:"",
    queryParams:"",
    data:"",
    path:""
  }));

  public readonly routerState$: Observable<RouterState> = this._routerState.asObservable();

  constructor(
    private router: Router,
  ) { }

 listenToRouter():void {
    this.router.events.pipe(
        filter((event) => event instanceof ActivationStart),
        debounce(() => this.navEnd$)
      ).subscribe((event: any) => {
        let route = event.snapshot;
        const path: any[] = [];
        const { params, queryParams, data } = route;

        while (route.parent) {
          if (route.routeConfig && route.routeConfig.path) {
            path.push(route.routeConfig.path);
          }
          route = route.parent;
        }
        this._routerState.next({
          params,
          queryParams,
          data,
          path: path.reverse().join('/'),
        });
      });
  }
}
