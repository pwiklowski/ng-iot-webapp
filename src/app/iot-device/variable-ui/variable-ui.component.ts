import { Component, Input, OnInit } from "@angular/core";
import { IotService } from "src/app/iot.service";
import { Variable } from "src/app/models";

@Component({
  selector: "app-variable-ui",
  templateUrl: "./variable-ui.component.html",
  styleUrls: ["./variable-ui.component.scss"],
})
export class VariableUiComponent implements OnInit {
  @Input() deviceUuid: string;
  @Input() variableUuid: string;
  @Input() variable: Variable;

  constructor(private iot: IotService) {}

  ngOnInit(): void {
    console.log(this.variable.schema);
    this.iot
      .getController()
      .observe(this.deviceUuid, this.variableUuid)
      .subscribe((newValue: any) => {
        console.log("value update", newValue);
        this.variable.value = newValue;
      });
  }

  getPropertiesList(obj) {
    return obj.properties;
  }

  async onValueChange(value) {
    const newValue = { ...this.variable.value, ...value };
    console.log("onValueChange", newValue);

    try {
      const res = await this.iot.getController().setValue(this.deviceUuid, this.variableUuid, JSON.stringify(newValue));
    } catch (e) {
      console.error("Unable to set value to", newValue);
    }
  }
}
