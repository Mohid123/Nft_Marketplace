import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { setItem, StorageItem } from '@app/@core/utils';
import { tap } from 'rxjs/operators';
import { ApiResponse } from './../models/response.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class StripeService extends ApiService<any> {

  constructor(
    protected http: HttpClient,
  ) {
    super(http);
  }

  addKey(params) {
    return this.post('/creator/validateAndSaveStripeSecretKey', params).pipe(tap((res:ApiResponse<any>)=> {
      if(!res.hasErrors()) {
        setItem(StorageItem.Key, params.key)
      }
    }))
  }

}
