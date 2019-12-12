import { Component } from "@angular/core";
import { IotService } from "./iot.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  value: string;
  constructor(private iot: IotService) {}
}
