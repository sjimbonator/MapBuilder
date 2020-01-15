import { Component } from '@angular/core';
import { FormBuilder,FormControl, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { AccountModel } from '../models/account';
import  * as globals from '../globals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  account_validation_messages = {
    'Email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'Password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 6 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, one number and one special character' }
    ]
  }

  loginForm = this.fb.group({
    Email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')   //check if looks like an actual email
    ])),
    Password:  new FormControl('', Validators.compose([
      Validators.minLength(6),
	 	  Validators.required,
       Validators.pattern('^(?=.{5,})(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$') //one lowercase, one uppercase, and one number minimally
    ]))

  });

  constructor(private fb: FormBuilder, private as: AccountService, private router:Router) {}
  error : boolean = false;
  onSubmit() {
    let account : AccountModel  = new AccountModel;
    
    account = this.loginForm.value;
    this.as.getToken(account).subscribe(x => this.authenticate(x),
    err => {this.error = true; this.loginForm.reset();},
    () => this.router.navigate(['map-builder']));
  }

  authenticate(x : any)
  {
    globals.setToken(x.access_token);
    //console.log(x.access_token);
  }
}
