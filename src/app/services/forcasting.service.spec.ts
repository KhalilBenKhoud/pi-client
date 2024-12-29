import { TestBed } from '@angular/core/testing';

import { ForcastingService } from './forcasting.service';

describe('ForcastingService', () => {
  let service: ForcastingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForcastingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
