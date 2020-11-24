import { Component, Input, OnInit } from "@angular/core";
import { IotService } from "src/app/iot.service";

@Component({
  selector: "app-variable",
  templateUrl: "./variable.component.html",
  styleUrls: ["./variable.component.scss"],
})
export class VariableComponent implements OnInit {
  @Input() deviceUuid: string;
  @Input() variableUuid: string;
  @Input() name: string;
  value: any;

  constructor(private iot: IotService) {}

  ngOnInit() {
    this.iot
      .getController()
      .observe(this.deviceUuid, this.variableUuid)
      .subscribe((newValue: any) => {
        this.value = JSON.stringify(newValue);
      });
  }

  async update() {
    await this.iot.getController().setValue(this.deviceUuid, this.variableUuid, this.value);
  }
}
