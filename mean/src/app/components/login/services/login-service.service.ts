import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { User } from '../classes/user';


@Injectable()
export class LoginService {

  host = 'http://localhost:3200';
  @Output() userLoggedIn = new EventEmitter<any>();

  constructor(private http: HttpClient) { }

  login(user): Observable<User> {

    return this.http.post<User>(this.host + '/users/authenticate', user)
                .map((response) => {

                  if (response.success) {
                    // console.log('loggedIn');
                    this.userLoggedIn.emit(true); // For navbar to display logout button

                  }

                  return response;
                });

  }

  logout(): Observable<User> {

    const user = JSON.parse(localStorage.getItem('user')) || '';

    return this.http.post<User>(this.host + '/users/logout', {user: user})
                .map((response) => {

                  if (response.success) {

                    this.userLoggedIn.emit(false); // For navbar to display logout button

                  }

                  return response;

                });

  }

}
