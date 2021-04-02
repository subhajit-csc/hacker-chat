import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, EMPTY, BehaviorSubject, throwError } from 'rxjs';
import { User } from '../../_models';
import { tap, pluck, catchError, map } from 'rxjs/operators';


interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class EditUserService {
  private user$ = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) { }

  me(): Observable<User> {
    const token: string | null = localStorage.getItem('token');

    if (token === null) {
      return EMPTY;
    }

    return this.http.get<User>('/api/v1/users/me').pipe(
      tap((user) => {
        this.setUser(user);
        //console.log(user)
      }),
     // pluck('user')
    );
  }
  update(userDetails) {
    return this.http.patch('/api/v1/users/me', userDetails)
      .pipe(
        map(response => {
          console.log(response)        

          if (response && (response as any).user) {
            
            let loginUser = ((response as any).user as User).name
            localStorage.setItem('loginUser', loginUser);

            localStorage.setItem('currentUser', JSON.stringify((response as any).user));
            
            return true;
          }
          else return false;
        }),
        catchError(this.handleError)
      );

  }


  setUser(user: User | null): void {
    if (user) {
      user.isAdmin = user.roles.includes('admin');
    }

    this.user$.next(user);   
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
