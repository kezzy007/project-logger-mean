import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/services/login-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn = false;

  constructor(
              private loginService: LoginService,
              private router: Router
            ) { }

  ngOnInit() {

    if ( this.getUser() ) {
      this.loggedIn = true;
      return;
    }

    const subscribedService = this.loginService.userLoggedIn.subscribe((loggedIn) => {

      this.loggedIn = loggedIn;

    });

  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  logout() {

    const logoutService = this.loginService.logout()
        .subscribe((response) => {

          if (!response.success) {
            console.log('Failed to logout');
            return;
          }

          this.loggedIn = false;

          this.removeUserFromLocalStorage();

          this.removeTokenFromLocalStorage();

          this.router.navigateByUrl('/');

          logoutService.unsubscribe();

        });
  }

  removeUserFromLocalStorage() {
    localStorage.removeItem('user');
  }

  removeTokenFromLocalStorage() {
    localStorage.removeItem('token');
  }
}
