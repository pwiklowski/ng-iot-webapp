import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "@auth0/auth0-angular";
import { switchMap } from "rxjs/operators";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token: string;
  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.auth.idTokenClaims$.pipe(
      switchMap((token) => {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token.__raw}`,
          },
        });
        return next.handle(request);
      })
    );
  }
}
