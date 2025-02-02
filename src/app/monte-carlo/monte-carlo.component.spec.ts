import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonteCarloComponent } from './monte-carlo.component';

describe('MonteCarloComponent', () => {
  let component: MonteCarloComponent;
  let fixture: ComponentFixture<MonteCarloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonteCarloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonteCarloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
