import { Component } from "@angular/core";
import { IotService, ConnectionState } from "./iot.service";
import { version } from "../../package.json";
import { AuthService } from "./auth.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  version: string;
  connectionState: ConnectionState = ConnectionState.DISCONNECTED;

  constructor(private iot: IotService, auth: AuthService) {
    this.version = version;

    iot.connect(auth.getToken()).subscribe((state: ConnectionState) => {
      console.log("connection state", state);
      this.connectionState = state;
      if (state === ConnectionState.NOT_AUTHORIZED) {
        auth.login();
      }
    });
  }

  isConnected() {
    return this.connectionState === ConnectionState.CONNECTED;
  }
}
