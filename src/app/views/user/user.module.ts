// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
//
// import { UserRoutingModule } from './user-routing.module';
// import { LoginComponent } from './login/login.component';
// import { SignupComponent } from './signup/signup.component';
// import {FormsModule, ReactiveFormsModule} from "@angular/forms";
//
//
// @NgModule({
//   declarations: [
//     LoginComponent,
//     SignupComponent
//   ],
//   imports: [
//     CommonModule,
//     FormsModule,
//     ReactiveFormsModule,
//     UserRoutingModule
//   ]
// })
// export class UserModule { }
// import {NgModule} from '@angular/core';
// import {CommonModule} from '@angular/common';
//
// import {UserRoutingModule} from './user-routing.module';
// import {LoginComponent} from './login/login.component';
// import {SignupComponent} from './signup/signup.component';
// import {ReactiveFormsModule} from "@angular/forms";
//
//
// @NgModule({
//   declarations: [
//     LoginComponent,
//     SignupComponent
//   ],
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     UserRoutingModule,
//   ]
// })
// export class UserModule {
// }


// import {NgModule} from '@angular/core';
// import {CommonModule} from '@angular/common';
//
// import {UserRoutingModule} from './user-routing.module';
// import {LoginComponent} from './login/login.component';
// import {SignupComponent} from './signup/signup.component';
// import {ReactiveFormsModule} from "@angular/forms"; // <--- Импорт ReactiveFormsModule сюда
//
// @NgModule({
//   declarations: [
//     LoginComponent,
//     SignupComponent
//   ],
//   imports: [
//     CommonModule,
//     ReactiveFormsModule, // <--- Добавление ReactiveFormsModule сюда
//     UserRoutingModule,
//   ]
// })
// export class UserModule {
// }


import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {ReactiveFormsModule} from "@angular/forms";
// import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // SharedModule,
    UserRoutingModule,
  ]
})
export class UserModule {
}
