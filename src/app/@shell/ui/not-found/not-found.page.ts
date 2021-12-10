import { Component, ViewEncapsulation } from '@angular/core';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination } from "swiper";


// install Swiper modules
SwiperCore.use([Pagination, Autoplay ]);


@Component({
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotFoundPage {
  path = ROUTER_UTILS.config.base;

  public allClub = false;
  public slider = true;

  showAllClub() {
    this.allClub = true;
    this.slider = false;
  }
}

