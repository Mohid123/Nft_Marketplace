import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { TransactionBalance } from '../models/transaction-balance.model';
import { ApiResponse } from './../models/response.model';
import { TransactionStatsResponse } from './../models/transaction-stats-response.model';
import { ApiService } from './api.service';

type TransactionStatsData = TransactionStatsResponse | TransactionBalance;

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends ApiService<TransactionStatsData> {

  private balance:number;

  constructor(
    protected http: HttpClient,
  ) {
    super(http);
  }

  getTransactionStats(): Observable<ApiResponse<TransactionStatsData>> {
    return this.get('/token-transaction/getNdctStats').pipe(take(1));
  }

  getBalance(): Observable<ApiResponse<TransactionStatsData>> {
    return this.get('/token-transaction/getMyBalance').pipe(
      take(1),
      tap((res: ApiResponse<TransactionBalance>) => {
        if (!res.hasErrors()) {
          if (res.data.balance > 0) {
            this.balance = res.data.balance;
          } else {
            this.balance = 0;
          }
        }
      }),
    );
  }

  checkBalance(): number {
    return this.balance;
  }

}
