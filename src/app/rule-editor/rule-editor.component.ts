import { ViewChild } from "@angular/core";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DeviceConfig, Rule } from "@wiklosoft/ng-iot";
import { IotService } from "../iot.service";
import { RuleSelectorComponent } from "../rule-selector/rule-selector.component";
import beautify_js from "js-beautify";

@Component({
  selector: "app-rule-editor",
  templateUrl: "./rule-editor.component.html",
  styleUrls: ["./rule-editor.component.scss"],
})
export class RuleEditorComponent implements OnInit {
  @ViewChild("codeMirror") codeMirror: any;

  devices = Array<DeviceConfig>();
  ruleId = null;
  rule: Rule;
  ready = false;

  deviceUuid = "";

  logs = Array<string>();

  editorOptions = {
    lineNumbers: true,
    extraKeys: { "Ctrl-Space": "autocomplete" },
    styleActiveLine: true,
    autoCloseBrackets: true,
    autoRefresh: true,
    matchBrackets: true,
    mode: { name: "javascript", json: true },
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { ruleId: string },
    private iot: IotService,
    public dialogRef: MatDialogRef<RuleSelectorComponent>,
    private snackBar: MatSnackBar
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

    this.iot.getController().logs.subscribe((logLine: any) => {
      if (logLine.ruleId === this.ruleId) {
        this.logs.push(logLine.ruleLogLine);
      }
    });

    this.dialogRef.afterOpened().subscribe(() => setTimeout(() => (this.ready = true), 0));
  }

  isCreated() {
    return this.ruleId !== undefined;
  }

  ngOnInit() {
    if (this.ruleId !== undefined) {
      this.iot.getRule(this.ruleId).subscribe((rule: Rule) => {
        this.rule = rule;
        this.formatCode();
      });
    }
  }

  formatCode() {
    this.rule.script = beautify_js(this.rule.script, {
      indent_size: 2,
      indent_char: " ",
      wrap_line_length: 80,
    });
  }

  compareDevices(dev1, dev2) {
    return dev1 === dev2;
  }

  getVariables() {
    return this.rule.deviceUuid && this.devices.find((device) => device.deviceUuid === this.rule.deviceUuid)?.vars;
  }

  save() {
    if (this.isCreated()) {
      this.iot.updateRule(this.ruleId, this.rule).subscribe(() => {
        this.snackBar.open("Rule updated", null, {
          duration: 3000,
        });
      });
      this.formatCode();
    } else {
      this.iot.createRule(this.rule).subscribe(() => {
        this.snackBar.open("Rule created", null, {
          duration: 3000,
        });
        this.dialogRef.close();
      });
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
