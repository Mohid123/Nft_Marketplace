import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NFT } from '@app/@core/models/NFT.model';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
import { setItem, StorageItem } from '@app/@core/utils';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AddStripeKey } from '../models/requests/add-stripe-key.model';
import { ResponseStripeStatus } from '../models/response-add-stripe-key.model';
import { BuyNFT } from './../models/requests/buy-nft.model';
import { ApiResponse } from './../models/response.model';
import { ApiService } from './api.service';

type StripeApiData = ResponseStripeStatus | NFT;
@Injectable({
  providedIn: 'root',
})
export class StripeService extends ApiService<StripeApiData> {

  private _purchaseSuccess$ = new BehaviorSubject<string>(null);
  public readonly purchaseSuccess$: Observable<string> =
    this._purchaseSuccess$.asObservable();


  constructor(protected http: HttpClient,
    private customDialogService: CustomDialogService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
    ) {
    super(http);
  }

  addKey(params: AddStripeKey): Observable<ApiResponse<StripeApiData>> {
    return this.post('/creator/validateAndSaveStripeSecretKey', params).pipe(
      take(1),
      tap((res: ApiResponse<ResponseStripeStatus>) => {
        if (!res.hasErrors() && res.data.isValid) {
          setItem(StorageItem.Key, res.data.isValid);
        } else {
          console.log('invalid key');
        }
      }),
    );
  }

  purchaseNFT(params:BuyNFT): void {
    this.spinner.show('main');
    this.stripePay(params).pipe(take(1)).subscribe((res:ApiResponse<NFT>)=> {
     if(!res.hasErrors()) {
       this.customDialogService.showLoadingDialog('Transferring In Process');
        setTimeout(() => {
          this.customDialogService.closeDialogs();
        }, 3000);

        this._purchaseSuccess$.next(params.nftId)
        console.log('success:',res);
      } else {
        this.toastr.warning(res.errors[0]?.error?.message, 'Error!');

      }
      this.spinner.hide('main');
    });
    // setTimeout(() => {
    //   this.customDialogService.closeDialogs();
    // }, 3000);
  }

  stripePay(params:BuyNFT): Observable<ApiResponse<StripeApiData>> {
    return this.post('/nft/buyNft/'+ params.nftId, params);
  }
}
