import { Component, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-settings-name",
  templateUrl: "./settings-name.component.html",
  styleUrls: ["./settings-name.component.scss"],
})
export class SettingsNameDialog {
  name: string;

  constructor(public dialogRef: MatDialogRef<SettingsNameDialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
