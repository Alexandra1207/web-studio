import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../core/auth/auth.service";
import {LoginResponseType} from "../../../../types/login-response.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
    rememberMe: [false]
  })

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private _snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  login(): void {
    if (this.loginForm.valid && this.loginForm.value.email && this.loginForm.value.password) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password, !!this.loginForm.value.rememberMe)
        .subscribe({
          next: (data: LoginResponseType | DefaultResponseType) => {
            let error = null;
            if ((data as DefaultResponseType).error !== undefined) {
              error = (data as DefaultResponseType).message;
            }

            const loginResponse = data as LoginResponseType;
            if (!loginResponse.accessToken || !loginResponse.refreshToken || !loginResponse.userId) {
              error = 'Ошибка авторизации';
            }
            if (error) {
              this._snackBar.open(error);
              throw new Error(error);
            }
            this.authService.setTokens(loginResponse.accessToken, loginResponse.refreshToken);
            this.authService.userId = loginResponse.userId;
            this._snackBar.open('Вы успешно авторизовались');
            this.router.navigate(['/']);

          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message);
            } else {
              this._snackBar.open('Ошибка авторизации');
            }
          }
        })
    }
    // if (this.loginForm.valid && this.loginForm.value.email && this.loginForm.value.password) {
    //   this.authService.login(this.loginForm.value.email, this.loginForm.value.password, !!this.loginForm.value.rememberMe)
    //     .subscribe({
    //       next: (data: LoginResponseType | DefaultResponseType) => {
    //         let error = null;
    //         if ((data as DefaultResponseType).error !== undefined) {
    //           error = (data as DefaultResponseType).message;
    //         }
    //
    //         const loginResponse = data as LoginResponseType;
    //
    //         if (!loginResponse.accessToken || !loginResponse.refreshToken ||!loginResponse.userId) {
    //           error = 'Ошибка авторизации';
    //         }
    //
    //         if(error) {
    //           this._snackBar.open(error);
    //           throw new Error(error);
    //         }
    //
    //
    //
    //         this.authService.setTokens(loginResponse.accessToken, loginResponse.refreshToken);
    //         this.authService.userId = loginResponse.userId;
    //         this._snackBar.open('Вы успешно авторизовались');
    //         this.router.navigate(['/']);
    //
    //       },
    //       error: (errorResponse: HttpErrorResponse) => {
    //         if (errorResponse.error && errorResponse.error.message) {
    //           this._snackBar.open(errorResponse.error.message);
    //         } else {
    //           this._snackBar.open('Ошибка авторизации');
    //         }
    //       }
    //     })
    // }
  }


// import {Component} from '@angular/core';
// import {FormBuilder, FormGroup, Validators} from "@angular/forms";
//
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.scss'
// })
//
//
// export class LoginComponent {
//
//
//   loginForm: FormGroup;
//
//   constructor(private fb: FormBuilder) {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.email, Validators.required]],
//       password: ['', [Validators.required]],
//       rememberMe: [false],
//     });
//   }

  // loginForm = this.fb.group({
  //   email: ['', [Validators.email, Validators.required]],
  //   password: ['', [Validators.required]],
  //   rememberMe: [false],
  // })
  //
  //
  //
  // constructor(private fb: FormBuilder) {
  //   this.loginForm = new FormGroup({
  //     email: new FormControl(),
  //     password: new FormControl(),
  //     rememberMe: new FormControl(),
  //   })
  // }
}


// export class LoginComponent implements OnInit {
//   // loginForm = this.fb.group({
//   //       email: ['', [Validators.email, Validators.required]],
//   //       password: ['', [Validators.required]],
//   //       rememberMe: [false],
//   // })
//   //
//   //
//   // constructor(private fb: FormBuilder) { }
//
//
//
//   // loginForm: FormGroup;
//   //
//   // constructor(private fb: FormBuilder) {
//   //   this.loginForm = new FormGroup<any>({
//   //     email: ['', [Validators.email, Validators.required]],
//   //     password: ['', [Validators.required]],
//   //     rememberMe: [false],
//   //   });
//   // }
//   // // this.myGroup = new FormGroup({
//   // //   firstName: new FormControl()
//   // // });
//   //
//   // ngOnInit() {
//   //
//   // }
//   //
//   // login():void {
//   //
//   // }
//   // loginForm = this.fb.group({
//   //   email: ['', [Validators.email, Validators.required]],
//   //   password: ['', [Validators.required]],
//   //   rememberMe: [false, [Validators.required]],
//   //
//   // })
//   //
//   // constructor(private fb: FormBuilder) {
//   //
//   // }
// }
