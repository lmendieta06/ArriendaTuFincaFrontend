import { TestBed } from '@angular/core/testing';

import { PaymentService } from './payments.service';

describe('PaymentsService', () => {
  let service: PaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});