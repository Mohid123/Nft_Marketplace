import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiResponse } from '@app/@core/models/response.model';
import { TransactionBalance } from '@app/@core/models/transaction-balance.model';
import { CustomDialogService } from '@app/@core/services/custom-dialog/custom-dialog.service';
import { RouteService } from '@app/@core/services/route.service';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TransactionService } from './../../../../@core/services/transaction.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit, OnDestroy {

  @Output() search = new EventEmitter();
  @Input() market:boolean;
  @Input() hideSearch:boolean;
  public searchStr = '';

  searchControl = new FormControl();
  formCtrlSub: Subscription;

  constructor(
    private customDialogService: CustomDialogService,
    private transactionService: TransactionService,
    private router: Router,
    private routeService: RouteService,
  ) {

  }

  ngOnInit(): void {
    this.formCtrlSub = this.searchControl.valueChanges.pipe(debounceTime(1000))
      .subscribe(newValue => {
        this.search.emit(newValue);
      });
  }

  visitMarketplace():void {
    this.router.navigate([this.routeService.clubName]);
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
    if(this.formCtrlSub)
      this.formCtrlSub.unsubscribe();
  }

}
