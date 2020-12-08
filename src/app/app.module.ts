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

@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    IotDeviceComponent,
    VariableComponent,
    VariableUiComponent,
    VariableStringComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

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
  ],
  providers: [KeyValuePipe, JsonPipe],
  bootstrap: [RootComponent],
})
export class AppModule {}
