import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { AuthService } from '../../_services/auth/auth.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to the api url
    const authToken = this.authService.getAuthorizationToken();
    //console.log(authToken)
    const isLoggedIn = this.authService.isLoggedIn()
    //console.log(isLoggedIn)
    //const isApiUrl = request.url.startsWith(environment.apiUrl);
    //console.log(request.url)
    //console.log(environment.apiUrl)
    //console.log(isApiUrl)
    if (authToken && isLoggedIn) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
    }

    return next.handle(request);
  }
}
