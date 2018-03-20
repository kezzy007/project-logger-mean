import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterModule, Routes } from '@angular/router';


import { AuthInterceptor } from './interceptors/auth-interceptor';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProjectsComponent } from './components/dashboard/components/projects/projects.component';
import { ProfileComponent } from './components/dashboard/components/profile/profile.component';
import { UsersComponent } from './components/dashboard/components/users/users.component';

import { LoginService } from './components/login/services/login-service.service';
import { ProfileService } from './components/dashboard/components/profile/services/profile.service';
import { UsersService } from './components/dashboard/components/users/services/users.service';
import { ProjectsService } from './components/dashboard/components/projects/services/projects.service';
import { DashboardRouteConfig } from './route-configs/dashboard-routes';
import { ModalComponent } from './components/modal/modal.component';

const routes: Routes = [
  DashboardRouteConfig,
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}  ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    DashboardComponent,
    ProfileComponent,
    ProjectsComponent,
    UsersComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [
    LoginService,
    ProjectsService,
    ProfileService,
    UsersService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true }
    ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
