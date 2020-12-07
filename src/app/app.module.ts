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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, RootComponent, IotDeviceComponent, VariableComponent, VariableUiComponent],
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
  ],
  providers: [KeyValuePipe, JsonPipe],
  bootstrap: [RootComponent],
})
export class AppModule {}
