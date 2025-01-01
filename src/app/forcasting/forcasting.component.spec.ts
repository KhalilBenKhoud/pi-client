import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForcastingComponent } from './forcasting.component';

describe('ForcastingComponent', () => {
  let component: ForcastingComponent;
  let fixture: ComponentFixture<ForcastingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForcastingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForcastingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
