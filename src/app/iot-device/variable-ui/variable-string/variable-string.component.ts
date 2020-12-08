import { Component } from "@angular/core";
import { VariableGenericComponent } from "../variable-generic/variable-generic.component";

@Component({
  selector: "variable-string",
  templateUrl: "./variable-string.component.html",
  styleUrls: ["./variable-string.component.scss"],
})
export class VariableStringComponent extends VariableGenericComponent {}
