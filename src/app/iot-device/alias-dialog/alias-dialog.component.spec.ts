import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AliasDialogComponent } from './alias-dialog.component';

describe('AliasDialogComponent', () => {
  let component: AliasDialogComponent;
  let fixture: ComponentFixture<AliasDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AliasDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AliasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
