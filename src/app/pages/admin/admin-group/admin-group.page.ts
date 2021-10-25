import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
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

  private _page:number;
  private _isLoading:boolean;

  public clubName: string;
  public groups$ = this.groupService.groups$;
  public limit = 6 ;

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
      this.groupService.getAllGroupsByClub(this.clubName, this._page++, this.limit);
  }
  deleteGroup(group){
    this.groupService.deleteGroups(group.id).subscribe(data=>{
      console.log('Delete success')
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
