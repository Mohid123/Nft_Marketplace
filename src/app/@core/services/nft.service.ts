import { NFT } from '@app/@core/models/NFT.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { GetAllNftsByClub } from '../models/requests/getAllNftsByClub.model';
import { NFTList } from './../models/NFTList.model';
import { ApiResponse } from './../models/response.model';
import { RouterState } from './../models/routerState.model';
import { ApiService } from './api.service';

type nftApiData = NFT | NFTList;

@Injectable({
  providedIn: 'root',
})
export class NFTService extends ApiService<nftApiData> {
  private _nftList = new BehaviorSubject<NFTList>({
    totalCount: 0,
    data: [],
  });
  public readonly nftList$: Observable<NFTList> = this._nftList.asObservable();

  private _routerState: RouterState;

  constructor(
    protected http: HttpClient,
  ) {
    super(http);
  }

  getAllNftsByClub(clubName: string, page: number) : Observable<ApiResponse<nftApiData>> {
    const param: GetAllNftsByClub = {
      clubName: clubName,
      offset: page ? environment.limit * page : 0,
      limit: environment.limit,
    };

    return this.get('/nft/getAllNftsByClub', param);
  }

  getNft(id: string): Observable<ApiResponse<nftApiData>> {
    const param: any = {
      id: id,
    };
    return this.get('/nft/getNft/'+ param.id);
  }
}
