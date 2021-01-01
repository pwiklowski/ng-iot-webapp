import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";
import { Controller, ConnectionState, Rule, Preset, Alias } from "@wiklosoft/ng-iot";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { environment } from "src/environments/environment";

const RECONNECT_DELAY = 5000;

@Injectable({
  providedIn: "root",
})
export class IotService {
  controller: Controller;
  connectionState: ConnectionState = -1;
  BASE_URL = environment.BASE_URL;

  aliases = new BehaviorSubject<Array<Alias>>([]);

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

    this.updateAliases();
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

  updateAliases() {
    this.getAliases().subscribe((aliases: Array<Alias>) => this.aliases.next(aliases));
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

  getAliases() {
    return this.http.get(`${this.BASE_URL}/aliases`);
  }

  getAlias(aliasId: string) {
    return this.http.get(`${this.BASE_URL}/aliases/${aliasId}`);
  }

  updateAlias(aliasId: string, alias: Alias) {
    return this.http.patch(`${this.BASE_URL}/aliases/${aliasId}`, alias);
  }

  deleteAlias(aliasId: string) {
    return this.http.delete(`${this.BASE_URL}/aliases/${aliasId}`);
  }

  createAlias(alias: Alias) {
    return this.http.post(`${this.BASE_URL}/aliases`, alias);
  }
}
