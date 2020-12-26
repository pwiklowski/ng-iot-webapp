import { ConfigrmationDialogComponent } from "./configrmation-dialog/configrmation-dialog.component";
import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { DeviceConfig, Rule } from "@wiklosoft/ng-iot";
import { IotService } from "../iot.service";
import { RuleEditorComponent } from "../rule-editor/rule-editor.component";
import { ConfirmationDialogComponent } from "./confirmation-dialog/confirmation-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-rule-selector",
  templateUrl: "./rule-selector.component.html",
  styleUrls: ["./rule-selector.component.scss"],
})
export class RuleSelectorComponent implements OnInit {
  rules = Array<Rule>();
  devices = Array<DeviceConfig>();

  constructor(
    private iot: IotService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RuleSelectorComponent>
  ) {}

  ngOnInit(): void {
    this.updateRules();
    this.iot.getController().getDevices((devices) => {
      this.devices = devices;
    });
  }

  updateRules() {
    this.iot.getRules().subscribe((rule: Array<Rule>) => {
      this.rules = rule;
    });
  }

  openRule(ruleId: string) {
    const dialogRef = this.dialog.open(RuleEditorComponent, {
      minWidth: 350,
      data: { ruleId },
    });
    this.dialogRef.close();
  }

  deleteRule($event, ruleId: string) {
    $event.stopPropagation();
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      minWidth: 350,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.iot.deleteRule(ruleId).subscribe(() => {
          this.updateRules();
          this.snackBar.open("Rule removed", null, {
            duration: 1000,
          });
        });
      }
    });
  }

  createRule() {
    const dialogRef = this.dialog.open(RuleEditorComponent, {
      minWidth: 350,
    });
    this.dialogRef.close();
  }

  getDeviceName(deviceUuid: string) {
    return this.devices.find((device) => device.deviceUuid === deviceUuid)?.name;
  }
}
