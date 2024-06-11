import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {UserInfoType} from "../../../../types/user-info.type";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isLogged: boolean = false;
  userName: string = '';

  userInfoSubscription: Subscription | null = null;

  constructor(private authService: AuthService,
              private _snackBar: MatSnackBar,
              private router: Router,
              private userService: UserService) {
    this.isLogged = this.authService.getIsLoggedIn();
    if (this.isLogged) {
      this.getUserInfo();
    }
  }

  ngOnInit(): void {

    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
      if (this.isLogged) {
        this.getUserInfo();
      }
    });

    this.userService.userName$.subscribe((userName: string) => {
      this.userName = userName;
    });

  }

  private getUserInfo(): void {
    if (this.userInfoSubscription) {
      this.userInfoSubscription.unsubscribe();
    }
    this.userInfoSubscription = this.userService.getUserInfo()
      .subscribe({
        next: (data: UserInfoType | DefaultResponseType) => {
          if ((data as DefaultResponseType).error !== undefined) {
            console.error((data as DefaultResponseType).message);
            return;
          }
          const userInfo = data as UserInfoType;
          if (userInfo.name) {
            this.userName = userInfo.name;
            this.userService.setUserName(this.userName);
          }
        },
        error: () => {
          this._snackBar.open('Ошибка при получении информации о пользователе');
        }
      });
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
