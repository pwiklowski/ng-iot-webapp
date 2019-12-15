import { Component } from "@angular/core";
import { IotService } from "./iot.service";
import { version } from "../../package.json";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  version: string;

  constructor(private iot: IotService) {
    this.version = version;
  }
}
