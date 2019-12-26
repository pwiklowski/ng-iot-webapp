import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  loginUrl: string = `https://auth.wiklosoft.com/web/authorize?client_id=${environment.clientId}&login_redirect_uri=/web/authorize&redirect_uri=${environment.redirectUri}&response_type=token&scope=read`;

  constructor() {}

  isTokenValid() {
    const tokenExpire = parseInt(localStorage.getItem("tokenExpire"));
    const token = localStorage.getItem("token");
    const tokenExpireTime = tokenExpire - this.getNow();
    console.log("isTokenValid", tokenExpireTime / 1000);

    return token && tokenExpire - this.getNow() > 0;
  }

  getNow() {
    return new Date().getTime();
  }

  login() {
    window.location.href = this.loginUrl;
  }

  saveToken(token: string, expirationTokenDate: number) {
    console.log("save token");
    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpire", expirationTokenDate.toString());
  }
}
