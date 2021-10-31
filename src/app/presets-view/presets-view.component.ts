import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Preset } from "../../../../library/build";
import { IotService } from "../iot.service";

@Component({
  selector: "app-presets-view",
  templateUrl: "./presets-view.component.html",
  styleUrls: ["./presets-view.component.scss"],
})
export class PresetsViewComponent implements OnInit {
  savedPresets: Array<Preset>;

  constructor(private iot: IotService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.reloadPresets();
  }

  reloadPresets() {
    this.iot.getPresets().subscribe((presets: Array<Preset>) => {
      this.savedPresets = presets;
      this.cdr.markForCheck();
    });
  }
}
