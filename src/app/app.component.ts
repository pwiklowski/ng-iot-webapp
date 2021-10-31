import { PresetsComponent } from "./presets/presets.component";
import { Component } from "@angular/core";
import { IotService } from "./iot.service";
import { ConnectionState, Controller, DeviceConfig } from "@wiklosoft/ng-iot";
import { AuthService } from "@auth0/auth0-angular";
import { MatBottomSheet, MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { MatDialog } from "@angular/material/dialog";
import { RuleSelectorComponent } from "./rule-selector/rule-selector.component";
import { ChangeDetectorRef } from "@angular/core";
import { ViewChild } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  @ViewChild("content") content: any;

  connectionState: ConnectionState = ConnectionState.DISCONNECTED;
  devices = Array<DeviceConfig>();
  controller: Controller;
  columnsCount = 2;
  columns = Array<number>();

  constructor(
    private iot: IotService,
    public auth: AuthService,
    private presets: MatBottomSheet,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {
    this.controller = iot.getController();

    this.controller.getConnectionState().subscribe((state: ConnectionState) => {
      this.connectionState = state;
      if (state == ConnectionState.CONNECTED) {
        this.onConnected();
      }
    });
    this.controller.deviceConnected.subscribe((connectedDevice: DeviceConfig) => {
      const device = this.devices.find((device: DeviceConfig) => device.deviceUuid === connectedDevice.deviceUuid);

      if (device) {
        this.devices = this.devices.map((device) => {
          if (device.deviceUuid === connectedDevice.deviceUuid) {
            return { ...device, isConnected: true };
          }
          return device;
        });
      } else {
        this.devices.push(connectedDevice);
      }
      this.cdr.detectChanges();
    });

    this.controller.deviceDisconnected.subscribe((deviceUuid: string) => {
      this.devices = this.devices.map((device) => {
        if (device.deviceUuid === deviceUuid) {
          return { ...device, isConnected: false };
        }
        return device;
      });
    });
  }

  drawColumns(count: number) {
    this.columnsCount = count;
    this.columns = Array(this.columnsCount)
      .fill(1)
      .map((x, i) => i);
  }

  ngAfterViewInit() {
    const count = Math.floor(this.content.nativeElement.offsetWidth / 400);

    setTimeout(() => {
      this.drawColumns(count);
    }, 0);
  }

  onResize($event) {
    const count = Math.floor($event.target.innerWidth / 400);

    if (count != this.columnsCount) {
      this.drawColumns(count);
    }
  }

  onConnected() {
    this.controller.getDevices((devices) => {
      this.devices = devices;
    });
  }

  isConnected() {
    return this.connectionState === ConnectionState.CONNECTED;
  }

  openPresets() {
    this.presets.open(PresetsComponent);
  }

  openRuleEditor() {
    this.dialog.open(RuleSelectorComponent, {
      minWidth: 350,
    });
  }

  deviceRemoved(deviceUuid) {
    const index = this.devices.findIndex((device) => device.deviceUuid === deviceUuid);

    if (index > -1) {
      this.devices.splice(index, 1);
    }
  }
}
