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

  constructor(private iot: IotService, public auth: AuthService) {
    this.version = version;

    iot
      .getController()
      .getConnectionState()
      .subscribe((state: ConnectionState) => {
        this.connectionState = state;
      });

    iot.getController().devices.subscribe((devices: any) => {
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
