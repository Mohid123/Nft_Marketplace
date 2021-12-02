import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NFT } from '@app/@core/models/NFT.model';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
import { environment } from '@environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { exhaustMap, take, tap } from 'rxjs/operators';
import { IsMembershipIdExists } from '../models/is-membership-id-exists.model';
import { GetAllNftsByClub } from '../models/requests/get-all-afts-by-club.model';
import { getNftsByUserId } from '../models/requests/get-nfts-by-user.model';
import { NFTList } from './../models/NFTList.model';
import { MediaUpload } from './../models/requests/media-upload.model';
import { ResponseAddMedia } from './../models/response-add-media.model';
import { ResponseEventByNFT } from './../models/response-events-by-nft.model';
import { ApiResponse } from './../models/response.model';
import { RouterState } from './../models/routerState.model';
import { ApiService } from './api.service';
import { MediaService } from './media.service';

type nftApiData = NFT | NFTList | ResponseEventByNFT | MediaUpload | IsMembershipIdExists ;

@Injectable({
  providedIn: 'root',
})
export class NFTService extends ApiService<nftApiData> {

  private _cardCreatedSuccess$ = new BehaviorSubject<string>(null);
  public readonly cardCreatedSuccess$: Observable<string> =
    this._cardCreatedSuccess$.asObservable();

  private _nftList = new BehaviorSubject<NFTList>({
    totalCount: 0,
    data: [],
  });

  public createNFTImg = new FormData();
  public createNFT:NFT = new NFT();
  public createNftForm:FormGroup;

  public readonly nftList$: Observable<NFTList> = this._nftList.asObservable();

  private _routerState: RouterState;


  constructor(
    protected customDialogService: CustomDialogService,
    protected http: HttpClient,
    private mediaService: MediaService,
    protected toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    super(http);
  }

  requestCreateNFT(nftForm,img):void {
    this.spinner.show('main');
    this.mediaService
      .uploadMedia('nft', img)
      .pipe(
        take(1),
        exhaustMap((res: ApiResponse<ResponseAddMedia>) => {
          // console.log('res:',res);
          if (!res.hasErrors()) {
              nftForm.serverCaptureFileUrl = res.data.url;
              nftForm.path = res.data.path;
              return this.addNft(nftForm);
            } else {
            return of(null);
          }
        }),
      )
      .subscribe((res: any) => {
        // console.log('res:', res);
        if (res == null) {
          this.toastrService.warning(res?.errors[0]?.error?.message, 'Error!' )
        }
        else {
          this.customDialogService.closeDialogs();
        }
        this.spinner.hide('main');
    });

    setTimeout(() => {
      this.customDialogService.closeDialogs();
    }, 3000);
  }

  getAllNftsByClub(clubName: string, page: number, limit: number ,searchValue: string ,groupId?:string, type?:string) : Observable<ApiResponse<nftApiData>> {
    page--;
    const param: GetAllNftsByClub = {
      clubName: clubName,
      offset: page ? limit * page : 0,
      limit: limit,
      name: searchValue,
      type: type,
    };

    if(groupId) {
      param.groupID = groupId;
    }
     return this.get('/nft/getAllNftsByClub', param).pipe(take(1),tap((result:ApiResponse<nftApiData>)=>{
      if (result.hasErrors()) {
        this.toastrService.error(result?.errors[0]?.error?.message)
      }
    }));
  }

  getRecentSoldNfts(clubName:string, page: number, limit: number, groupId?:string, type?:string) : Observable<ApiResponse<nftApiData>> {
    page--;
    const param:any = {
      clubName: clubName ,
      offset: page ? limit * page : 0,
      limit: limit,
    };

    if(type) param.type = type;
    // name: searchValue,

    if(groupId) {
      param.groupID = groupId;
    }
     return this.get('/nft/getRecentSoldNfts', param).pipe(take(1),tap((result:ApiResponse<nftApiData>)=>{
      if (result.hasErrors()) {
        this.toastrService.error(result?.errors[0]?.error?.message)
      }
    }));
  }

  getPendingForSaleNfts(clubName:string,page: number, limit: number, data: {
    nftStatus : string,
    price  : string,
    tokenId  : string,
  }) : Observable<ApiResponse<nftApiData>> {

    page--;
    const param:any = {
      clubName: clubName ,
      offset: page ? limit * page : 0,
      limit: limit
    };

    if(data.nftStatus) param.nftStatus = data.nftStatus;
    if(data.price) param.price = data.price;
    if(data.tokenId) param.tokenId = data.tokenId;
    // console.log('paaaaaaaaaa:',param);
    return this.get('/nft/getPendingForSaleNfts', param).pipe(take(1),tap((result:ApiResponse<nftApiData>)=>{
      if (result.hasErrors()) {
        this.toastrService.error(result?.errors[0]?.error?.message)
      }
    }));
  }

  getAllNftsByUser(clubName: string, userId:string ,page: number, searchValue: string ,groupId?:string,type?:string) : Observable<ApiResponse<nftApiData>> {
    page--;
    const param: getNftsByUserId = {
      clubName: clubName,
      offset: page ? environment.limit * page : 0,
      limit: environment.limit,
      name: searchValue,
      type: type,
    };

    if(groupId) {
      param.groupID = groupId;
    }

    return this.get('/nft/getUserNftsByClub/'+ userId, param).pipe(take(1),tap((result:ApiResponse<nftApiData>)=>{
      if (result.hasErrors()) {
        this.toastrService.error(result?.errors[0]?.error?.message)
      }
    }));;
  }

  getAllNftsAdminPanel (clubName: string, page: number, searchValue: string, data: {
    nftStatus : string,
    price  : string,
    tokenId  : string,
    type  : string,
  }) : Observable<ApiResponse<nftApiData>> {
    page--;
    const param: any = {
      clubName: clubName,
      offset: page ? environment.limit * page : 0,
      limit: environment.limit,
      name: searchValue,
    };

    if(data.nftStatus) param.nftStatus = data.nftStatus;
    if(data.price) param.price = data.price;
    if(data.tokenId) param.tokenId = data.tokenId;
    if(data.type) param.type = data.type;

    return this.get('/nft/getNftsByAppPackageIdForAdminPanel', param).pipe(take(1),tap((result:ApiResponse<nftApiData>)=>{
      if (result.hasErrors()) {
        this.toastrService.error(result?.errors[0]?.error?.message)
      }
    }));;
  }

  getNft(id: string): Observable<ApiResponse<nftApiData>> {
    const param: any = {
      id: id,
    };
    return this.get('/nft/getNft/'+ param.id).pipe(take(1),tap((result:ApiResponse<nftApiData>)=>{
      if (result.hasErrors()) {
        this.toastrService.error(result?.errors[0]?.error?.message)
      }
    }));;
  }

  updateNft(id: string,status): Observable<ApiResponse<nftApiData>> {
    const param: any = {
      nftStatus: status
    };
    return this.post('/nft/updateNft/'+ id, param).pipe(take(1),tap((result:ApiResponse<nftApiData>)=>{
      if (result.hasErrors()) {
        this.toastrService.error(result?.errors[0]?.error?.message)
      }
    }));
  }

  getEventsByNft(id: string): Observable<ApiResponse<nftApiData>> {
    const param: any = {
      id: id,
    };
    return this.get('/event/getEventByNftId/'+ param.id).pipe(take(1),tap((result:ApiResponse<nftApiData>)=>{
      if (result.hasErrors()) {
        this.toastrService.error(result?.errors[0]?.error?.message)
      }
    }));
  }

  getEventsByUser(id: string,page: number, limit: number,filterDate: number ,groupId?:string, type?:string): Observable<ApiResponse<nftApiData>> {
    page--;
    const param:any = {
      offset: page ? limit * page : 0,
      limit: limit,
      eventType: type,
    };
    // name: searchValue,

    if(groupId) param.groupID = groupId;
    if(filterDate) param.date = filterDate;

    return this.get('/event/getEventByUserId/'+ id,param).pipe(take(1),tap((result:ApiResponse<nftApiData>)=>{
      if (result.hasErrors()) {
        this.toastrService.error(result?.errors[0]?.error?.message)
      }
    }));
  }

  isMembershipIDExists(params: { appPackageId:string,membershipId:string}): Observable<ApiResponse<nftApiData>> {
    return this.post('/nft/isMembershipIDExists', params);
  }

  addNft(params: NFT): Observable<ApiResponse<nftApiData>>{
    return this.post('/nft/addNft', params).pipe(take(1),tap((result:ApiResponse<nftApiData>)=>{
      if (result.hasErrors()) {
        this.toastrService.error(result?.errors[0]?.error?.message)
      } else {
        if (result?.data) {
          if (params.freezeNft) {
            this.customDialogService.showLoadingDialog('Minting In Process');
            setTimeout(() => {
              this.customDialogService.closeDialogs();
            }, 3000);
          }
          this._cardCreatedSuccess$.next((<NFT>result?.data)?.id);
        }
      }
    }));
  }
}
