import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { User } from '../../_models';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  save(user: User) {
    console.log(user)
    //TODo: As of now set Admin role
    user.roles = ['admin'];

    return this.http.post('/api/v1/users/signup', user)
      .map(response => {
        let result = response
        console.log("Sign Up End Point Response" + response)
        if (result) {
          //localStorage.setItem('token', result.token);


          return true;
        }
        else return false;
      });
    //localStorage['person' + person.id] = JSON.stringify(person);
  }
}
