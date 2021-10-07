import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingHistoryPage } from './trading-history.page';

describe('TradingHistoryPage', () => {
  let component: TradingHistoryPage;
  let fixture: ComponentFixture<TradingHistoryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradingHistoryPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
