import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { CreatorService } from './../../../@core/services/creator.service';
import { CustomDialogService } from './../../../@core/services/custom-dialog/custom-dialog.service';
import { GroupService } from './../../../@core/services/group.service';
import { RouteService } from './../../../@core/services/route.service';

@Component({
  selector: 'app-admin-group',
  templateUrl: './admin-group.page.html',
  styleUrls: ['./admin-group.page.scss'],
})
export class AdminGroupPage implements OnDestroy {

  creator$ = this.creatorService.Creator$;
  destroy$ = new Subject();

  public isLoading$ = this.groupService.isLoading$;

  public clubName: string;
  public groups$ = this.groupService.groups$;
  public totalCount$ = this.groupService.totalCount$;
  public limit = 6 ;

  public page:number;
  public searchValu = '';

  constructor(
    private customDialogService: CustomDialogService,
    private creatorService: CreatorService,
    private groupService: GroupService,
    private routeService: RouteService,
    private toastr: ToastrService,
    private cf: ChangeDetectorRef
  ) {
    this.page = 1;
    this.routeService.clubName$.pipe(distinctUntilChanged(), takeUntil(this.destroy$))
    .subscribe((clubName) => {
      this.clubName = clubName;
      this.getGroup();
    });
  }

  getGroup(): void {
    this.groupService.getAllGroupsByClub(this.clubName, this.page, this.limit,this.searchValu);
  }

  deleteGroup(group):void {
    this.groupService.deleteGroups(group.id).subscribe((data) => {
      if (!data.hasErrors()) {
        this.cf.detectChanges();
        this.toastr.success('Group successfully deleted.', 'Success!');
        this.getGroup();
      }
    });
  }

  newGroup(): void {
    this.customDialogService.showCreateGroupDialog();
  }

  search(searchValue:string):void {
    this.searchValu = searchValue;
    this.page = 1;
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
