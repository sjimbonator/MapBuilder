import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  loginForm = this.fb.group({
    Email: ['', Validators.required],
    Password: ['', Validators.required]

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
