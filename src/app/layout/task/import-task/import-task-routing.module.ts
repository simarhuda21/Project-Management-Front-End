import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImportTaskComponent } from './import-task.component';

const routes: Routes = [
    {
        path: '',
        component: ImportTaskComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ImportTaskRoutingModule {}
