import { Injectable } from "@angular/core";
import { Preset } from "./models";

@Injectable({
  providedIn: "root",
})
export class PresetService {
  SAVED_DEVICE_SETTINGS_KEY = "SAVED_DEVICE_SETTINGS_KEY";

  constructor() {}

  save(preset) {
    let presets = JSON.parse(localStorage.getItem(this.SAVED_DEVICE_SETTINGS_KEY));
    if (presets == null) {
      presets = [];
    }
    presets.push(preset);
    localStorage.setItem(this.SAVED_DEVICE_SETTINGS_KEY, JSON.stringify(presets));
  }

  getSavedPresets(): Array<Preset> {
    return JSON.parse(localStorage.getItem(this.SAVED_DEVICE_SETTINGS_KEY));
  }
}
