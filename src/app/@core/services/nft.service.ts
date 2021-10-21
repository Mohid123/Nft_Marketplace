import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NFT } from '@app/@core/models/NFT.model';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { GetAllNftsByClub } from '../models/requests/get-all-afts-by-club.model';
import { getNftsByUserId } from '../models/requests/get-nfts-by-user.model';
import { getNftsForAdmin } from '../models/requests/get-nfts-for-admin.model';
import { NFTList } from './../models/NFTList.model';
import { ResponseEventByNFT } from './../models/response-events-by-nft.model';
import { ApiResponse } from './../models/response.model';
import { RouterState } from './../models/routerState.model';
import { ApiService } from './api.service';

type nftApiData = NFT | NFTList | ResponseEventByNFT;

@Injectable({
  providedIn: 'root',
})
export class NFTService extends ApiService<nftApiData> {

  public createNft:NFT;

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

  getAllNftsByUser(clubName: string, userId:string ,page: number) : Observable<ApiResponse<nftApiData>> {
    const param: getNftsByUserId = {
      clubName: clubName,
      offset: page ? environment.limit * page : 0,
      limit: environment.limit,
    };

    return this.get('/nft/getUserNftsByClub/'+ userId, param);
  }

  getAllNftsAdminPanel (clubName: string, page: number) : Observable<ApiResponse<nftApiData>> {
    const param: getNftsForAdmin = {
      clubName: clubName,
      offset: page ? environment.limit * page : 0,
      limit: environment.limit,
    };

    return this.get('/nft/getNftsByAppPackageIdForAdminPanel', param);
  }

  getNft(id: string): Observable<ApiResponse<nftApiData>> {
    const param: any = {
      id: id,
    };
    return this.get('/nft/getNft/'+ param.id);
  }

  getEventsByNft(id: string): Observable<ApiResponse<nftApiData>> {
    const param: any = {
      id: id,
    };
    return this.get('/event/getEventByNftId/'+ param.id);
  }

  addNft(params: NFT): Observable<ApiResponse<nftApiData>>{
    return this.post('/nft/addNft', params)
  }


}
