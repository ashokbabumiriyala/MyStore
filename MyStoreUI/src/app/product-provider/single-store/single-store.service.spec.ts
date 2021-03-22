/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SingleStoreService } from './single-store.service';

describe('Service: SingleStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SingleStoreService]
    });
  });

  it('should ...', inject([SingleStoreService], (service: SingleStoreService) => {
    expect(service).toBeTruthy();
  }));
});
