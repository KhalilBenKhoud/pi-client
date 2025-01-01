import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopytradeComponent } from './copytrade.component';

describe('CopytradeComponent', () => {
  let component: CopytradeComponent;
  let fixture: ComponentFixture<CopytradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopytradeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CopytradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
