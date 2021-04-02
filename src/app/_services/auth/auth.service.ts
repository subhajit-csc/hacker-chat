import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import { catchError, retry, map } from 'rxjs/operators';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../_models/user';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loginUser: string
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(credentials) {
    return this.httpClient.post( '/api/v1/users/login', credentials)
      .pipe(
        map(response => {
          //console.log(response)

          if (response && (response as any).user) {
            localStorage.setItem('token', response['token']);

            console.log((response as any).user)
            this.loginUser = ((response as any).user as User).name
            localStorage.setItem('loginUser', this.loginUser);

            localStorage.setItem('currentUser', JSON.stringify((response as any).user));
            this.currentUserSubject.next((response as any).user);
            return true;
          }
          else return false;
        }),
      catchError(this.handleError)
    );

  }

  logout() {
    return this.httpClient.post( '/api/v1/users/logout','')
      .pipe(
        map(response => {

            // remove user from local storage to log user out
            localStorage.removeItem('token');
            this.currentUser = null;

          localStorage.removeItem('loginUser');
          this.loginUser = null;
            // remove user from local storage to log user out
            localStorage.removeItem('currentUser');
            this.currentUserSubject.next(null);
            return true;

        }),
        catchError(this.handleError)
      );
  }

  isLoggedIn() {
    return tokenNotExpired('token');
  }
  getAuthorizationToken() {
    return localStorage.getItem('token');
  }
  getLoginUserName() {
    return localStorage.getItem('loginUser');
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
