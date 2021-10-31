import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresetsViewComponent } from './presets-view.component';

describe('PresetsViewComponent', () => {
  let component: PresetsViewComponent;
  let fixture: ComponentFixture<PresetsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresetsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresetsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
