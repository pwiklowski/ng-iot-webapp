import { Component } from "@angular/core";
import { IotService } from "./iot.service";
import { version } from "../../package.json";
import { ConnectionState, DeviceConfig } from "@wiklosoft/ng-iot";
import { AuthService } from "@auth0/auth0-angular";

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

  constructor(private iot: IotService, public auth: AuthService) {
    this.version = version;
    this.controller = iot.getController();

    this.controller.getConnectionState().subscribe((state: ConnectionState) => {
      this.connectionState = state;
      if (state == ConnectionState.CONNECTED) {
        this.onConnected();
      }
    });
    this.controller.deviceConnected.subscribe((device: DeviceConfig) => {
      console.log("device connected", device);
      this.devices.push(device);
    });

    this.controller.deviceDisconnected.subscribe((deviceUuid: string) => {
      console.log("device disconnected", deviceUuid);

      this.devices = this.devices.filter((device) => {
        return device.deviceUuid != deviceUuid;
      });
    });
  }

  onConnected() {
    this.controller.getDevices((devices) => {
      console.log("get devices", devices);
      this.devices = devices;
    });
  }

  isConnected() {
    return this.connectionState === ConnectionState.CONNECTED;
  }

  logout() {
    this.auth.logout();
  }
}
