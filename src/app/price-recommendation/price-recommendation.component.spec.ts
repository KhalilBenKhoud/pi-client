import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceRecommendationComponent } from './price-recommendation.component';

describe('PriceRecommendationComponent', () => {
  let component: PriceRecommendationComponent;
  let fixture: ComponentFixture<PriceRecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceRecommendationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
