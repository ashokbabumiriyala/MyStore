/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StoreMasterService } from './store-master.service';

describe('Service: StoreMaster', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreMasterService]
    });
  });

  it('should ...', inject([StoreMasterService], (service: StoreMasterService) => {
    expect(service).toBeTruthy();
  }));
});
