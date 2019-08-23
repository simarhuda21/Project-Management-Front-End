import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectListComponent } from './project-list.component';
import { HttpModule } from '@angular/http';

const routes: Routes = [{
  path: '',
  component: ProjectListComponent,
  data: {
    title: 'Project-list'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes),HttpModule],
  exports: [RouterModule]
})
export class ProjectListRoutingModule { }
