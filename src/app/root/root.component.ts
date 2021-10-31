import { AuthService } from "@auth0/auth0-angular";
import { Component, OnInit } from "@angular/core";
import { version } from "../../../package.json";

@Component({
  selector: "app-root",
  templateUrl: "./root.component.html",
  styleUrls: ["./root.component.scss"],
})
export class RootComponent implements OnInit {
  isLoggedIn = undefined;
  version: string;

  constructor(public auth: AuthService) {
    this.version = version;
    auth.isAuthenticated$.subscribe((res) => {
      this.isLoggedIn = res;
      if (!this.isLoggedIn) {
        this.auth.loginWithRedirect();
      }
    });
  }

  ngOnInit() {}
}
