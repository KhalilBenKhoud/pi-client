import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalystRecComponent } from './analyst-rec.component';

describe('AnalystRecComponent', () => {
  let component: AnalystRecComponent;
  let fixture: ComponentFixture<AnalystRecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalystRecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalystRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
