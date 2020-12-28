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
  @Input() parents: [];
  @Input() property: any;
  @Input() variable: Variable;
  @Output() valueChange = new EventEmitter<object>();

  validator: Validator;
  validationError: string;
  propValue: any;

  constructor() {
    this.validator = new Validator();
  }

  ngOnInit(): void {
    this.propValue = this.getPropValue();
  }

  ngOnUpdate() {
    this.propValue = this.getPropValue();
  }

  getPropValue() {
    let obj = this.variable.value;
    if (obj) {
      for (let prop of this.parents) {
        obj = obj[prop];
      }
      return obj;
    }
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

  getNewValue() {
    let newValue = JSON.parse(JSON.stringify(this.variable.value));
    let obj = newValue;

    for (let prop of this.parents.slice(0, this.parents.length - 1)) {
      obj = obj[prop];
    }
    obj[this.parents[this.parents.length - 1]] = this.propValue;
    return newValue;
  }

  onChange() {
    const updatedValue = this.getNewValue();
    if (this.validate(updatedValue)) {
      this.valueChange.emit(updatedValue);
    }
  }

  isWritable() {
    return this.variable.access.includes("w");
  }
}
