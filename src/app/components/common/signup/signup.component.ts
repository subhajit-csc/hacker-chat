import { Component, OnInit } from '@angular/core';
import { User, Address } from '../../../_models';
import { SignupService } from '../../../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  invalidSignup: boolean;
  person: User
  public states: String[] = ['Delhi','Mumbai','Kolkata','Bangalore'];

  constructor(private router: Router, private signupService: SignupService) { }

  ngOnInit(): void {
    this.person = new User()
    this.person.address = new Address()
  }

  save() {
    this.signupService.save(this.person)
      .subscribe(result => {
        if (result)
          this.router.navigate(['/login']);
        else
          this.invalidSignup = true;
      });
  }

}
