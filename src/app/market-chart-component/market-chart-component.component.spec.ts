import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketChartComponentComponent } from './market-chart-component.component';

describe('MarketChartComponentComponent', () => {
  let component: MarketChartComponentComponent;
  let fixture: ComponentFixture<MarketChartComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketChartComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketChartComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
