import { Preset, VariablePreset } from "./../../models";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatMenuTrigger } from "@angular/material/menu";
import { IotService } from "src/app/iot.service";
import { PresetService } from "src/app/preset.service";
import { Output } from "@angular/core";
import { EventEmitter } from "@angular/core";

@Component({
  selector: "app-preset-button",
  templateUrl: "./preset-button.component.html",
  styleUrls: ["./preset-button.component.scss"],
})
export class PresetButtonComponent implements OnInit {
  @Input("preset") preset: Preset;
  @Output() onPresetsChanged = new EventEmitter();
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(private iot: IotService, private presetService: PresetService) {}

  ngOnInit(): void {}

  setPreset(preset: Preset) {
    preset.variables.map(async (preset: VariablePreset) => {
      try {
        await this.iot.getController().setValue(preset.deviceUuid, preset.variableUuid, JSON.stringify(preset.value));
      } catch (e) {
        console.error(e);
      }
    });
  }

  removePreset() {
    this.presetService.remove(this.preset);
    this.onPresetsChanged.emit(this.preset.uuid);
  }

  onLongPress($event) {
    $event.stopPropagation();
    this.trigger.openMenu();
  }
}
