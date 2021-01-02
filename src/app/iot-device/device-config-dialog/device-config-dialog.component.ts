import { Inject } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-device-config-dialog",
  templateUrl: "./device-config-dialog.component.html",
  styleUrls: ["./device-config-dialog.component.scss"],
})
export class DeviceConfigDialogComponent implements OnInit {
  config: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    if (data.config) {
      this.config = data.config;
    }
  }

  ngOnInit(): void {}
}
