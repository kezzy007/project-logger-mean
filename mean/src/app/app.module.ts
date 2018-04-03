import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './shared.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { MomentModule } from 'angular2-moment';
import {  SocialLoginModule,  AuthServiceConfig,  GoogleLoginProvider,  FacebookLoginProvider } from "angular5-social-login";


import { AuthInterceptor } from './interceptors/auth-interceptor';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { LoginService } from './components/login/services/login-service.service';
import { ProfileService } from './components/dashboard/components/profile/services/profile.service';
import { UsersService } from './components/dashboard/components/users/services/users.service';
import { ProjectsService } from './components/dashboard/components/projects/services/projects.service';
import { FileUploadService } from './services/file-upload.service';
import { UserAvatarService } from './services/user-avatar.service';

import { DashboardRouteConfig } from './route-configs/dashboard-routes';

const routes: Routes = [
  DashboardRouteConfig,
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}  ];

// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("1810655365645838")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("Your-Google-Client-Id")
        },
      ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    SharedModule,
    DashboardModule,
    MomentModule,
    SocialLoginModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    LoginService,
    ProjectsService,
    ProfileService,
    UsersService,
    FileUploadService,
    UserAvatarService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true }
    ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
