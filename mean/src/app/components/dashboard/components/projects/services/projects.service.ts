import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface Iresponse {
  success: string;
  log?: Object;
  projects?: Array<{}>;
  logs?: Array<{}>;
}

@Injectable()
export class ProjectsService {

  hostUrl = 'http://localhost:3200';

  constructor(private http: HttpClient) { }

  getProjectsAndLogs(): Observable<Iresponse> {

      const user = JSON.parse(window.localStorage.getItem('user'));

      return this.http.post<Iresponse>(this.hostUrl + '/users/projects', {'user': user})
                .map((response) => response);

  }

  saveProject(project): Observable<any> {

      return this.http.post<any>(this.hostUrl + '/users/save-project', { project: project })
                  .map((response) => response );
  }

  saveLogForProject(log): Observable<any>{

    return this.http.post<any>(this.hostUrl + '/users/save-log', { 'log': log})
                .map((response) => response );
  }

  saveLogStatus(log): Observable<any>{

    return this.http.post<any> (this.hostUrl + '/users/save-admin-log-review', {'log': log})
                .map((response) => response);

  }

  deleteLog(log): Observable<any> {

    return this.http.post(this.hostUrl + '/users/delete-log', log)
              .map((response) =>  response);

  }

}
