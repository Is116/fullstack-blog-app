import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';

const routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
  ];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    MatCheckboxModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthModule { }