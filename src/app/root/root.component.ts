import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./root.component.html",
  styleUrls: ["./root.component.scss"]
})
export class RootComponent implements OnInit {
  constructor(auth: AuthService) {
    if (auth.isTokenValid()) {
      console.log("token is valid");
    } else {
      console.log("new token is needed");
      auth.login();
    }
  }

  ngOnInit() {}
}
