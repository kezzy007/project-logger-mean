import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  host = "http://localhost:3200";

  constructor(private http: HttpClient) { }

  fetchAllUsersRecord(): Observable<any> {

    return this.http.post<any> (this.host + '/users/get-all-users', null).map(response => response);

  }

  deleteUser(user): Observable<any> {

    return this.http.post<any>(this.host + '/users/delete-users', user).map(response => response);

  }

  updateUserRecord(user) : Observable<any> {

    return this.http.post(this.host + '/users/update-user-record',  user ).map(response => response);

  }

  registerUser(user): Observable<any> {

    return this.http.post(this.host + '/users/register', user).map(response => response);

  }

}
