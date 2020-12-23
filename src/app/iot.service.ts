import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";
import { Controller, ConnectionState, Rule } from "@wiklosoft/ng-iot";
import { environment } from "src/environments/environment";

const RECONNECT_DELAY = 5000;

@Injectable({
  providedIn: "root",
})
export class IotService {
  controller: Controller;
  connectionState: ConnectionState = -1;
  BASE_URL = "http://localhost:8080";

  constructor(public auth: AuthService, private http: HttpClient) {
    this.controller = new Controller();
    this.controller.getConnectionState().subscribe((state: ConnectionState) => {
      console.log("connection state", ConnectionState[state]);
      if (state === ConnectionState.NOT_AUTHORIZED) {
        //auth.login();
      } else if (state === ConnectionState.DISCONNECTED) {
        if (this.connectionState == -1) {
          this.connect();
        } else {
          setTimeout(() => {
            this.connect();
          }, RECONNECT_DELAY);
        }
      }
      this.connectionState = state;
    });
  }

  connect() {
    this.auth.idTokenClaims$.subscribe((token) => {
      if (token) {
        this.controller.connect(`${environment.iotServer}?token=${token.__raw}`, null);
      } else {
        setTimeout(() => {
          this.connect();
        }, RECONNECT_DELAY);
      }
    });
  }

  getController(): Controller {
    return this.controller;
  }

  async getRules() {
    return this.http.get(`${this.BASE_URL}/rules`).toPromise() as Promise<Array<Rule>>;
  }

  async getRule(ruleId: string) {
    return this.http.get(`${this.BASE_URL}/rule/${ruleId}`).toPromise() as Promise<Rule>;
  }
}
