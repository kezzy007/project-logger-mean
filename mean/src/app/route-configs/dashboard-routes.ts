import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { ProjectsComponent } from '../components/dashboard/components/projects/projects.component';
import { ProfileComponent } from '../components/dashboard/components/profile/profile.component';
import { UsersComponent } from '../components/dashboard/components/users/users.component';


export const DashboardRouteConfig = {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
        {
            path: 'projects',
            component: ProjectsComponent
        },
        {
            path: 'profile',
            component: ProfileComponent
        },
        {
            path: 'users',
            component: UsersComponent
        }

    ]};
