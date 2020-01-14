import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { AccountModel } from '../models/account';
import  * as globals from '../globals';

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

  constructor(private fb: FormBuilder, private as: AccountService) {}
  error : boolean = false;
  onSubmit() {
    let account : AccountModel  = new AccountModel;
    
    account = this.loginForm.value;
    this.as.getToken(account).subscribe(x => this.setAccessToken(x),
    err => {this.error = true; this.loginForm.reset();},
    () => console.log('Observer got a complete notification'));
  }

  setAccessToken(x : any)
  {
    globals.setToken("test");
  }
}
