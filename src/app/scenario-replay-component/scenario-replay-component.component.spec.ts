import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioReplayComponentComponent } from './scenario-replay-component.component';

describe('ScenarioReplayComponentComponent', () => {
  let component: ScenarioReplayComponentComponent;
  let fixture: ComponentFixture<ScenarioReplayComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenarioReplayComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScenarioReplayComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
