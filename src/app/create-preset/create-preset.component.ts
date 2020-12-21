import { Preset, VariablePreset } from "./../models";
import { ViewChild } from "@angular/core";
import { Component } from "@angular/core";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatDialogRef } from "@angular/material/dialog";
import { MatAccordion } from "@angular/material/expansion";
import { DeviceConfig } from "@wiklosoft/ng-iot";
import { IotService } from "../iot.service";

@Component({
  selector: "app-create-preset",
  templateUrl: "./create-preset.component.html",
  styleUrls: ["./create-preset.component.scss"],
})
export class CreatePresetComponent {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  devices = Array<DeviceConfig>();
  name: string;
  presets = Array<VariablePreset>();

  constructor(public dialogRef: MatDialogRef<CreatePresetComponent>, private iot: IotService) {
    iot.getController().getDevices((devices) => {
      this.devices = devices;
      console.log(devices);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick() {
    const preset: Preset = { name: this.name, variables: this.presets };
    this.dialogRef.close(preset);
  }

  onCheckBoxClick($event) {
    $event.stopPropagation();
  }

  onCheckBoxChanged(checkbox: MatCheckbox, deviceUuid: string, variableUuid: string, value: any) {
    if (checkbox.checked) {
      const preset: VariablePreset = {
        deviceUuid,
        variableUuid,
        value,
      };

      this.presets.push(preset);
    } else {
      this.presets = this.presets.filter((preset) => {
        return !(preset.deviceUuid === deviceUuid && preset.variableUuid === variableUuid);
      });
    }
    console.log("on checkbox changed", checkbox.checked, deviceUuid, variableUuid, value, this.presets);
  }
}
