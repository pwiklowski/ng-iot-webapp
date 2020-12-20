import { SettingsService } from "./../settings.service";
import { IotService } from "./../iot.service";
import { Component, Input, OnInit } from "@angular/core";
import { DeviceConfig } from "@wiklosoft/ng-iot";
import { MatDialog } from "@angular/material/dialog";
import { SettingsNameDialog } from "./settings-name/settings-name.component";

@Component({
  selector: "app-iot-device",
  templateUrl: "./iot-device.component.html",
  styleUrls: ["./iot-device.component.scss"],
})
export class IotDeviceComponent implements OnInit {
  @Input() deviceUuid: string;

  deviceConfig: DeviceConfig = null;

  constructor(private iot: IotService, private settings: SettingsService, public dialog: MatDialog) {}

  async ngOnInit() {
    this.deviceConfig = await this.iot.getController().getDevice(this.deviceUuid);
  }

  async save() {
    const dialogRef = this.dialog.open(SettingsNameDialog, {
      width: "350px",
    });

    dialogRef.afterClosed().subscribe(async (name) => {
      if (name) {
        const device = await this.iot.getController().getDevice(this.deviceUuid);
        const variables = Object.keys(device.vars).map((key) => {
          return { uuid: key, value: device.vars[key].value };
        });
        this.settings.save(name, this.deviceConfig.name, this.deviceUuid, variables);
      }
    });
  }
}
