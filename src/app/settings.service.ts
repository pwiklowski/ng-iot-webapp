import { Injectable } from "@angular/core";
import { Setting } from "./models";

@Injectable({
  providedIn: "root",
})
export class SettingsService {
  SAVED_DEVICE_SETTINGS_KEY = "SAVED_DEVICE_SETTINGS_KEY";

  constructor() {}

  save(name, deviceUuid, variables) {
    let settings = JSON.parse(localStorage.getItem(this.SAVED_DEVICE_SETTINGS_KEY));
    if (settings == null) {
      settings = [];
    }
    settings.push({ name, deviceUuid, variables });
    localStorage.setItem(this.SAVED_DEVICE_SETTINGS_KEY, JSON.stringify(settings));
  }

  getSavedSettings(): Array<Setting> {
    return JSON.parse(localStorage.getItem(this.SAVED_DEVICE_SETTINGS_KEY));
  }
}
