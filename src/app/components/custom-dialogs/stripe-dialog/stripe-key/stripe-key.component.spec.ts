import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeKeyComponent } from './stripe-key.component';

describe('StripeKeyComponent', () => {
  let component: StripeKeyComponent;
  let fixture: ComponentFixture<StripeKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StripeKeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StripeKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
