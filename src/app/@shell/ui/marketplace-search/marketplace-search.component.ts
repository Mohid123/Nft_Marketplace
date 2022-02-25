/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiResponse } from '@app/@core/models/response.model';
import { TransactionBalance } from '@app/@core/models/transaction-balance.model';
import { CreatorService } from '@app/@core/services/creator.service';
import { RouteService } from '@app/@core/services/route.service';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { environment } from '@environments/environment';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { CustomDialogService } from './../../../@core/services/custom-dialog/custom-dialog.service';
import { TransactionService } from './../../../@core/services/transaction.service';

@Component({
  selector: 'app-marketplace-search',
  templateUrl: './marketplace-search.component.html',
  styleUrls: ['./marketplace-search.component.scss']
})
export class MarketplaceSearchComponent implements OnInit, OnDestroy {

  testNet = environment.testNet;
  destroy$ = new Subject();

  @Output() search = new EventEmitter();
  public searchStr = '';
  public clubName: string;

  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;
  creator$ = this.creatorService.Creator$;
  user$ = this.authService.user$;

  searchControl = new FormControl();
  formCtrlSub: Subscription;

  constructor(
    private authService: AuthService,
    private creatorService: CreatorService,
    private customDialogService: CustomDialogService,
    private transactionService: TransactionService,
    private routeService: RouteService,
    private router: Router,
  ) {
    this.routeService.clubName$.pipe(takeUntil(this.destroy$)).subscribe((clubName) => {
      this.clubName = clubName;
    });
   }

  ngOnInit(): void {
    this.formCtrlSub = this.searchControl.valueChanges.pipe(debounceTime(1000))
      .subscribe(newValue => {
        this.search.emit(newValue);
      });
  }

  login():void {
    this.customDialogService.showUserSignInDialog(false,'market-page');
  }

  gotoHome(): void {
    this.router.navigate([this.clubName]);
  }

  visitDashboard(): void {
    this.router.navigate([this.clubName, 'admin']);
  }

  createNFT():void {
    this.transactionService.getBalance().subscribe((res:ApiResponse<TransactionBalance>) => {
      if(!res.hasErrors()) {
        if(res.data.balance > 0) {
          this.customDialogService.showCreateNFTOptionsDialog();
        } else {
          const dialogRef = this.customDialogService.showConfirmationDialog('subscription','subscribe', 'close');
          dialogRef.afterClosed().subscribe((confirmed: boolean) => {
            if (confirmed) {
              this.router.navigate([this.routeService.clubName,'admin','subscription']);
            }
          });
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
    if(this.formCtrlSub)
      this.formCtrlSub.unsubscribe();
  }

}
