import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskdetailComponent } from './taskdetail.component';

const routes: Routes = [
    {
        path: '',
        component: TaskdetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TaskDetailRoutingModule {}
