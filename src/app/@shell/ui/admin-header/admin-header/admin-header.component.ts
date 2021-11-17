import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
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

  ngOnInit(): void {
    this.formCtrlSub = this.searchControl.valueChanges.pipe(debounceTime(1000))
      .subscribe(newValue => {
        this.search.emit(newValue);
      });
  }

  ngOnDestroy(): void {
    if(this.formCtrlSub)
      this.formCtrlSub.unsubscribe();
  }

}
