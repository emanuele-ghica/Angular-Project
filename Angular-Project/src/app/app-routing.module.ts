import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {AddComponent} from "./component/home/add/add.component";
import {LoginComponent} from "./module/auth/component/login/login.component";





const routes: Routes = [
  {path: '', loadChildren: () => import('./module/auth/auth.module').then(m => m.AuthModule)},

  // {path: 'home', loadChildren: () => import ('./component/component.module').then(m => m.ComponentModule)}

  {path: 'home', component: HomeComponent },
  {path: 'home/add', component: AddComponent},
  {path: 'login', component: LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
