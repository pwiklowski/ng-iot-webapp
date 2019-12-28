import { Component, OnInit, Input } from "@angular/core";
import { IotService } from "../iot.service";

@Component({
  selector: "app-light-switch",
  templateUrl: "./light-switch.component.html",
  styleUrls: ["./light-switch.component.scss"]
})
export class LightSwitchComponent {
  state: Boolean | undefined = undefined;
  @Input() deviceUuid: string;
  @Input() variableUuid: string;
  @Input() name: string;

  constructor(private iot: IotService) {}

  ngOnInit() {
    setTimeout(() => {
      this.iot
        .getController()
        .observe(this.deviceUuid, this.variableUuid)
        .subscribe((newValue: any) => {
          console.log("new value", newValue);
          if (newValue !== undefined) {
            this.state = newValue.state;
          } else {
            this.state = undefined;
          }
        });
    }, 1000);
  }

  toggle() {
    const state = !this.state;
    this.iot
      .getController()
      .setValue(this.deviceUuid, this.variableUuid, { state });
  }
}
