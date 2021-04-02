import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User, Address } from '../../../_models';
import { EditUserService } from '../../../_services';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  invalidUserEdit: boolean;
  errorMessage: any
  person: User
  public states: String[] = ['Delhi', 'Mumbai', 'Kolkata', 'Bangalore'];

  constructor(private router: Router, private editUserService: EditUserService, private _location: Location) { }

  ngOnInit(): void {
    this.person = new User()
    this.person.address = new Address()
    //Call the service
    this.editUserService.me()
      .subscribe(result => {
        console.log(result)
        this.person = result;
        this.person.password = '*******';
      });
  }

  update(myForm: NgForm) {
    //console.log(this.person)
    //console.log(myForm)
    //console.log(myForm.touched)

    let userDetails = {};
    userDetails['_id'] = this.person['_id']

    for (const field in myForm.controls) { // 'field' is a string
      if (myForm.controls[field].dirty) {
        console.log(field + '->' + myForm.controls[field].value);
        if (field.startsWith('address')) {
          let fieldName = field.split(".")[1]
          if (userDetails['address']) {
            userDetails['address'][fieldName] = myForm.controls[field].value;
          } else {
            userDetails['address'] = {};
            userDetails['address'][fieldName] = myForm.controls[field].value;
          }
        } else {
          userDetails[field] = myForm.controls[field].value;
        }

      }

    }

    if (!myForm.controls.password.dirty) {
      console.log('Password Not Updated!!')
      this.person.password = null;
    }
    //console.log(this.person)
    console.log(userDetails)

    this.editUserService.update(userDetails)
      .subscribe(result => {
          this.invalidUserEdit = false;
          this.errorMessage = null;
          //this.router.navigate(['/dashboard']);
          this._location.back();
      },
        error => {
          this.invalidUserEdit = true;
          this.errorMessage=error;

        } // error path
      );
  }
  backClicked() {
    this._location.back();
  }

}
