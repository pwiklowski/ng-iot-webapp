import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-alias-dialog",
  templateUrl: "./alias-dialog.component.html",
  styleUrls: ["./alias-dialog.component.scss"],
})
export class AliasDialogComponent {
  alias: string;

  constructor(public dialogRef: MatDialogRef<AliasDialogComponent>, @Inject(MAT_DIALOG_DATA) public data) {
    if (data.alias) {
      this.alias = data.alias.name;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
