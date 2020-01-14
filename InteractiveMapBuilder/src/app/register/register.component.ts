import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountModel } from '../models/account';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = this.fb.group({
    Email: ['', Validators.required],
    Password: ['', Validators.required],
    ConfirmPassword: ['', Validators.required]

  });

  constructor(private fb: FormBuilder, private accService: AccountService) {}

  onSubmit() {
    console.warn(this.registerForm.value);
    let account : AccountModel  = new AccountModel;
    account = this.registerForm.value;
    this.accService.register(account).subscribe(x => console.log('Observer got a next value: ' + x),
    err => console.error('Observer got an error: ' + err),
    () => console.log('Observer got a complete notification'));
    this.clearInput()
  }

  clearInput() {
    this.registerForm.reset();
  }
}
