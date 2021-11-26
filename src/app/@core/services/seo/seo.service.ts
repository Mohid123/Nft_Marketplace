import { Injectable, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CreatorService } from '@app/@core/services/creator.service';
import { AngularFaviconService } from 'angular-favicon';
import { Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class SeoService implements OnDestroy {
  destroy$ = new Subject();

  constructor(
    private ngxFavicon: AngularFaviconService,
    private creatorService: CreatorService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta,
  ) {
    this.creatorService.Creator$.subscribe((creator)=> {
      this.ngxFavicon.setFavicon(creator.profileImageURL);
      this.setTitle(creator.displayName,'');
    })
  }

  init(): void {
    const appTitle = this.titleService.getTitle();

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.getLatestChild().snapshot.data || {}),
        takeUntil(this.destroy$),
      )
      .subscribe(({ title, description, robots }) => {
        this.setDescription(description);
        this.setRobots(robots);
      });
  }

  private getLatestChild(): ActivatedRoute {
    let child = this.activatedRoute.firstChild as ActivatedRoute;

    while (child.firstChild) {
      child = child.firstChild;
    }

    return child;
  }

  private setTitle(rootTitle: string, title: string): void {
    if (title) {
      this.titleService.setTitle(`${rootTitle} - ${title}`);
    } else {
      this.titleService.setTitle(`${rootTitle}`);
    }
  }

  private setDescription(description: string): void {
    if (description) {
      this.metaService.updateTag({
        name: 'description',
        content: description,
      });
    }
  }

  private setRobots(robots: string): void {
    if (robots) {
      this.metaService.updateTag({
        name: 'robots',
        content: robots,
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
