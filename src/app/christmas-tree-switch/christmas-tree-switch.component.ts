import { Component, OnInit } from "@angular/core";
import { LightSwitchComponent } from "../light-switch/light-switch.component";

@Component({
  selector: "app-christmas-tree-switch",
  templateUrl: "./christmas-tree-switch.component.html",
  styleUrls: ["./christmas-tree-switch.component.scss"]
})
export class ChristmasTreeSwitchComponent extends LightSwitchComponent {}
