import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getItem, setItem } from '@app/@core/utils';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Creator } from '../models/creator.model';
import { ApiResponse } from './../models/response.model';
import { StorageItem } from './../utils/local-storage.utils';
import { ApiService } from './api.service';

type creatorData = Creator;

export interface CreatorInStore {
  club: string,
  data: Creator,
}

@Injectable({
  providedIn: 'root',
})
export class CreatorService extends ApiService<creatorData> {
  private _Creator$ = new BehaviorSubject<Creator>(null);
  public readonly Creator$: Observable<Creator> = this._Creator$.asObservable();

  constructor(protected http: HttpClient) {
    super(http);
  }

  getCreator(clubName: string): Observable<ApiResponse<Creator> | Creator> {
    const creator: CreatorInStore = <CreatorInStore>getItem(StorageItem.Creator);
    if (creator?.club == clubName) {
      console.log('creatoraaa:',creator);
      this._Creator$.next(creator.data)
      return of(creator.data);
    } else {
      const param = {
        clubName: clubName,
      };
      return this.get('/creator/searchCreatorByName', param).pipe(
        tap((result: ApiResponse<Creator>) => {
          console.log('result:', result);
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
}
