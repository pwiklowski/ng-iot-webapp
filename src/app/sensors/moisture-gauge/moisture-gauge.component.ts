import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-moisture-gauge",
  templateUrl: "./moisture-gauge.component.html",
  styleUrls: ["./moisture-gauge.component.scss"]
})
export class MoistureGaugeComponent {
  @Input() value: number;

  MAX_VALUE = 2600;
  MIN_VALUE = 1500;

  percentValue: number = 0;
  constructor() {}

  ngOnChanges() {
    console.log(this.value);
    this.percentValue = Math.round(
      ((this.MAX_VALUE - this.value) / (this.MAX_VALUE - this.MIN_VALUE)) * 100
    );

    this.percentValue = 60;

    if (this.percentValue < 3) {
      this.percentValue = 3;
    } else if (this.percentValue > 100) {
      this.percentValue = 100;
    }
  }

  getClass() {
    if (this.percentValue > 50) {
      return "gauge-good";
    } else if (this.percentValue > 30) {
      return "gauge-medium";
    } else if (this.percentValue > 10) {
      return "gauge-bad";
    } else {
      return "gauge-verybad";
    }
  }
}
