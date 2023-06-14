import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-auth',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public hide = true;
  public loginForm!: FormGroup;


  constructor(private _formBuilder: FormBuilder, private _router: Router, private _http: HttpClient) {
  }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      username: ['', [
        Validators.required,

      ]],
      password: ['', [
        Validators.required,

      ]]
    })
  }

  public submit(): void {
    this._http.get<any>("http://localhost:3000/users")
      .subscribe(res => {
        const user = res.find((a: any) => {
          return a.username === this.loginForm.value.username && a.password === this.loginForm.value.password
        });
        if (user) {
          alert("Login Success");
          this.loginForm.reset();
          this._router.navigate(['home'])
        } else {
          alert("User not found")
        }
      }, err => {
        alert("Something went wrong")
      })
  }

}




  //   accountPassword = new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(8),
  //     Validators.maxLength(20),
  //     // Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*.])[A-Za-z!@#$%^&*.]{8,20}$/)
  //   ]);
  //   accountEmail = new FormControl('', [
  //     Validators.required,
  //     Validators.email
  //   ]);
  //   accountUsername = new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(10),
  //     Validators.maxLength(15),
  //     Validators.pattern(/^(?!^[A-Za-z]+$).*/)
  //   ]);
  // auth: any;
  //
  // getUsernameErrorMessage() {
  //   if (this.accountUsername.hasError('required')) {
  //     return 'It is required you enter a value';
  //   } return ((this.accountUsername.hasError('minLength')) || (this.accountUsername.hasError('maxLength'))) ?
  //      'The length of the username must be 10-15 characters': '';
  //     // } else if (!this.accountUsername.hasError('pattern')) {
  //     //   return 'No symbols are allowed';
  //     // } else return '';
  //
  //   };
  //
  //
  // getPasswordErrorMessage() {
  //   if (this.accountPassword.hasError('required')) {
  //     return 'It is required you enter a value';
  //   } else if ((this.accountPassword.hasError('minLength')) || (this.accountPassword.hasError('maxLength'))) {
  //     return 'The length of the username must be 8-20 characters';
  //   } return this.accountUsername.hasError('pattern') ? 'Password must contain a capital letter & a symbol' : '';
  // };

