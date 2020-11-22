import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LightSwitchComponent } from "./light-switch/light-switch.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { SlickModule } from "ngx-slick";
import { LoginComponent } from "./login/login.component";
import { RootComponent } from "./root/root.component";

@NgModule({
  declarations: [
    AppComponent,
    LightSwitchComponent,
    LoginComponent,
    RootComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickModule.forRoot(),
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [RootComponent],
})
export class AppModule {}
