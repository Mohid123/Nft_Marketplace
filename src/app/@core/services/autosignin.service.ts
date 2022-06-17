import { Injectable } from '@angular/core';
import { NavigationStart, Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutosigninService {

  previousUrl: string;
  activeUrl: string;
  currentUrl: string;

  constructor(private router: Router) { }


  getRoutesForSignin() {
    this.router.events.pipe(filter((event:any) => event instanceof RoutesRecognized),
    pairwise()).subscribe((res: RoutesRecognized[]) => {
      console.log(res[0].urlAfterRedirects)
      this.previousUrl = res[0].urlAfterRedirects;
      console.log(this.previousUrl)
      this.activeUrl = res[1].urlAfterRedirects;
    })
  }

  getNavigationStartInstance() {
    this.router.events
    .pipe(filter((event: any) => event instanceof NavigationStart))
    .subscribe((res: NavigationStart) => {
      this.currentUrl = res.url
    })
  }

}
