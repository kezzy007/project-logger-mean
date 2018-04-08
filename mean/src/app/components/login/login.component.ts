import { Component, OnInit } from '@angular/core';
import {  ToasterService, ToasterConfig } from 'angular5-toaster';
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
  
  user = { email: '', password: '' };

  loggedIn = true;
  
  TOAST_OPTIONS = {
    SUCCESS: {
        text: 'CLOSE',
        duration: 5000,
        type: 'success',
    },
    FAILURE: {
        text: 'CLOSE',
        duration: 5000,
        type: 'error',
    }
  };

  userData = '';
  
  public toasterconfig: ToasterConfig =  new ToasterConfig({
      showCloseButton: true,
      tapToDismiss: true,
      timeout: 3000
  });

  constructor(
              private router: Router,
              private loginService: LoginService,
              private socialAuthService: AuthService,
              private toasterService: ToasterService
            ) {

  }

  ngOnInit() {

    this.checkIfLoggedIn();

  }

  checkIfLoggedIn() {

    if (!localStorage.getItem('user')) {
      this.loggedIn = false;
      return;
    }

    this.displayLogoutButton();

    this.redirectToDashboard();

  }

  displayLogoutButton() {
    this.loginService.userLoggedIn.emit(true);
  }

  redirectToDashboard() {

    this.router.navigateByUrl('/dashboard');

  }

  onSubmit(){

    // console.log(this.user);

    this.loginService.login(this.user)
        .subscribe((response) => {

          // console.log(response);

          if (!response.success) {

            return;
          }

          this.storeTokenInLocalStorage(response.token);

          this.storeUserInLocalStorage(response.user);

          this.router.navigateByUrl('/dashboard');

        });

  }

  socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;

    if(socialPlatform == "facebook"){

      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;

    }else if(socialPlatform == "google"){

      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;

    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
//         email: "kazeemkadiri@gmail.com"
// ​
//         id: "113723061309132414450"
//         ​
//         idToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjNiNTQ3ODg2ZmY4NWEzNDI4ZGY0ZjYxZGI3M2MxYzIzOTgyYTkyOGUifQ.eyJhenAiOiIxMDA3MTY4NjY2NDAxLTgzZGs2Nm40Ym5qaWticWcwMWFtcGFkZzY2MmtnYzNhLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTAwNzE2ODY2NjQwMS04M2RrNjZuNGJuamlrYnFnMDFhbXBhZGc2NjJrZ2MzYS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExMzcyMzA2MTMwOTEzMjQxNDQ1MCIsImVtYWlsIjoia2F6ZWVta2FkaXJpQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiWGRDQ1dOa0ZNbDEtOUJEUlozdDZ3USIsImV4cCI6MTUyMzEyMjkxNSwiaXNzIjoiYWNjb3VudHMuZ29vZ2xlLmNvbSIsImp0aSI6Ijk3NGU4Y2Y4YzA3N2Y5MDhjMDU1YmQ4MGM3M2RiNDVlZDY4NGQ1YzUiLCJpYXQiOjE1MjMxMTkzMTUsIm5hbWUiOiJLYWRpcmkgS2F6ZWVtIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS8tYTM0c0dxNDFqV2svQUFBQUFBQUFBQUkvQUFBQUFBQUFBSUkvZTJ3b2dZY3NaVzAvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6IkthZGlyaSIsImZhbWlseV9uYW1lIjoiS2F6ZWVtIiwibG9jYWxlIjoiZW4ifQ.UzVJ3xGAFXdsXns1o93TC9VK7A513dj4oASm8jxBdmCgd9WbrbhGDuX2_RuWpKlOIyNdEF3BgWE3toXEGGaoVYIwuRuXWzx1Mcb-yAng7aKdpafhgrj5T6umxfMaiiu8I46cLlA0-wv9DTfFaZvC5TacBubRo1eEok6Wye9MxYZTdjBWkzNqMZmMtXuK_cSzArFvRi1tqH1Od2f0gwv-RFtu2KKsw1zPkSvbv6DrE1lBDmjgv6rHl6NtLEMaQhG1lzAVIboFkLjFsLKiLZHpJJf8tzpD5zE4LM_nQgLhtuBU9zfuNvWphsLUWnD4ablwcwaxwnRnV82J3w2ax0AZvQ"
//         ​
//         image: "https://lh3.googleusercontent.com/-a34sGq41jWk/AAAAAAAAAAI/AAAAAAAAAII/e2wogYcsZW0/s96-c/photo.jpg"
//         ​
//         name: "Kadiri Kazeem"
//         ​
//         provider: "google"

        userData.id = undefined;

        this.validateUserExists(userData);
        
        console.log(socialPlatform+" sign in data : " , userData);
        console.log(userData);
        // Now sign-in with userData
        
            
      }
    );
  }

  validateUserExists(userData) {
   
    this.loginService.validateUserToken(userData)
    .subscribe((response) => {

       console.log(response);

      if (!response.success) {

        return;
      }

      this.storeTokenInLocalStorage(response.token);

      this.storeUserInLocalStorage(response.user);

      this.router.navigateByUrl('/dashboard');

    });

  }

  storeTokenInLocalStorage(token) {

    window.localStorage.setItem('token', token);

  }

  storeUserInLocalStorage(user) {

    window.localStorage.setItem('user', JSON.stringify(user));

  }

  displayToast(message, options) {

    this.toasterService.pop(
                                options.type,
                                'New notification',
                                !message && (options.type === 'failure') ?
                                'Operation failed' : message || 'Operation successful'
                            );

  }

}
