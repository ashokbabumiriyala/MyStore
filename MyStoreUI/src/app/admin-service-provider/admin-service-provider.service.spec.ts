import { TestBed } from '@angular/core/testing';

import { AdminServiceProviderService } from './admin-service-provider.service';

describe('AdminServiceProviderService', () => {
  let service: AdminServiceProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminServiceProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
