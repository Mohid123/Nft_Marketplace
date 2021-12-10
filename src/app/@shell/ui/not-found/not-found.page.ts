import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination } from "swiper";
import { Club } from './../../../@core/models/club.model';
import { ClubService } from './../../../@core/services/club.service';


// install Swiper modules
SwiperCore.use([Pagination, Autoplay ]);


@Component({
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NotFoundPage implements OnInit {
  path = ROUTER_UTILS.config.base;

  public allClub = false;
  public slider = true;

  public clubs: Club[];

  constructor(
    private ClubService: ClubService
  ) {}

  ngOnInit(): void {
    this.ClubService.getAllClubs().subscribe(res=> {
      if(!res.hasErrors() && res.data.totalCount > 0) {
        this.clubs = res.data.data;
      }
    })
  }

  showAllClub() {
    this.allClub = true;
    this.slider = false;
  }
}

