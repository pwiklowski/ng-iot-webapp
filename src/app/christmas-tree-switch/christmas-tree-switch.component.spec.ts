import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChristmasTreeSwitchComponent } from './christmas-tree-switch.component';

describe('ChristmasTreeSwitchComponent', () => {
  let component: ChristmasTreeSwitchComponent;
  let fixture: ComponentFixture<ChristmasTreeSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChristmasTreeSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChristmasTreeSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
