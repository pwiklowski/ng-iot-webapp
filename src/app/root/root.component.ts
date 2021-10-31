import { AuthService } from "@auth0/auth0-angular";
import { Component, OnInit, ViewChild } from "@angular/core";
import { version } from "../../../package.json";
import { MatButtonToggleGroup } from "@angular/material/button-toggle";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./root.component.html",
  styleUrls: ["./root.component.scss"],
})
export class RootComponent implements OnInit {
  isLoggedIn = undefined;
  version: string;

  constructor(public auth: AuthService, private router: Router) {
    this.version = version;
    auth.isAuthenticated$.subscribe((res) => {
      this.isLoggedIn = res;
      if (!this.isLoggedIn) {
        this.auth.loginWithRedirect();
      }
    });
  }

  ngOnInit() {}

  onToggleChange(group: MatButtonToggleGroup) {
    this.router.navigate([group.value]);
  }
}
