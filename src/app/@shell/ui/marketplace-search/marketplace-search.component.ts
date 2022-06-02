/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, HostListener, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ApiResponse } from '@app/@core/models/response.model';
import { TransactionBalance } from '@app/@core/models/transaction-balance.model';
import { CreatorService } from '@app/@core/services/creator.service';
import { RouteService } from '@app/@core/services/route.service';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { environment } from '@environments/environment';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { CustomDialogService } from './../../../@core/services/custom-dialog/custom-dialog.service';
import { TransactionService } from './../../../@core/services/transaction.service';
import { ROUTER_UTILS } from './../../../@core/utils/router.utils';

@Component({
  selector: 'app-marketplace-search',
  templateUrl: './marketplace-search.component.html',
  styleUrls: ['./marketplace-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.None
})
export class MarketplaceSearchComponent implements OnInit, AfterViewInit, OnDestroy {

  testNet = environment.testNet;
  destroy$ = new Subject();

  @Output() search = new EventEmitter();
  public searchStr = '';
  public clubName: string;

  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;
  creator$ = this.creatorService.Creator$;
  user$ = this.authService.user$;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  searchControl = new FormControl();
  formCtrlSub: Subscription;

  routeUrl = ROUTER_UTILS;

  isSticky = false;
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 2;
  }


  constructor(
    private authService: AuthService,
    private creatorService: CreatorService,
    private customDialogService: CustomDialogService,
    private transactionService: TransactionService,
    private routeService: RouteService,
    private observer: BreakpointObserver,
    private router: Router,
  ) {
    this.routeService.clubName$.pipe(distinctUntilChanged(),takeUntil(this.destroy$)).subscribe((clubName) => {
      this.clubName = clubName;
    });
   }

  ngOnInit(): void {
    this.formCtrlSub = this.searchControl.valueChanges.pipe(debounceTime(1000))
      .subscribe(newValue => {
        this.search.emit(newValue);
      });
  }

  ngAfterViewInit() {
    // this.observer
    // .observe(['(max-width: 768px)'])
    // .pipe(delay(1))
    // .subscribe((res) => {
    //   if (res.matches) {
    //     this.sidenav.mode = 'over';
    //     this.sidenav.close();
    //   } else {
    //     this.sidenav.mode = 'side';
    //     this.sidenav.open();
    //   }
    // });
      this.routeService.clubName$
        .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
        .subscribe((clubName) => {
          this.clubName = clubName;
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
        if (res.data.balance > 0 && this.creatorService.Creator?.stripeSecretKey == "") {
          this.customDialogService.showStripeKeyDialog();
        }
       else if (res.data.balance > 0) {
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
