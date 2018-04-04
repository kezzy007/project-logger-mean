import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../classes/user';
import { LoginService } from './services/login-service.service';

import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular5-social-login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  userForm;
  user = { email:'', password:'' };

  constructor(private router: Router,
              private loginService: LoginService,
              private socialAuthService: AuthService) { 
     
  }

  ngOnInit() {

  }

  onSubmit(){
    
    console.log(this.user);

    this.loginService.login(this.user)
        .subscribe((response) => {

          console.log(response);

          this.storeTokenInLocalStorage(response.token);

          this.storeUserInLocalStorage(response.user);

          this.router.navigateByUrl('/dashboard');

        });

  }

  // socialSignIn(socialPlatform : string) {
  //   let socialPlatformProvider;
  //   if(socialPlatform == "facebook"){
  //     socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
  //   }else if(socialPlatform == "google"){
  //     socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
  //   }
    
  //   this.socialAuthService.signIn(socialPlatformProvider).then(
  //     (userData) => {
  //       console.log(socialPlatform+" sign in data : " , userData);
  //       console.log(userData);
  //       // Now sign-in with userData
        
            
  //     }
  //   );
  // }

  storeTokenInLocalStorage(token) {

    window.localStorage.setItem('token', token);

  }

  storeUserInLocalStorage(user) {

    window.localStorage.setItem('user', JSON.stringify(user));

  }

}
