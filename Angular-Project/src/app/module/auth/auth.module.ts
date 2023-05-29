import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./component/login/login.component";
import {RegisterComponent} from "./component/register/register.component";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'auth', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: '', component: LoginComponent},
    ])
  ]
})
export class AuthModule { }
