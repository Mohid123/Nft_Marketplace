/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CustomDialogService } from './../../../@core/services/custom-dialog/custom-dialog.service';

@Component({
  selector: 'app-marketplace-search',
  templateUrl: './marketplace-search.component.html',
  styleUrls: ['./marketplace-search.component.scss']
})
export class MarketplaceSearchComponent implements OnInit, OnDestroy {

  @Output() search = new EventEmitter();
  public searchStr = '';

  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  searchControl = new FormControl();
  formCtrlSub: Subscription;

  constructor(
    private authService: AuthService,
    private customDialogService: CustomDialogService,
  ) { }

  ngOnInit(): void {
    this.formCtrlSub = this.searchControl.valueChanges.pipe(debounceTime(1000))
      .subscribe(newValue => {
        this.search.emit(newValue);
      });
  }

  login():void {
    this.customDialogService.showUserSignInDialog();
  }

  ngOnDestroy(): void {
    if(this.formCtrlSub)
      this.formCtrlSub.unsubscribe();
  }


}
