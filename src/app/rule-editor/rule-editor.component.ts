import { variable } from "@angular/compiler/src/output/output_ast";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DeviceConfig, Rule } from "@wiklosoft/ng-iot";
import { IotService } from "../iot.service";
import { RuleSelectorComponent } from "../rule-selector/rule-selector.component";

@Component({
  selector: "app-rule-editor",
  templateUrl: "./rule-editor.component.html",
  styleUrls: ["./rule-editor.component.scss"],
})
export class RuleEditorComponent implements OnInit {
  devices = Array<DeviceConfig>();

  ruleId = null;
  rule: Rule;

  deviceUuid = "";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { ruleId: string },
    private iot: IotService,
    public dialogRef: MatDialogRef<RuleSelectorComponent>
  ) {
    this.ruleId = data?.ruleId;
    this.iot.getController().getDevices((devices) => (this.devices = devices));
    console.log("rule id", this.ruleId);

    this.rule = {
      name: null,
      deviceUuid: null,
      variableUuid: null,
      script: null,
    };
  }

  isCreated() {
    return this.ruleId !== undefined;
  }

  ngOnInit() {
    if (this.ruleId !== undefined) {
      this.iot.getRule(this.ruleId).subscribe((rule: Rule) => {
        this.rule = rule;
      });
    }
  }
  compareDevices(dev1, dev2) {
    return dev1 === dev2;
  }

  getVariables() {
    return this.rule.deviceUuid && this.devices.find((device) => device.deviceUuid === this.rule.deviceUuid)?.vars;
  }

  save() {
    if (this.isCreated()) {
      this.iot.updateRule(this.ruleId, this.rule).subscribe(() => this.dialogRef.close());
    } else {
      this.iot.createRule(this.rule).subscribe(() => this.dialogRef.close());
    }
  }

  isValid() {
    return (
      this.rule.name &&
      this.rule.name.length > 0 &&
      this.rule.deviceUuid &&
      this.rule.deviceUuid.length > 0 &&
      this.rule.variableUuid &&
      this.rule.variableUuid.length > 0 &&
      this.rule.script &&
      this.rule.script.length > 0
    );
  }
}
