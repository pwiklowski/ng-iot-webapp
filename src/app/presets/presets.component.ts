import { Component } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { IotService } from "../iot.service";
import { Preset } from "../models";
import { PresetService } from "../preset.service";

@Component({
  selector: "app-presets",
  templateUrl: "./presets.component.html",
  styleUrls: ["./presets.component.scss"],
})
export class PresetsComponent {
  savedPresets: Array<Preset>;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<PresetsComponent>,
    private presets: PresetService,
    private iot: IotService
  ) {
    this.savedPresets = this.presets.getSavedPresets();
  }

  setPreset(preset: Preset) {
    preset.variables.map(async (variable) => {
      try {
        await this.iot.getController().setValue(preset.deviceUuid, variable.uuid, JSON.stringify(variable.value));
      } catch (e) {
        console.error(e);
      }
    });
  }
}
