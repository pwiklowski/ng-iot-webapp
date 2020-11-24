import { Injectable } from "@angular/core";
import { Controller, ConnectionState } from "@wiklosoft/ng-iot";
import { environment } from "src/environments/environment";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class IotService {
  controller: Controller;

  constructor(auth: AuthService) {
    this.controller = new Controller();
    this.controller.getConnectionState().subscribe((state: ConnectionState) => {
      console.log("connection state", state);
      if (state === ConnectionState.NOT_AUTHORIZED) {
        auth.login();
      }
    });
  }

  connect(token: string) {
    this.controller.connect(`${environment.iotServer}?token=${token}`, null);
  }

  getController(): Controller {
    return this.controller;
  }
}
