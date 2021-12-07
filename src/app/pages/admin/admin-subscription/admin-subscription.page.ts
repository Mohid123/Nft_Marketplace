import { Component, OnInit } from '@angular/core';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
import { interval } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';
import { SubscriptionPlan } from './../../../@core/models/subscription-plan.model';

@Component({
  selector: 'app-admin-subscription',
  templateUrl: './admin-subscription.page.html',
  styleUrls: ['./admin-subscription.page.scss'],
})
export class AdminSubscriptionPage implements OnInit {
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
    private customDialogService: CustomDialogService
  ) {}

  ngOnInit(): void {}

  scrollLeft(el: Element) {
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
}
