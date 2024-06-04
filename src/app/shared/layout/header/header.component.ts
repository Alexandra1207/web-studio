import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {UserInfoType} from "../../../../types/user-info.type";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isLogged: boolean = false;
  userInfo: UserInfoType = {  id: '', name: '', email: ''};

  constructor(private authService: AuthService,
              private _snackBar: MatSnackBar,
              private router: Router,
              private userService: UserService) {
    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit(): void {

    // window.location.reload();

    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;

    });


    this.userService.getUserInfo().subscribe((data: UserInfoType | DefaultResponseType) => {
      if ((data as DefaultResponseType).error !== undefined) {
        throw new Error((data as DefaultResponseType).message);
      }

      console.log(data);
      this.userInfo = data as UserInfoType;
      console.log(this.userInfo.name);
    })

  }

  logout(): void {
    this.authService.logout()
      .subscribe({
        next: () => {
          this.doLogout();
        },
        error: () => {
          this.doLogout();
        }
      })
  }

  doLogout(): void {
    this.authService.removeTokens();
    this.authService.userId = null;
    this._snackBar.open('Вы вышли из системы');
    this.router.navigate(['/']);
  }

}
