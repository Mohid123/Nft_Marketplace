import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { GetAllNftsByClub } from '../models/requests/get-all-afts-by-club.model';
import { ResponseGroupsByClub } from '../models/response-groups-by-club.model';
import { environment } from './../../../environments/environment';
import { Group } from './../models/group.model';
import { AddGroup } from './../models/requests/add-group.model';
import { ApiResponse } from './../models/response.model';
import { ApiService } from './api.service';

type groupApiData = ResponseGroupsByClub | AddGroup;

@Injectable({
  providedIn: 'root'
})
export class GroupService extends ApiService<groupApiData> {

  private _isLoading$ = new BehaviorSubject<boolean>(false);
  public readonly isLoading$: Observable<boolean> = this._isLoading$.asObservable();

  private _totalCount$ = new BehaviorSubject<number>(0);
  public readonly totalCount$: Observable<number> = this._totalCount$.asObservable();

  private _groups$ = new BehaviorSubject<Array<Group>>([]);
  public readonly groups$: Observable<Array<Group>> = this._groups$.asObservable();

  private limit = environment.limit;

  constructor(
    protected http: HttpClient,
    protected toastrService: ToastrService,
  ) {
    super(http);
  }

  getAllGroupsByClub(clubName: string, page: number,
    data?: {
      filterItemCount?: string,
      filterName?: string,
      limit?: number,
      searchValue?: string
    }): void {
    this._isLoading$.next(true)
    page--;
    this.limit = data.limit;
    const param: any = {
      clubName: clubName,
      offset: page ? (this.limit || environment.limit) * page : 0,
      limit: this.limit || environment.limit,
    };

    if(data.filterItemCount) param.itemsCount = data.filterItemCount;
    if(data.filterName) param.Name = data.filterName.toString();
    if(data.searchValue) param.name = data.searchValue;

    this.get('/group/getAllGroupsByAppPackageId',param)
    .pipe(take(1),tap((result:ApiResponse<ResponseGroupsByClub>)=> {
      // debugger
      this._isLoading$.next(false)
      if (!result.hasErrors()) {
        this._totalCount$.next(result.data.totalCount)
        this._groups$.next(result.data?.data);
      } else {
        this.toastrService.error(result?.errors[0]?.error?.message)
      }
    })).subscribe();
  }

  getUsersGroups(clubName: string, userId: string ,page: number, limit?: number): Observable<ApiResponse<groupApiData>> {
    this.limit = limit;
    const param: GetAllNftsByClub = {
      clubName: clubName,
      offset: page ? (this.limit || environment.limit) * page : 0,
      limit: this.limit || environment.limit,
    };
    return this.get('/group/getUsersGroupsByAppPackageId/' + userId,param).pipe(take(1),tap((result:ApiResponse<groupApiData>)=> {
      if (result.hasErrors()) {
        this.toastrService.error(result?.errors[0]?.error?.message)
      }
    }));
  }

  addGroups(param:AddGroup): Observable<ApiResponse<groupApiData>> {
    return this.post('/group/addGroup',param).pipe(tap((result:ApiResponse<Group>)=> {
      if (!result.hasErrors()) {
        this._totalCount$.next(this._totalCount$.getValue()+1);
        if(this._groups$.getValue().length < this.limit) {
          const group: Array<Group> = this._groups$.getValue();
          this._groups$.next([result.data,...group])
        }
      }
    }));
  }

  deleteGroups(id) {
    return this.get(`/group/deleteGroupById/${id}`).pipe(take(1),tap((result:ApiResponse<any>)=> {
      if (result.hasErrors()) {
        this.toastrService.error(result?.errors[0]?.error?.message)
      }
    }));
  }

}
