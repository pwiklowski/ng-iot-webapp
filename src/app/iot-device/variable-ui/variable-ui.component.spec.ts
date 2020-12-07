import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableUiComponent } from './variable-ui.component';

describe('VariableUiComponent', () => {
  let component: VariableUiComponent;
  let fixture: ComponentFixture<VariableUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariableUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariableUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
