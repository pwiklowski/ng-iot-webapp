import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AuthModule } from "@auth0/auth0-angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";

import { RootComponent } from "./root/root.component";
import { IotDeviceComponent } from "./iot-device/iot-device.component";
import { JsonPipe, KeyValuePipe } from "@angular/common";
import { VariableComponent } from "./iot-device/variable/variable.component";
import { FormsModule } from "@angular/forms";
import { VariableUiComponent } from "./iot-device/variable-ui/variable-ui.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSliderModule } from "@angular/material/slider";
import { MatSelectModule } from "@angular/material/select";
import { VariableStringComponent } from "./iot-device/variable-ui/variable-string/variable-string.component";
import { MatInputModule } from "@angular/material/input";
import { VariableNumberComponent } from "./iot-device/variable-ui/variable-number/variable-number.component";
import { VariableGenericComponent } from "./iot-device/variable-ui/variable-generic/variable-generic.component";
import { MatTabsModule } from "@angular/material/tabs";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { PresetsComponent } from "./presets/presets.component";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { CreatePresetComponent } from "./create-preset/create-preset.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatCheckboxModule } from "@angular/material/checkbox";

import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material/snack-bar";
import { LongPress } from "./long-press";
import { MatMenuModule } from "@angular/material/menu";
import { PresetButtonComponent } from "./presets/preset-button/preset-button.component";
import { RuleEditorComponent } from "./rule-editor/rule-editor.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptor } from "src/token.interceptor";
import { RuleSelectorComponent } from "./rule-selector/rule-selector.component";
import { MatListModule } from "@angular/material/list";
import { ConfirmationDialogComponent } from "./rule-selector/confirmation-dialog/confirmation-dialog.component";
import { CodemirrorModule } from "@ctrl/ngx-codemirror";
import { MatTooltipModule } from "@angular/material/tooltip";
import { AliasDialogComponent } from './iot-device/alias-dialog/alias-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    IotDeviceComponent,
    VariableComponent,
    VariableUiComponent,
    VariableStringComponent,
    VariableNumberComponent,
    VariableGenericComponent,
    PresetsComponent,
    CreatePresetComponent,
    LongPress,
    PresetButtonComponent,
    RuleEditorComponent,
    RuleSelectorComponent,
    ConfirmationDialogComponent,
    AliasDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
    FormsModule,
    AuthModule.forRoot({
      domain: "wiklosoft.eu.auth0.com",
      clientId: "d9MufLpgGizDwBqZFB5JJpt3rD3xmVME",
    }),
    BrowserAnimationsModule,
    MatSliderModule,
    MatSelectModule,
    MatInputModule,
    MatTabsModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatBottomSheetModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatMenuModule,
    MatListModule,
    FormsModule,
    CodemirrorModule,
    MatTooltipModule,
  ],
  providers: [
    KeyValuePipe,
    JsonPipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
  ],
  bootstrap: [RootComponent],
})
export class AppModule {}
