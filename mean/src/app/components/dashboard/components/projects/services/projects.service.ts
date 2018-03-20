import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ProjectsService {

  constructor(private http: HttpClient) { }

  getProjectsAndLogs(): Observable<Array<{}>> {

      return this.http.post<Array<{}>>('/users/projects', null)
                .map((response) => response);

  }
}
