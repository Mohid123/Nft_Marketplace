/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CreatorService } from '@app/@core/services/creator.service';
import SwiperCore, { Autoplay, Pagination } from "swiper";
import { GroupService } from './../../../@core/services/group.service';
SwiperCore.use([Pagination, Autoplay ]);
@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SwiperComponent implements OnInit {
  public groups$ = this.groupService.groups$;
  public filterItemCount: string;
  public filterName: string;
  public limit = 6 ;
  public searchValu = '';
  public clubName: string;
  public page:number;
  creator$ = this.creatorService.Creator$;
  constructor( private groupService: GroupService,
    private creatorService: CreatorService) { }

  ngOnInit(): void {
  }

  getGroup(): void {
    const param = {
      filterItemCount : this.filterItemCount,
      filterName  : this.filterName,
      limit: this.limit,
      searchValue: this.searchValu
    }
    this.groupService.getAllGroupsByClub(this.clubName, this.page, param);
  }

}
