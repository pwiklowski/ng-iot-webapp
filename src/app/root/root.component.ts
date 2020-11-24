import { AuthService } from "@auth0/auth0-angular";
import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./root.component.html",
  styleUrls: ["./root.component.scss"],
})
export class RootComponent implements OnInit {
  isLoggedIn = false;

  constructor(router: Router, public auth: AuthService) {
    auth.isAuthenticated$.subscribe((res) => (this.isLoggedIn = res));

    router.events.subscribe((s: NavigationEnd) => {
      if (s instanceof NavigationEnd && s.url && s.url.indexOf("login") === -1) {
        console.log(s.url);
        // if (auth.isTokenValid()) {
        //   console.log("token is valid");
        // } else {
        //   console.log("new token is needed", router.url);
        //   router.navigate(["/login"]);
        // }
      }
    });
  }

  ngOnInit() {}
}
