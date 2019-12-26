import { Component, OnInit } from "@angular/core";
import { IotService } from "../iot.service";
import { Router, Event, NavigationEnd } from "@angular/router";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(
    private iot: IotService,
    private router: Router,
    private auth: AuthService
  ) {
    if (auth.isTokenValid()) {
      console.log("token is valid");
    } else {
      console.log("new token is needed");
      auth.login();
    }

    router.events.subscribe((s: NavigationEnd) => {
      if (s.url) {
        const params = s.url.split("#")[1];
        let queryParams = new URLSearchParams(params);
        if (queryParams.get("access_token") && queryParams.get("expires_in")) {
          const expirationTokenDate: number =
            new Date().getTime() +
            parseInt(queryParams.get("expires_in")) * 1000;

          auth.saveToken(queryParams.get("access_token"), expirationTokenDate);
        }
      }
    });
  }

  ngOnInit() {}
}
