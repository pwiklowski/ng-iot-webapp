import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { SlickModule } from "ngx-slick";
import { LoginComponent } from "./login/login.component";
import { RootComponent } from "./root/root.component";
import { IotDeviceComponent } from "./iot-device/iot-device.component";
import { JsonPipe, KeyValuePipe } from "@angular/common";
import { VariableComponent } from "./iot-device/variable/variable.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, LoginComponent, RootComponent, IotDeviceComponent, VariableComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickModule.forRoot(),
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
    FormsModule,
  ],
  providers: [KeyValuePipe, JsonPipe],
  bootstrap: [RootComponent],
})
export class AppModule {}
