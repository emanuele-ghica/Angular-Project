import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../../model/user.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  hide = true;
  public registerForm!: FormGroup;

  private userModel !: UserModel;

  constructor(private _formBuilder: FormBuilder, private _http: HttpClient) { }

  ngOnInit() : void {
    this.registerForm = this._formBuilder.group({
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/)
      ]],

      email: ['', [
        Validators.required,
        Validators.email
      ]],

      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        Validators.pattern(/^[A-Za-z]+$/)
      ]]
    })
  }

  public submit() : void {
    // this._http.post<any>("https://localhost:3000/users", this.registerForm.value)
    //   .subscribe(res => {
    //       alert("Registration successful");
    //       this.registerForm.reset();
    //     },
    //     err => {
    //       alert("Something went wrong");
    //     })

    if (this.registerForm.valid) {
      this.userModel = {
        username: this.registerForm.value.username,
        id: 0,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      }


      this._http.post('http://localhost:3000/users', this.userModel)
        .subscribe(res => {
            alert("Registration successful");
            this.registerForm.reset();
          },
          error => {
            alert("Something went wrong");
          }
        );
    }
  }
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
