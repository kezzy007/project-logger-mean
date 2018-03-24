import { NgModule, CommonModule } from '@angular/core';
import { SharedModule } from '../../shared.module';

import { DashboardComponent } from './dashboard.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersComponent } from './components/users/users.component';

@NgModule({
    declarations:[
        DashboardComponent,
        ProjectsComponent,
        ProfileComponent,
        UsersComponent
    ],
    imports:[
        SharedModule
    ]
})

export class DashboardModule{}