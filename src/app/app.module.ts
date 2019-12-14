import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LightSwitchComponent } from "./light-switch/light-switch.component";
import { ChristmasTreeSwitchComponent } from "./christmas-tree-switch/christmas-tree-switch.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { StripAnimationComponent } from "./strip-animation/strip-animation.component";
import { SlickModule } from "ngx-slick";

@NgModule({
  declarations: [
    AppComponent,
    LightSwitchComponent,
    ChristmasTreeSwitchComponent,
    StripAnimationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickModule.forRoot(),
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
