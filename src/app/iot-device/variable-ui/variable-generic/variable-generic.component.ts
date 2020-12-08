import { EventEmitter, Input, Output } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { Validator } from "jsonschema";
import { Variable } from "src/app/models";

@Component({
  selector: "variable-generic",
  templateUrl: "./variable-generic.component.html",
  styleUrls: ["./variable-generic.component.scss"],
})
export class VariableGenericComponent implements OnInit {
  @Input() name: string;
  @Input() property: object; // TODO
  @Input() variable: Variable;
  @Input() propValue: any;
  @Output() valueChange = new EventEmitter<object>();

  validator: Validator;
  validationError: string;

  constructor() {
    this.validator = new Validator();
  }

  ngOnInit(): void {
    console.log(this.property);
  }

  validate(value: any) {
    try {
      const validationResponse = this.validator.validate(value, this.variable.schema);

      if (!validationResponse.valid) {
        this.validationError = validationResponse.errors.map((error) => error.stack).join(",");
        return false;
      } else {
        this.validationError = "";
        return true;
      }
    } catch (e) {
      this.validationError = e.message;
    }
    return false;
  }

  onChange() {
    const updatedValue = { ...this.variable.value, [this.name]: this.propValue };
    console.log("updated value", updatedValue);
    if (this.validate(updatedValue)) {
      this.valueChange.emit(updatedValue);
    }
  }
}
