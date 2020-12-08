import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableNumberComponent } from './variable-number.component';

describe('VariableNumberComponent', () => {
  let component: VariableNumberComponent;
  let fixture: ComponentFixture<VariableNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariableNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariableNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
