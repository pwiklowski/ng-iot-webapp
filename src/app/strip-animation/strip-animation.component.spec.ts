import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StripAnimationComponent } from './strip-animation.component';

describe('StripAnimationComponent', () => {
  let component: StripAnimationComponent;
  let fixture: ComponentFixture<StripAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StripAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StripAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
