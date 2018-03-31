import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfileService {

  host = 'http://localhost:3200';

  constructor(private http: HttpClient) { }

  updateUsersProfile(user): Observable<any> {

    return this.http.post<any>(this.host + '/users/update-profile', {'user': user})
                .map((response) => response);

  }

}
