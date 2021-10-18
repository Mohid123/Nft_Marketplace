import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { GetAllNftsByClub } from '../models/requests/getAllNftsByClub.model';
import { BaseResponse } from './../models/BaseResponse.model';
import { NFTList } from './../models/NFTList.model';
import { RouterState } from './../models/routerState.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class NFTService {
  private _nftList = new BehaviorSubject<NFTList>({
    totalCount: 0,
    data: [],
  });
  public readonly nftList$: Observable<NFTList> = this._nftList.asObservable();

  private _routerState: RouterState;

  constructor(
    private apiService: ApiService,
  ) {
  }

  getAllNftsByClub(clubName: string, page: number): Observable<any> {
    const param: GetAllNftsByClub = {
      clubName: clubName,
      offset: page ? environment.limit * page : 0,
      limit: environment.limit,
    };

    return this.apiService.get('/nft/getAllNftsByClub', param);
  }

  getNft(id: string): Observable<BaseResponse> {
    const param: GetAllNftsByClub | any = {
      id: id,
    };
    return this.apiService.get('/nft/getNft/'+ param.id);
  }
}
