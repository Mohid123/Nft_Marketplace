import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ApiResponse } from './../models/response.model';
import { TransactionStatsResponse } from './../models/transaction-stats-response.model';
import { ApiService } from './api.service';

type TransactionStatsData = TransactionStatsResponse;

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends ApiService<TransactionStatsData> {

  constructor(
    protected http: HttpClient,
  ) {
    super(http);
  }

  getTransactionStats(): Observable<ApiResponse<TransactionStatsData>> {
    return this.get('/token-transaction/getNdctStats').pipe(take(1));
  }

}
