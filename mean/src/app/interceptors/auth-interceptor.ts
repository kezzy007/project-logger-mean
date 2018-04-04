import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()

export class AuthInterceptor implements HttpInterceptor{

    intercept(req:HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>> {

        const token = window.localStorage.getItem('token');

        const auth = req.clone({setHeaders: {'Authorization': token || '' }});

        return next.handle(auth);
    }

}