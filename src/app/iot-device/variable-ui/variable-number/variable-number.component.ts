import { Input } from "@angular/core";
import { Component } from "@angular/core";
import { VariableGenericComponent } from "../variable-generic/variable-generic.component";

@Component({
  selector: "variable-number",
  templateUrl: "./variable-number.component.html",
  styleUrls: ["./variable-number.component.scss"],
})
export class VariableNumberComponent extends VariableGenericComponent {
  @Input() propValue: number;

  step = 0.01;

  ngOnInit(): void {
    super.ngOnInit();

    if (this.property.type === "integer") {
      this.step = 1;
    }
  }
}
