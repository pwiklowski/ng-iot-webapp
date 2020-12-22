import { Injectable } from "@angular/core";
import { Preset } from "./models";
import { v4 as uuidv4 } from "uuid";

@Injectable({
  providedIn: "root",
})
export class PresetService {
  SAVED_DEVICE_SETTINGS_KEY = "SAVED_DEVICE_SETTINGS_KEY";

  constructor() {}

  save(preset: Preset) {
    let presets = JSON.parse(localStorage.getItem(this.SAVED_DEVICE_SETTINGS_KEY));
    if (presets == null) {
      presets = [];
    }

    preset.uuid = uuidv4();

    presets.push(preset);
    localStorage.setItem(this.SAVED_DEVICE_SETTINGS_KEY, JSON.stringify(presets));
  }

  remove(presetToRemove: Preset) {
    let presets: Array<Preset> = JSON.parse(localStorage.getItem(this.SAVED_DEVICE_SETTINGS_KEY));
    if (presets == null) {
      presets = [];
    }

    presets = presets.filter((preset: Preset) => preset.uuid !== presetToRemove.uuid);

    localStorage.setItem(this.SAVED_DEVICE_SETTINGS_KEY, JSON.stringify(presets));
  }

  getSavedPresets(): Array<Preset> {
    return JSON.parse(localStorage.getItem(this.SAVED_DEVICE_SETTINGS_KEY));
  }
}
