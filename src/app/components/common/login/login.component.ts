import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;
  submitted = false;

  constructor(
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  signIn(credentials) {
    this.submitted = true;
    //console.log("Login submited")
    this.authService.login(credentials)
      .subscribe(result => {
        console.log(result)
        if (result)
          this.router.navigate(['/chat']);
        else
          this.invalidLogin = true;
      },
        error => { this.invalidLogin = true; } // error path
      );
  }
}
