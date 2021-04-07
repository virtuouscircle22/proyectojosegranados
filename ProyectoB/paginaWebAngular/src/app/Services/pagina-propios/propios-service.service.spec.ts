import { TestBed } from '@angular/core/testing';

import { PropiosServiceService } from './propios-service.service';

describe('PropiosServiceService', () => {
  let service: PropiosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropiosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
