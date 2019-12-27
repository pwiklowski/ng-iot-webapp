import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./root.component.html",
  styleUrls: ["./root.component.scss"]
})
export class RootComponent implements OnInit {
  constructor(auth: AuthService, router: Router) {
    router.events.subscribe((s: NavigationEnd) => {
      if (
        s instanceof NavigationEnd &&
        s.url &&
        s.url.indexOf("login") === -1
      ) {
        console.log(s.url);
        if (auth.isTokenValid()) {
          console.log("token is valid");
        } else {
          console.log("new token is needed", router.url);
          router.navigate(["/login"]);
        }
      }
    });
  }

  ngOnInit() {}
}
