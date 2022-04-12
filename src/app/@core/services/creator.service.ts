import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse } from '@app/@core/models/response.model';
import { getItem, setItem } from '@app/@core/utils';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Creator } from '../models/creator.model';
import { environment } from './../../../environments/environment';
import { CreatorStats } from './../models/creator-stats.mode';
import { StorageItem } from './../utils/local-storage.utils';
import { ApiService } from './api.service';

type creatorData = Creator | CreatorStats;

export interface CreatorInStore {
  club: string,
  data: Creator,
}
export interface CreatorStatsInStore {
  club: string,
  data: CreatorStats,
}

@Injectable({
  providedIn: 'root',
})
export class CreatorService  extends ApiService<creatorData> {
  private _Creator$ = new BehaviorSubject<Creator | undefined>(null);
  public readonly Creator$: Observable<Creator | undefined> = this._Creator$.asObservable();

  private _CreatorStats$ = new BehaviorSubject<CreatorStats>(null);
  public readonly CreatorStats$: Observable<CreatorStats> = this._CreatorStats$.asObservable();

  private _creator$ = new BehaviorSubject<Array<Creator>>([]);
  public readonly groups$: Observable<Array<Creator>> = this._creator$.asObservable();

  private _totalCount$ = new BehaviorSubject<number>(0);
  public readonly totalCount$: Observable<number> = this._totalCount$.asObservable();


  private limit = environment.limit;
  get Creator() : Creator {
    return this._Creator$.getValue();
  }

  constructor(
    protected http: HttpClient,
    protected router: Router,
  ) {
    super(http);
  }

  getCreator(clubName: string, forceUpdate = false): Observable<ApiResponse<Creator> | Creator> {
    const creator: CreatorInStore = <CreatorInStore>getItem(StorageItem.Creator);
    if (!forceUpdate && creator?.club == clubName) {
      // console.log('creatoraaa:',creator);
      this._Creator$.next(creator.data)
      return of(creator.data);
    } else if (clubName) {
      const param = {
        clubName: clubName,
      };
      return this.get('/creator/searchCreatorByName', param).pipe(
        tap((result: ApiResponse<Creator>) => {
          // console.log('result:', result);
          if (!result.hasErrors()) {
            const param: any = {
              club: clubName,
              data: result.data,
            };
            setItem(StorageItem.Creator, param);
            if(result.data == null ) {
              this.router.navigate([]);
            } else {
              this._Creator$.next(result.data)
            }
          }
        }),
      );
    } else {
      return of(null)
    }
  }

  getCreatorStats(clubName: string,forceUpdate?:boolean): Observable<ApiResponse<creatorData> | CreatorStats> {
    const creatorStats: CreatorStatsInStore = <CreatorStatsInStore>getItem(StorageItem.CreatorStats);
    if (!forceUpdate && creatorStats?.club == clubName) {
      // console.log('creatoraaa:',creatorStats);
      this._CreatorStats$.next(creatorStats.data)
      return of(creatorStats.data);
    } else {
      return this.get('/creator/getStats').pipe(
        tap((result: ApiResponse<CreatorStats>) => {
          if (!result.hasErrors()) {
            const param: any = {
              club: clubName,
              data: result.data,
            };
            setItem(StorageItem.CreatorStats, param);
            this._CreatorStats$.next(result.data)
          }
        }),
      );
    }
  }

  updateCreator(clubName:string, param: Creator): Observable<ApiResponse<Creator> | Creator> {
      return this.post('/creator/updateCreator', param).pipe(
        tap((result: ApiResponse<Creator>) => {
          // console.log('result:', result);
          if (!result.hasErrors()) {
            this.getCreator(clubName, true).pipe(take(1)).subscribe();
          }
        }),
      );
  }

  addCreator(param: Creator): Observable<ApiResponse<creatorData>> {
    return this.post('/creator/createCreator', param).pipe(take(1), tap((result:ApiResponse<Creator>) => {
      if(!result.hasErrors()) {
        this._totalCount$.next(this._totalCount$.getValue()+1);
       if(this._creator$.getValue().length < this.limit ) {
         const creator: Array<Creator> = this._creator$.getValue();
         this._creator$.next([result.data,...creator])
       }
      }
    }))
  }



}
