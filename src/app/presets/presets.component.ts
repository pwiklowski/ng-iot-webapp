import { Component } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { MatDialog } from "@angular/material/dialog";
import { CreatePresetComponent } from "../create-preset/create-preset.component";
import { IotService } from "../iot.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Preset } from "@wiklosoft/ng-iot";
import { ChangeDetectorRef } from "@angular/core";

@Component({
  selector: "app-presets",
  templateUrl: "./presets.component.html",
  styleUrls: ["./presets.component.scss"],
})
export class PresetsComponent {
  savedPresets: Array<Preset>;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<PresetsComponent>,
    private iot: IotService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
    this.reloadPresets();
  }

  reloadPresets() {
    this.iot.getPresets().subscribe((presets: Array<Preset>) => {
      this.savedPresets = presets;
      this.cdr.markForCheck();
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
        this.iot.createPreset(preset).subscribe(() => {
          this.snackBar.open("Preset created", null, {
            duration: 1000,
          });
        });
      }
    });
  }
}
