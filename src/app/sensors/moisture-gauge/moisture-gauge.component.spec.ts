import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoistureGaugeComponent } from './moisture-gauge.component';

describe('MoistureGaugeComponent', () => {
  let component: MoistureGaugeComponent;
  let fixture: ComponentFixture<MoistureGaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoistureGaugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoistureGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
