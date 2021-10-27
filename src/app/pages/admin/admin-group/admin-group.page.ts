import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
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
    private spinner: NgxSpinnerService
  ) {
    this._page = 0;
    this._isLoading = false;
    this.routeService.clubName$.pipe(distinctUntilChanged(), takeUntil(this.destroy$))
    .subscribe((clubName) => {
      this.clubName = clubName;
    });;
  }

  ngOnInit(): void
  {

      this.spinner.show();
      this.getGroup();


  }

  getGroup(){
    if (this._isLoading) return
    this.groupService.getAllGroupsByClub(this.clubName, this._page++, this.limit);
      setTimeout(() => {
      this.spinner.hide();
      }, 500);
  }

  deleteGroup(group){
    this.spinner.show();
    this.groupService.deleteGroups(group.id).subscribe(data=>{
      setTimeout(()=>{
        this.spinner.hide();
        this.getGroup();

      })
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
