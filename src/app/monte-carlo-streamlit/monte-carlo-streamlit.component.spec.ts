import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonteCarloStreamlitComponent } from './monte-carlo-streamlit.component';

describe('MonteCarloStreamlitComponent', () => {
  let component: MonteCarloStreamlitComponent;
  let fixture: ComponentFixture<MonteCarloStreamlitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonteCarloStreamlitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonteCarloStreamlitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
