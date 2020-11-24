import { IotService } from "./../iot.service";
import { Component, Input, OnInit } from "@angular/core";
import { DeviceConfig } from "@wiklosoft/ng-iot";

@Component({
  selector: "app-iot-device",
  templateUrl: "./iot-device.component.html",
  styleUrls: ["./iot-device.component.scss"],
})
export class IotDeviceComponent implements OnInit {
  @Input() deviceUuid: string;

  deviceConfig: DeviceConfig = null;

  constructor(private iot: IotService) {}

  async ngOnInit() {
    this.deviceConfig = await this.iot.getController().getDevice(this.deviceUuid);
    console.log(this.deviceConfig);
  }
}
