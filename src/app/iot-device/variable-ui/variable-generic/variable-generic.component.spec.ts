import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableGenericComponent } from './variable-generic.component';

describe('VariableGenericComponent', () => {
  let component: VariableGenericComponent;
  let fixture: ComponentFixture<VariableGenericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariableGenericComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariableGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
