import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../_services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //currentUser: any
  constructor( private _router: Router, private _authService: AuthService) {
  }

  ngOnInit(): void {
   // this.currentUser = this.authService.currentUser.name
  }
  get authService() { return this._authService }

  isLoggedIn() {
    return this._authService.isLoggedIn();
  }
  logout() {
    //this._authService.logout()
    //this.router.navigate(['/login']);

    //console.log("Login submited")
    this._authService.logout()
      .subscribe(result => {
        this._router.navigate(['/login']);
      },
        error => {
          //this.invalidLogin = true;
          console.log("Logout error!!")
        } // error path
      );
  }
}
