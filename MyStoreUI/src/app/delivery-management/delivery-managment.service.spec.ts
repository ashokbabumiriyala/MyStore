import { TestBed } from '@angular/core/testing';

import { DeliveryManagmentService } from './delivery-managment.service';

describe('DeliveryManagmentService', () => {
  let service: DeliveryManagmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryManagmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
