import { AliasDialogComponent } from "./alias-dialog/alias-dialog.component";
import { IotService } from "./../iot.service";
import { Component, EventEmitter, Input, OnInit } from "@angular/core";
import { DeviceConfig, Alias } from "@wiklosoft/ng-iot";
import { MatDialog } from "@angular/material/dialog";
import { Output } from "@angular/core";

@Component({
  selector: "app-iot-device",
  templateUrl: "./iot-device.component.html",
  styleUrls: ["./iot-device.component.scss"],
})
export class IotDeviceComponent implements OnInit {
  @Input() deviceUuid: string;
  @Output() removed = new EventEmitter();

  deviceConfig: DeviceConfig = null;

  alias: Alias = undefined;

  constructor(private iot: IotService, public dialog: MatDialog) {}

  async ngOnInit() {
    this.deviceConfig = await this.iot.getController().getDevice(this.deviceUuid);

    this.iot.aliases.subscribe((aliases: Array<Alias>) => {
      this.alias = aliases.find((alias) => alias.deviceUuid === this.deviceUuid);
    });
  }

  createAlias() {
    const dialogRef = this.dialog.open(AliasDialogComponent, {
      width: "250px",
      data: { alias: this.alias },
    });

    dialogRef.afterClosed().subscribe((alias) => {
      if (alias) {
        if (this.alias !== undefined) {
          this.iot.updateAlias(this.alias.id, { name: alias, deviceUuid: this.deviceUuid }).subscribe(() => {
            this.iot.updateAliases();
          });
        } else {
          this.iot.createAlias({ name: alias, deviceUuid: this.deviceUuid }).subscribe(() => {
            this.iot.updateAliases();
          });
        }
        this.alias = { name: alias, deviceUuid: this.deviceUuid };
      } else {
        if (this.alias !== undefined) {
          this.iot.deleteAlias(this.alias.id).subscribe(() => {
            this.iot.updateAliases();
          });
        }
      }
    });
  }

  removeDevice() {
    this.iot.deleteDevice(this.deviceUuid).subscribe(() => {
      this.removed.emit();
    });
  }
}
