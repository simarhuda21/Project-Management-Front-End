import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import {
    AuthGuardService as AuthGuard
} from './auth.guard.service';
import {
    RoleGuardService as RoleGuard
} from './role.guard.service';
import { ProjectdetailComponent } from './project/projectdetail/projectdetail.component';


const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'users', pathMatch: 'prefix' },
            {
                path: 'projects', loadChildren: './project/project.module#ProjectModule',
                canActivate: [RoleGuard],
                data: {
                    expectedRole: '4'
                }
            },
            {
                path: 'project', loadChildren: './project/project.module#ProjectModule',
                canActivate: [RoleGuard],
                data: {
                    expectedRole: '1'
                }
            },
            {
                path: 'tasks',
                loadChildren: './task/task.module#TaskModule',
                canActivate: [AuthGuard],
            },
            {
                path: 'users', loadChildren: './user/user.module#UserModule', canActivate: [RoleGuard],
                data: {
                    expectedRole: '4'
                }
            },
            { 
                path: 'reports', 
                loadChildren: './reports/reports.module#ReportsModule' 
            },
            { 
                path: 'layout', 
                loadChildren: '../login/login.module#LoginModule' 
            },
            {
                path: 'importTask', loadChildren: './task/import-task/import-task.module#ImportTaskModule',
                canActivate: [AuthGuard],
            },
            {
                path: 'details/:id',
                loadChildren: './task/taskdetail/taskdetail.module#TaskDetailModule',
                canActivate: [AuthGuard],
            },
            {
                path: 'profile', loadChildren: './profile/profile.module#ProfileModule',
                canActivate: [AuthGuard],
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
