import { Preset, VariablePreset } from "./../models";
import { Component } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { MatDialog } from "@angular/material/dialog";
import { CreatePresetComponent } from "../create-preset/create-preset.component";
import { IotService } from "../iot.service";
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
    private presetService: PresetService,
    private iot: IotService,
    public dialog: MatDialog
  ) {
    this.savedPresets = this.presetService.getSavedPresets();
  }

  setPreset(preset: Preset) {
    preset.variables.map(async (preset: VariablePreset) => {
      try {
        await this.iot.getController().setValue(preset.deviceUuid, preset.variableUuid, JSON.stringify(preset.value));
      } catch (e) {
        console.error(e);
      }
    });
  }

  createNewPreset() {
    this._bottomSheetRef.dismiss();
    const dialogRef = this.dialog.open(CreatePresetComponent, {
      width: "80%",
      height: "80%",
    });
    dialogRef.afterClosed().subscribe(async (preset: Preset) => {
      if (preset) {
        this.presetService.save(preset);
      }
    });
  }
}
