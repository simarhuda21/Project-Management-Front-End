import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectdetailComponent } from './projectdetail.component';

const routes: Routes = [
    {
        path: '',
        component: ProjectdetailComponent,
        data:{
            path:''
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectdetailRoutingModule {}
