import { Component, OnDestroy, OnInit } from '@angular/core';
import { TransactionStatsWallet } from '@app/@core/models/transaction-stats-wallet.model';
import { TransactionStats } from '@app/@core/models/transaction-stats.model';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
import { interval, Subject } from 'rxjs';
import { takeUntil, takeWhile, tap } from 'rxjs/operators';
import { ApiResponse } from './../../../@core/models/response.model';
import { SubscriptionPlan } from './../../../@core/models/subscription-plan.model';
import { TransactionStatsResponse } from './../../../@core/models/transaction-stats-response.model';
import { StripeService } from './../../../@core/services/stripe.service';
import { TransactionService } from './../../../@core/services/transaction.service';

@Component({
  selector: 'app-admin-subscription',
  templateUrl: './admin-subscription.page.html',
  styleUrls: ['./admin-subscription.page.scss'],
})
export class AdminSubscriptionPage implements OnInit, OnDestroy {

  destroy$ = new Subject();

  public subscriptionInProgress$ = this.stripeService.subscriptionInProgress$;
  public wallet:TransactionStatsWallet;
  public stats:TransactionStats;

  public subscriptionPlan: SubscriptionPlan[] = [
    {
      price: 500,
      tokenQuantity: 10000
    },
    {
      price: 3000,
      tokenQuantity: 60000,
    },
    {
      price: 5000,
      tokenQuantity: 100000,
    },
  ];

  constructor(
    private customDialogService: CustomDialogService,
    private transactionService: TransactionService,
    private stripeService: StripeService,
  ) {}

  ngOnInit(): void {
    this.stripeService.checkSubscriptionProgress();
    this.subscriptionInProgress$.pipe(takeUntil(this.destroy$)).subscribe(stats => {
      if(!stats) {
        this.getTransactionStats();
      }
    })
  }

  getTransactionStats():void {
    this.transactionService.getTransactionStats().subscribe((result: ApiResponse<TransactionStatsResponse>)=> {
      if(!result.hasErrors()) {
        this.wallet = result.data.wallet;
        this.stats = result.data.stats;
      }
    })
  }

  scrollLeft(el: Element): void {
    const animTimeMs = 400;
    const pixelsToMove = 315;
    const stepArray = [0.001, 0.021, 0.136, 0.341, 0.341, 0.136, 0.021, 0.001];
    interval(animTimeMs / 8)
      .pipe(
        takeWhile((value) => value < 8),
        tap((value) => (el.scrollLeft -= pixelsToMove * stepArray[value])),
      )
      .subscribe();
  }

  scrollRight(el: Element) {
    const animTimeMs = 400;
    const pixelsToMove = 315;
    const stepArray = [0.001, 0.021, 0.136, 0.341, 0.341, 0.136, 0.021, 0.001];
    interval(animTimeMs / 8)
      .pipe(
        takeWhile((value) => value < 8),
        tap((value) => (el.scrollLeft += pixelsToMove * stepArray[value])),
      )
      .subscribe();
  }

  buySubscription(index) {
    this.customDialogService.showStripePaymenDialog(null,this.subscriptionPlan[index])
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
