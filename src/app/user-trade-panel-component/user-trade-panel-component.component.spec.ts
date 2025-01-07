import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTradePanelComponentComponent } from './user-trade-panel-component.component';

describe('UserTradePanelComponentComponent', () => {
  let component: UserTradePanelComponentComponent;
  let fixture: ComponentFixture<UserTradePanelComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTradePanelComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTradePanelComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
