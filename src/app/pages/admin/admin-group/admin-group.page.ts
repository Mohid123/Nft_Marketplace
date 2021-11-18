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
  public filterItemCount: string;
  public filterName: string;
  public limit = 6 ;

  public page:number;
  public searchValu = '';

  itemCount = [
    {
      sortBy: 'Maximum'
    },
    {
      sortBy: 'Minimum'
    }
  ]

  name = [
    {
      sortBy: 'A - Z'
    },
    {
      sortBy: 'Z - A'
    }
  ]

  constructor(
    private customDialogService: CustomDialogService,
    private creatorService: CreatorService,
    private groupService: GroupService,
    private routeService: RouteService,
    private toastr: ToastrService,
    private cf: ChangeDetectorRef
  ) {
    this.routeService.clubName$.pipe(distinctUntilChanged(), takeUntil(this.destroy$))
    .subscribe((clubName) => {
      this.clubName = clubName;
      this.resetFilters();
    });
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

  filterByItemCount(data: string):void {
    this.page = 1;
    this.filterItemCount = data;
    this.getGroup();
  }

  filterByName(data: string):void {
    this.page = 1;
    this.filterName = data;
    this.getGroup();
  }

  resetFilters():void {
    this.page = 1;
    this.filterItemCount = '';
    this.filterName = '';
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
