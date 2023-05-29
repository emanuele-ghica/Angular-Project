import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  hide = true;
  public registerForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() : void {
    this.registerForm = this._formBuilder.group({
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*.])[A-Za-z!@#$%^&*.]{8,20}$/)
      ]],

      email: ['', [
        Validators.required,
        Validators.email
      ]],

      username: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(15),
        Validators.pattern(/^[A-Za-z]+$/)
      ]]
    })
  }

  public submit() : void {
    if (this.registerForm.valid)
      console.warn(this.registerForm.valid)
  };
}





  // }
//   getEmailErrorMessage() {
//     if (this.accountEmail.hasError('required')) {
//       return 'It is required you enter a value';
//     }
//     return this.accountEmail.hasError('email') ? 'Not a valid email' : '';
//   };
//
//
//   getUsernameErrorMessage() {
//     if (this.accountUsername.hasError('required')) {
//       return 'It is required you enter a value';
//     } else if ((this.accountUsername.hasError('minLength')) || (this.accountUsername.hasError('maxLength'))) {
//       return 'The length of the username must be 10-15 characters';
//     } return this.accountUsername.hasError('!pattern') ? 'No symbols allowed' : '';
//   };
//
//
//   getPasswordErrorMessage() {
//     if (this.accountPassword.hasError('required')) {
//       return 'It is required you enter a value';
//     } else if ((this.accountPassword.hasError('minLength')) || (this.accountPassword.hasError('maxLength'))) {
//       return 'The length of the username must be 8-20 characters';
//     } return this.accountUsername.hasError('pattern') ? 'Password must contain a capital letter & a symbol' : '';
//   };
// };
