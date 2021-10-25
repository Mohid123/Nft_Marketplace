import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { setItem, StorageItem } from '@app/@core/utils';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AddStripeKey } from '../models/requests/add-stripe-key.model';
import { ResponseAddStripeKey } from '../models/response-add-stripe-key.model';
import { BuyNFT } from './../models/requests/buy-nft.model';
import { ApiResponse } from './../models/response.model';
import { ApiService } from './api.service';

type StripeApiData = ResponseAddStripeKey | any;
@Injectable({
  providedIn: 'root',
})
export class StripeService extends ApiService<StripeApiData> {
  constructor(protected http: HttpClient) {
    super(http);
  }

  addKey(params: AddStripeKey): Observable<ApiResponse<StripeApiData>> {
    return this.post('/creator/validateAndSaveStripeSecretKey', params).pipe(
      tap((res: ApiResponse<ResponseAddStripeKey>) => {
        if (!res.hasErrors() && res.data.isValid) {
          setItem(StorageItem.Key, res.data.isValid);
        } else {
          alert('invalid key');
        }
      }),
    );
  }

  stripePay(params:BuyNFT): Observable<ApiResponse<StripeApiData>> {
    return this.post('/creator/validateAndSaveStripeSecretKey', params);
  }
}
