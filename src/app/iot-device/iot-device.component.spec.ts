import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IotDeviceComponent } from './iot-device.component';

describe('IotDeviceComponent', () => {
  let component: IotDeviceComponent;
  let fixture: ComponentFixture<IotDeviceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IotDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IotDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
