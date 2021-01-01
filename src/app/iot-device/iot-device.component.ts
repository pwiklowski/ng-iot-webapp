import { IotService } from "./../iot.service";
import { Component, Input, OnInit } from "@angular/core";
import { DeviceConfig, Alias } from "@wiklosoft/ng-iot";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-iot-device",
  templateUrl: "./iot-device.component.html",
  styleUrls: ["./iot-device.component.scss"],
})
export class IotDeviceComponent implements OnInit {
  @Input() deviceUuid: string;

  deviceConfig: DeviceConfig = null;

  alias: Alias = undefined;

  constructor(private iot: IotService, public dialog: MatDialog) {}

  async ngOnInit() {
    this.deviceConfig = await this.iot.getController().getDevice(this.deviceUuid);

    this.iot.aliases.subscribe((aliases: Array<Alias>) => {
      this.alias = aliases.find((alias) => alias.deviceUuid === this.deviceUuid);
    });
  }
}
