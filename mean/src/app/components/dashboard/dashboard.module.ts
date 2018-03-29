import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
        SharedModule,
        CommonModule,
        RouterModule,
        FormsModule
    ],
    exports: [
        SharedModule
    ]
})

export class DashboardModule {}
