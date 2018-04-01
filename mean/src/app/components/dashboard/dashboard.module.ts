import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared.module';
import { RouterModule, Router } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersComponent } from './components/users/users.component';

@NgModule({
    declarations: [
        DashboardComponent,
        ProjectsComponent,
        ProfileComponent,
        UsersComponent
    ],
    imports: [
        FormsModule,
        SharedModule,
        CommonModule,
        RouterModule,
        ReactiveFormsModule
    ],
    exports: [
        FormsModule,
        SharedModule,
        DashboardComponent,
        ProjectsComponent,
        ProfileComponent,
        UsersComponent
    ],
})

export class DashboardModule {}
