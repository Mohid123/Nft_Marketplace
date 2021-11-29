import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RouteService } from '@app/@core/services/route.service';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit, OnDestroy {

  @Output() search = new EventEmitter();
  @Input() hideSearch:boolean;
  public searchStr = '';

  searchControl = new FormControl();
  formCtrlSub: Subscription;

  constructor(
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

  ngOnDestroy(): void {
    if(this.formCtrlSub)
      this.formCtrlSub.unsubscribe();
  }

}
