import { Component, OnInit } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { IotService } from "../iot.service";
import { Setting } from "../models";
import { SettingsService } from "../settings.service";

@Component({
  selector: "app-presets",
  templateUrl: "./presets.component.html",
  styleUrls: ["./presets.component.scss"],
})
export class PresetsComponent {
  savedSettings: Array<Setting>;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<PresetsComponent>,
    private settings: SettingsService,
    private iot: IotService
  ) {
    this.savedSettings = this.settings.getSavedSettings();
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  setSetting(setting: Setting) {
    setting.variables.map(async (variable) => {
      try {
        await this.iot.getController().setValue(setting.deviceUuid, variable.uuid, JSON.stringify(variable.value));
      } catch (e) {
        console.error(e);
      }
    });
  }
}
