import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'app-admin-subscription',
  templateUrl: './admin-subscription.page.html',
  styleUrls: ['./admin-subscription.page.scss']
})
export class AdminSubscriptionPage implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  scrollLeft(el: Element) {
    const animTimeMs = 400;
    const pixelsToMove = 315;
    const stepArray = [0.001, 0.021, 0.136, 0.341, 0.341, 0.136, 0.021, 0.001];
    interval(animTimeMs / 8)
      .pipe(
        takeWhile((value) => value < 8),
        tap((value) => (el.scrollLeft -= pixelsToMove * stepArray[value]))
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
        tap((value) => (el.scrollLeft += pixelsToMove * stepArray[value]))
      )
      .subscribe();
  }


}
