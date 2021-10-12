import { TestBed } from '@angular/core/testing';

import { StripeDialogService } from './stripe-dialog.service';

describe('StripeDialogService', () => {
  let service: StripeDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StripeDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
