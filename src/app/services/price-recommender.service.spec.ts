import { TestBed } from '@angular/core/testing';

import { PriceRecommenderService } from './price-recommender.service';

describe('PriceRecommenderService', () => {
  let service: PriceRecommenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceRecommenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
