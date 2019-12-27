import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  loginUrl: string = `https://auth.wiklosoft.com/web/authorize?client_id=${environment.clientId}&login_redirect_uri=/web/authorize&redirect_uri=${environment.redirectUri}&response_type=token&scope=read`;

  TOKEN_KEY = "token_key";
  TOKEN_EXPIRE_KEY = "token_expire_key";

  constructor() {}

  isTokenValid() {
    const tokenExpire = parseInt(localStorage.getItem(this.TOKEN_EXPIRE_KEY));
    const token = localStorage.getItem(this.TOKEN_KEY);
    const tokenExpireTime = tokenExpire - this.getNow();
    console.log("isTokenValid", tokenExpireTime / 1000);

    return token && tokenExpire - this.getNow() > 0;
  }

  getNow() {
    return new Date().getTime();
  }

  getToken(): string {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  login() {
    window.location.href = this.loginUrl;
  }

  saveToken(token: string, expirationTokenDate: number) {
    console.log("save token");
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.TOKEN_EXPIRE_KEY, expirationTokenDate.toString());
  }
}
