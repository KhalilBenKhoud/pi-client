import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalDataTableComponentComponent } from './historical-data-table-component.component';

describe('HistoricalDataTableComponentComponent', () => {
  let component: HistoricalDataTableComponentComponent;
  let fixture: ComponentFixture<HistoricalDataTableComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricalDataTableComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricalDataTableComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
