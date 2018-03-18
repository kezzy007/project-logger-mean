import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../classes/user';
import { LoginService } from './services/login-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  userForm;
  user = { email:'', password:'' };

  constructor(private router: Router,
              private loginService: LoginService) { 
     
  }

  ngOnInit() {

  }

  onSubmit(){
    
    console.log(this.user);

    this.loginService.login(this.user)
        .subscribe((response) => {

          console.log(response);

          this.storeTokenInLocalStorage(response.token);

          this.router.navigateByUrl('/dashboard');

        });

  }

  storeTokenInLocalStorage(token){

    window.localStorage.setItem('token', token);

  }

}
