import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VariableComponent } from './variable.component';

describe('VariableComponent', () => {
  let component: VariableComponent;
  let fixture: ComponentFixture<VariableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VariableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
