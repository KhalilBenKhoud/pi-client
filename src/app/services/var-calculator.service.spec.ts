import { TestBed } from '@angular/core/testing';

import { VarCalculatorService } from './var-calculator.service';

describe('VarCalculatorService', () => {
  let service: VarCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VarCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
