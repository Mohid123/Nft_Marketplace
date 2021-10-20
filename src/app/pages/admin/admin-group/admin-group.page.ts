import { Component, OnDestroy, OnInit } from '@angular/core';
import { ResponseGroupsByClub } from '@app/@core/models/response-groups-by-club.model';
import { Subject } from 'rxjs';
import { distinctUntilChanged, take, takeUntil } from 'rxjs/operators';
import { ApiResponse } from './../../../@core/models/response.model';
import { CustomDialogService } from './../../../@core/services/custom-dialog/custom-dialog.service';
import { GroupService } from './../../../@core/services/group.service';
import { RouteService } from './../../../@core/services/route.service';

@Component({
  selector: 'app-admin-group',
  templateUrl: './admin-group.page.html',
  styleUrls: ['./admin-group.page.scss'],
})
export class AdminGroupPage implements OnInit, OnDestroy {

  destroy$ = new Subject();

  public clubName: string;
  public limit = 6 ;

  private _page:number;
  private _isLoading:boolean;
  public groupsByClub: ResponseGroupsByClub;

  constructor(
    private customDialogService: CustomDialogService,
    private groupService: GroupService,
    private routeService: RouteService,
  ) {
    this._page = 0;
    this._isLoading = false;
    this.routeService.clubName$.pipe(distinctUntilChanged(), takeUntil(this.destroy$))
    .subscribe((clubName) => {
      this.clubName = clubName;
    });;
  }

  ngOnInit(): void {
    if (this._isLoading) return
    this.groupService.getAllGroupsByClub(this.clubName, this._page++, this.limit)
      .pipe(take(1))
      .subscribe((result:ApiResponse<ResponseGroupsByClub>) => {
        if (!result.hasErrors()) {
          this.groupsByClub = result.data;
        }
        this._isLoading = false;
      });
  }

  newGroup() {
    this.customDialogService.showCreateGroupDialog();
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
