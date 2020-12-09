import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { IotService } from "src/app/iot.service";
import { Variable } from "src/app/models";
import { Validator } from "jsonschema";

@Component({
  selector: "app-variable",
  templateUrl: "./variable.component.html",
  styleUrls: ["./variable.component.scss"],
})
export class VariableComponent implements OnInit {
  @Input() deviceUuid: string;
  @Input() variableUuid: string;
  @Input() variable: Variable;
  value: any;
  validator: Validator;
  isValid = true;
  validationError: string;

  constructor(private iot: IotService) {
    this.validator = new Validator();
  }

  ngOnInit() {
    this.iot
      .getController()
      .observe(this.deviceUuid, this.variableUuid)
      .subscribe((newValue: any) => {
        this.value = JSON.stringify(newValue, null, 2);
      });
  }

  validate(value: any) {
    try {
      const validationResponse = this.validator.validate(JSON.parse(value), this.variable.schema);
      this.isValid = validationResponse.valid;

      if (!validationResponse.valid) {
        console.error("unable to validate new value", validationResponse);
        this.validationError = validationResponse.errors.map((error) => error.stack).join(",");
      } else {
        this.validationError = "";
      }
    } catch (e) {
      this.isValid = false;
      this.validationError = e.message;
    }
  }

  async update(value: any) {
    try {
      const res = await this.iot.getController().setValue(this.deviceUuid, this.variableUuid, value);
      this.value = value;
    } catch (e) {
      console.error("Unable to set value to", value);
      this.value = this.value + " "; //force refresh
    }
  }
}
