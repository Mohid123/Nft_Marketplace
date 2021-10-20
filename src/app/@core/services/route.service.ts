import { Injectable } from '@angular/core';
import { ActivationStart, NavigationEnd, Router } from '@angular/router';
import { getItem, setItem, StorageItem } from '@app/@core/utils';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounce, distinctUntilChanged, filter } from 'rxjs/operators';
import { RouterState } from './../models/routerState.model';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  private navEnd$ = this.router.events.pipe(filter((event) => event instanceof NavigationEnd));

  private _routerState$ = new BehaviorSubject<RouterState>(({
    params:"",
    queryParams:"",
    data:"",
    path:""
  }));
  public readonly routerState$: Observable<RouterState> = this._routerState$.asObservable();

  private _clubName$ = new BehaviorSubject<string>(<string>getItem(StorageItem.Club));
  public readonly clubName$: Observable<string>= this._clubName$.asObservable();

  constructor(
    private router: Router,
  ) {
    this.clubName$.pipe(distinctUntilChanged()).subscribe(clubName => {
      console.log('club name:',clubName);
      setItem(StorageItem.Club, clubName);
    })
  }

  get routerState(): RouterState {
    return this._routerState$.getValue();
  }

  get clubName(): string {
    return this._clubName$.getValue();
  }

 listenToRouter():void {
   console.log('this.rout:',this.router);
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

        if(params?.clubName) {
          this._clubName$.next(params?.clubName);
        }

        this._routerState$.next({
          params,
          queryParams,
          data,
          path: path.reverse().join('/'),
        });
      });
  }
}
