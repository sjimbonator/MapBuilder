import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective,NgForm, Validators } from '@angular/forms';import { AccountModel } from '../models/account';
import { AccountService } from '../services/account.service';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  myForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  account_validation_messages = {
    'Email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'ConfirmPassword': [
      { type: 'required', message: 'Confirm password is required' },
    ],
    'Password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 6 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ]
  }


  registerForm = this.fb.group({
    Email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')   //check if looks like an actual email
    ])),
    Password:  new FormControl('', Validators.compose([
      Validators.minLength(6),
	 	  Validators.required,
      Validators.pattern('^(?=.{5,})(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$') //one lowercase, one uppercase, and one number minimally
    ])),
    ConfirmPassword: ['']
    }, { validator: this.checkPasswords


  });

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.Password.value;
    let confirmPass = group.controls.ConfirmPassword.value;
    return pass === confirmPass ? null : { notSame: true }
  }

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

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
}
