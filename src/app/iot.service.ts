import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";
import { Controller, ConnectionState, Rule, Preset } from "@wiklosoft/ng-iot";
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

  getRules() {
    return this.http.get(`${this.BASE_URL}/rules`);
  }

  getRule(ruleId: string) {
    return this.http.get(`${this.BASE_URL}/rule/${ruleId}`);
  }

  updateRule(ruleId: string, rule: Rule) {
    return this.http.patch(`${this.BASE_URL}/rule/${ruleId}`, rule);
  }

  deleteRule(ruleId: string) {
    return this.http.delete(`${this.BASE_URL}/rule/${ruleId}`);
  }

  createRule(rule: Rule) {
    return this.http.post(`${this.BASE_URL}/rules`, rule);
  }

  getPresets() {
    return this.http.get(`${this.BASE_URL}/presets`);
  }

  getPreset(presetId: string) {
    return this.http.get(`${this.BASE_URL}/preset/${presetId}`);
  }

  updatePreset(presetId: string, preset: Preset) {
    return this.http.patch(`${this.BASE_URL}/preset/${presetId}`, preset);
  }

  deletePreset(presetId: string) {
    return this.http.delete(`${this.BASE_URL}/preset/${presetId}`);
  }

  createPreset(preset: Preset) {
    return this.http.post(`${this.BASE_URL}/presets`, preset);
  }
}
