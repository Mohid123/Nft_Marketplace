import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubscriptionPage } from './admin-subscription.page';

describe('AdminSubscriptionPage', () => {
  let component: AdminSubscriptionPage;
  let fixture: ComponentFixture<AdminSubscriptionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSubscriptionPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSubscriptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
