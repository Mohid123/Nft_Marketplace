import { Injectable } from '@angular/core';
import { ActivationStart, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { setItem, StorageItem } from '@app/@core/utils';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounce, distinctUntilChanged, filter } from 'rxjs/operators';
import { RouterState } from './../models/routerState.model';
import { ROUTER_UTILS } from './../utils/router.utils';

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

  private _clubName$ = new BehaviorSubject<string>(null);
  public readonly clubName$: Observable<string>= this._clubName$.asObservable();

  private _isAdminPanel$ = new BehaviorSubject<boolean>(false);
  public readonly isAdminPanel$: Observable<boolean>= this._isAdminPanel$.asObservable();

  constructor(
    private authService: AuthService,
    private spinnerService: NgxSpinnerService,
    private router: Router,
  ) {
    this.clubName$.pipe(distinctUntilChanged()).subscribe(clubName => {
      // console.log('club name:',clubName);
      if(clubName !== null) {
        this.authService.clubChanged(clubName);
        setItem(StorageItem.Club, clubName);
      }
    });

    router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.spinnerService.show('main');
        // if (event.id === 1 && event.url == '/') {
        //   this.router.navigate(['/noderon']);
        // }
      }

      if (event instanceof NavigationEnd) {
       this.hideLoader();
      }

      if (event instanceof NavigationCancel) {
        if(event.id > 1) {
         this.hideLoader();
        }
      }
      if (event instanceof NavigationError) {
       this.hideLoader();
      }
    });
  }

  hideLoader(): void {
    setTimeout(() => {
      this.spinnerService.hide('main');
    }, 500);
  }

  get routerState(): RouterState {
    return this._routerState$.getValue();
  }

  get clubName(): string {
    return this._clubName$.getValue();
  }

  get isAdminPanel(): boolean {
    return this._isAdminPanel$.getValue();
  }

 listenToRouter():void {
      this.router.events.pipe(
        filter((event) => event instanceof ActivationStart),
        debounce(() => this.navEnd$)
        ).subscribe((event: any) => {
        let route = event.snapshot;
        const path: any[] = [];
        const { params, queryParams, data } = route;

        if(params?.clubName) {
          this._clubName$.next(params?.clubName);
        }

        if ( route?._urlSegment?.segments[1]?.path == ROUTER_UTILS.config.admin.root) {
          this._isAdminPanel$.next(true);
        } else {
          this._isAdminPanel$.next(false);
        }

        while (route.parent) {
          if (route.routeConfig && route.routeConfig.path) {
            path.push(route.routeConfig.path);
          }
          route = route.parent;
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
