import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { HttpModule } from '@angular/http';

const routes: Routes = [{
    path: '',
    data: {
        title: ''
    },
    children: [
        {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
        }, {
            path: 'list',
            loadChildren: './project-list/project-list.module#ProjectListModule'
        }, {
            path: 'details/:id',
            loadChildren: './projectdetail/projectdetail.module#ProjectdetailModule'
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectRoutingModule { }
