import { TestBed } from '@angular/core/testing';

import { ExternosServicesService } from './externos-services.service';

describe('ExternosServicesService', () => {
  let service: ExternosServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExternosServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
