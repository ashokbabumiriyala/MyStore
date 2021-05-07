import { TestBed } from '@angular/core/testing';

import { ServiceUploadService } from './service-upload.service';

describe('ServiceUploadService', () => {
  let service: ServiceUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
