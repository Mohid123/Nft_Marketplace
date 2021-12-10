import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getItem, setItem } from '@app/@core/utils';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Creator } from '../models/creator.model';
import { CreatorStats } from './../models/creator-stats.mode';
import { ApiResponse } from './../models/response.model';
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
  private _Creator$ = new BehaviorSubject<Creator>(null);
  public readonly Creator$: Observable<Creator> = this._Creator$.asObservable();

  private _CreatorStats$ = new BehaviorSubject<CreatorStats>(null);
  public readonly CreatorStats$: Observable<CreatorStats> = this._CreatorStats$.asObservable();

  constructor(protected http: HttpClient) {
    super(http);
  }

  getCreator(clubName: string, forceUpdate: boolean = false): Observable<ApiResponse<Creator> | Creator> {
    const creator: CreatorInStore = <CreatorInStore>getItem(StorageItem.Creator);
    if (!forceUpdate && creator?.club == clubName) {
      // console.log('creatoraaa:',creator);
      this._Creator$.next(creator.data)
      return of(creator.data);
    } else {
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
            this._Creator$.next(result.data)
          }
        }),
      );
    }
  }

  getCreatorStats(clubName: string): Observable<ApiResponse<creatorData> | CreatorStats> {
    const creatorStats: CreatorStatsInStore = <CreatorStatsInStore>getItem(StorageItem.CreatorStats);
    if (creatorStats?.club == clubName) {
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

}
