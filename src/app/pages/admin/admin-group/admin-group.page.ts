import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
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
export class AdminGroupPage implements OnDestroy {

  destroy$ = new Subject();

  private _isLoading:boolean;

  public clubName: string;
  public groups$ = this.groupService.groups$;
  public totalCount$ = this.groupService.totalCount$;
  public limit = 6 ;

  public page:number;
  public searchValu = '';

  constructor(
    private customDialogService: CustomDialogService,
    private groupService: GroupService,
    private routeService: RouteService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private cf: ChangeDetectorRef
  ) {
    this.page = 1;
    this._isLoading = false;
    this.spinner.show();
    this.routeService.clubName$.pipe(distinctUntilChanged(), takeUntil(this.destroy$))
    .subscribe((clubName) => {
      this.clubName = clubName;
      this.getGroup();
    });
  }

  getGroup(): void {
    if (this._isLoading) return
    this.groupService.getAllGroupsByClub(this.clubName, this.page, this.limit,this.searchValu);
      setTimeout(() => {
      this.spinner.hide();
      }, 500);
  }

  deleteGroup(group){
    this.spinner.show();
    this.groupService.deleteGroups(group.id).subscribe((data) => {
      if (!data.hasErrors()) {
        this.cf.detectChanges();
        this.toastr.success('Group successfully deleted.', 'Success!');
        this.getGroup();
        setTimeout(() => {
          this.spinner.hide();
        });
      }
    });
  }

  newGroup(): void {
    this.customDialogService.showCreateGroupDialog();
  }

  search(searchValu):void {
    this.searchValu = searchValu;
    this.page = 1;
    console.log('lajkdlkasj:',searchValu);
    this.getGroup();
  }

  next():void {
    this.page++;
    this.getGroup();
  }

  previous():void {
    this.page--;
    this.getGroup();
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
