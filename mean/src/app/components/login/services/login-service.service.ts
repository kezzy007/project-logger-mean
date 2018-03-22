import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { User } from '../classes/user';


@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  login(user): Observable<User> {

    return this.http.post<User>('http://localhost:3200/users/authenticate', user)
                .map((response) => response);

  }
}
