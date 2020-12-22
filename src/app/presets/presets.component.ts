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
    public dialog: MatDialog
  ) {
    this.reloadPresets();
  }

  reloadPresets() {
    this.savedPresets = this.presetService.getSavedPresets();
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
