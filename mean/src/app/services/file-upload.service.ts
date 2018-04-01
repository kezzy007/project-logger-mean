import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';


import { Observable} from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()

export class FileUploadService {


  apiBaseURL = 'http://127.0.0.1:3200/';


    constructor(private http: HttpClient) { }

    fileUpload(fileItem: File, relativeUrlPath?: String, extraData?: object): any {

      const apiCreateEndpoint = `${this.apiBaseURL + relativeUrlPath}`;

      const formData: FormData = new FormData();

      formData.append('fileItem', fileItem, fileItem.name);

      console.log(fileItem);

      if (extraData) {

        const keyArray = Object.keys(extraData);

        keyArray.forEach((key) => {

            // iterate and set other form data
          formData.append(key, extraData[key]);

        });

      }

      const req = new HttpRequest('POST', apiCreateEndpoint, formData, {
        reportProgress: true // for progress data
      });

      return this.http.request(req).map(response => response);
    }

  optionalFileUpload(fileItem?: File, extraData?: object): any {
      const apiCreateEndpoint = `${this.apiBaseURL}`;

      const formData: FormData = new FormData(); //?

       let fileName;
      if (extraData) {

        const keyArray = Object.keys(extraData);

        keyArray.forEach((key) => {

          if (key === 'fileName') {
            fileName = extraData[key];
          }

          // iterate and set other form data
          formData.append(key, extraData[key]);

        });

      }

      if (fileItem) {
        if (!fileName) {
           fileName = fileItem.name;
        }
        formData.append('image', fileItem, fileName);
      }
      const req = new HttpRequest('POST', apiCreateEndpoint, formData, {
        reportProgress: true // for progress data
      });

      return this.http.request(req);

    }

    list(): Observable<any> {
      const listEndpoint = `${this.apiBaseURL}files/`;
      return this.http.get(listEndpoint);
    }

}
