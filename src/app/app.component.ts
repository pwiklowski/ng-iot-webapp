import { PresetsComponent } from "./presets/presets.component";
import { Component } from "@angular/core";
import { IotService } from "./iot.service";
import { version } from "../../package.json";
import { ConnectionState, Controller, DeviceConfig } from "@wiklosoft/ng-iot";
import { AuthService } from "@auth0/auth0-angular";
import { MatBottomSheet, MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { MatDialog } from "@angular/material/dialog";
import { RuleSelectorComponent } from "./rule-selector/rule-selector.component";
import { ChangeDetectorRef } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  version: string;
  connectionState: ConnectionState = ConnectionState.DISCONNECTED;
  devices = Array<DeviceConfig>();
  controller: Controller;

  constructor(
    private iot: IotService,
    public auth: AuthService,
    private presets: MatBottomSheet,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {
    this.version = version;
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
            return { ...device, isConnected: false };
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

  onConnected() {
    this.controller.getDevices((devices) => {
      this.devices = devices;
    });
  }

  isConnected() {
    return this.connectionState === ConnectionState.CONNECTED;
  }

  logout() {
    this.auth.logout();
  }

  openPresets() {
    this.presets.open(PresetsComponent);
  }

  openRuleEditor() {
    this.dialog.open(RuleSelectorComponent, {
      minWidth: 350,
    });
  }
}
