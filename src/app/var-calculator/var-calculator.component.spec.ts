import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarCalculatorComponent } from './var-calculator.component';

describe('VarCalculatorComponent', () => {
  let component: VarCalculatorComponent;
  let fixture: ComponentFixture<VarCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VarCalculatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VarCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
