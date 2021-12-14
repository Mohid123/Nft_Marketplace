import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RouteService } from '@app/@core/services/route.service';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { ThemeService } from '@core/services/theme';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination } from "swiper";
import { Club } from './../../../@core/models/club.model';
import { GetAllClubs } from './../../../@core/models/requests/get-all-club.model';
import { ClubService } from './../../../@core/services/club.service';


// install Swiper modules
SwiperCore.use([Pagination, Autoplay ]);


@Component({
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NotFoundPage implements OnInit {
  destroy$ = new Subject();
  path = ROUTER_UTILS.config.base;
  clubRouteUrl = ROUTER_UTILS;
  public clubName: string;

  public allClub = false;
  public slider = true;
  public filterName: string;
  public sortBy: string;
  name = [
    {
      sortBy: 'A - Z'
    },
    {
      sortBy: 'Z - A'
    }
  ]

  public clubs: Club[];

  searchControl = new FormControl();

  constructor(
    private ClubService: ClubService,
    private themeService: ThemeService,
    private routeService: RouteService
  ) {
    this.searchControl.valueChanges.pipe(debounceTime(1000))
      .subscribe(newValue => {
        this.getClubs();
      });

      // debugger
      const params: GetAllClubs = {
        offset: 0,
        sortDisplayName: this.sortBy,
      }

      if(this.searchControl.value) {
        params.displayName = this.searchControl.value;
      }

      this.ClubService.getAllClubs(params).subscribe(res=> {
        if(!res.hasErrors() && res.data.totalCount > 0) {
          this.clubs = res.data.data;

        }
      })

  }

  ngOnInit(): void {
    this.getClubs();
  }

  getClubs(){
    const params: GetAllClubs = {
      offset: 0,
      sortDisplayName: this.sortBy,
    }

    if(this.searchControl.value) {
      params.displayName = this.searchControl.value;
    }

    this.ClubService.getAllClubs(params).subscribe(res=> {
      if(!res.hasErrors() && res.data.totalCount > 0) {
        this.clubs = res.data.data;

      }
    })
  }

  sortClick(sort){
    this.sortBy = sort;
    this.getClubs();
  }

  showAllClub() {
    this.allClub = true;
    this.slider = false;
  }
}

