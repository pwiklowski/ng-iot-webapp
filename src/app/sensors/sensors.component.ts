import { Component, OnInit, Input } from "@angular/core";
import { IotService } from "../iot.service";

@Component({
  selector: "app-sensors",
  templateUrl: "./sensors.component.html",
  styleUrls: ["./sensors.component.scss"]
})
export class SensorsComponent implements OnInit {
  value: Object = undefined;
  @Input() deviceUuid: string;
  @Input() variableUuid: string;

  constructor(private iot: IotService) {}

  ngOnInit() {
    setTimeout(() => {
      this.iot
        .observe(this.deviceUuid, this.variableUuid)
        .subscribe((newValue: any) => {
          console.log("new value", newValue);
          if (newValue !== undefined) {
            this.value = newValue;
            this.value.temperature = this.value.temperature.toFixed(1);
          } else {
            this.value = undefined;
          }
        });
    }, 1000);
  }
}
