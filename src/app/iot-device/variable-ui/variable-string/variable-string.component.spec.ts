import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableStringComponent } from './variable-string.component';

describe('VariableStringComponent', () => {
  let component: VariableStringComponent;
  let fixture: ComponentFixture<VariableStringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariableStringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariableStringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
