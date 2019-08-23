import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskComponent } from './task.component';
// import { TaskdetailComponent } from './taskdetail/taskdetail.component';

const routes: Routes = [
    {
        path: '',
        // component: TaskComponent,

        children: [
            {
                path: '',
                redirectTo: 'tasks',
                pathMatch: 'full'
            },
            {
                path: 'tasks',
                component:TaskComponent
            }, 
            {
                path: 'importTask',
                loadChildren: './import-task/import-task.module#ImportTaskModule',
            }
            ,
            {
                path: 'details/:id',
                loadChildren: './taskdetail/taskdetail.module#TaskDetailModule'
            },
            {
                path: 'addComment',
                loadChildren: './taskdetail/taskdetail.module#TaskDetailModule'
            }
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TaskRoutingModule { }
