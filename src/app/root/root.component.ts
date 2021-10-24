import { AuthService } from "@auth0/auth0-angular";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./root.component.html",
  styleUrls: ["./root.component.scss"],
})
export class RootComponent implements OnInit {
  isLoggedIn = undefined;

  constructor(public auth: AuthService) {
    auth.isAuthenticated$.subscribe((res) => {
      this.isLoggedIn = res;
      if (!this.isLoggedIn) {
        this.auth.loginWithRedirect();
      }
    });
  }

  ngOnInit() {}
}
