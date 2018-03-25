import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ProjectsService {

  hostUrl = 'http://localhost:3200';

  constructor(private http: HttpClient) { }

  getProjectsAndLogs(): Observable<Array<{}>> {

      const user = JSON.parse(window.localStorage.getItem('user'));

      return this.http.post<Array<{}>>(this.hostUrl + '/users/projects', {'user': user})
                .map((response) => response);

  }

  saveProject(project): Observable<any> {

      return this.http.post<any>(this.hostUrl + '/users/save-project', { project: project })
                  .map((response) => response );
  }
}
