import { Component, OnDestroy, OnInit } from '@angular/core';
import { Group } from '@app/@core/models/group.model';
import { GroupService } from '@app/@core/services/group.service';
import { NFTService } from '@app/@core/services/nft.service';
import { RouteService } from '@app/@core/services/route.service';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ResponseEventByNFT } from './../../../@core/models/response-events-by-nft.model';
import { ApiResponse } from './../../../@core/models/response.model';

@Component({
  selector: 'app-trading-history',
  templateUrl: './trading-history.page.html',
  styleUrls: ['./trading-history.page.scss']
})
export class TradingHistoryPage implements OnInit, OnDestroy {

  destroy$ = new Subject();

  public clubName: string;
  public responseEventByNFT: ResponseEventByNFT;
  public limit = 6 ;
  public eventLimit = 12 ;
  public page:number;

  public groups$ = this.groupService.groups$;
  public filterGroup: Group;

  public isLoading:boolean;
  public type = '';
  filterButtons = [
    { text: 'All', isClicked: true },
    { text: 'Minted', isClicked: false },
    { text: 'Sale', isClicked: false },
    { text: 'Transfer', isClicked: false },
  ]

  constructor(
    private authService: AuthService,
    private groupService: GroupService,
    private nftService: NFTService,
    private routeService: RouteService,
  ) {
    this.page = 1;
    this.isLoading = false;
    this.routeService.clubName$.pipe(takeUntil(this.destroy$)).subscribe((clubName) => {
      this.clubName = clubName;
      if(this.clubName)
        this.getEvetns();
    });
  }

  ngOnInit(): void {
    const param = {
      limit: this.limit
    }
    this.groupService.getAllGroupsByClub(this.clubName, 0, param);
  }

  setActive(button: any): void {
    for(const but of this.filterButtons) {
      but.isClicked = false;
    }
     button.isClicked = true;
  }

  getEvetns():void {

    this.nftService.getEventsByUser(this.authService.loggedInUser.id,this.page, this.eventLimit ,this.filterGroup?.id, this.type).pipe(take(1)).subscribe((result:ApiResponse<ResponseEventByNFT>) => {
      if (!result.hasErrors()) {
        this.responseEventByNFT = result.data;
      }
    });
  }

  setType(type:string): void {
    this.type = type;
    this.page = 1;
    this.getEvetns();
  }

  next():void {
    this.page++;
    this.getEvetns();
  }

  previous():void {
    this.page--;
    this.getEvetns();
  }

  filterBy (group:Group) :void {
    this.page = 1;
    this.filterGroup = group;
    this.getEvetns();
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
