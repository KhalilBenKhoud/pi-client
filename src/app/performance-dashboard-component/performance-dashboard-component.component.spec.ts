import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceDashboardComponentComponent } from './performance-dashboard-component.component';

describe('PerformanceDashboardComponentComponent', () => {
  let component: PerformanceDashboardComponentComponent;
  let fixture: ComponentFixture<PerformanceDashboardComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceDashboardComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformanceDashboardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
