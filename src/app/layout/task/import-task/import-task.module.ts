import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//import { FileSelectDirective } from 'ng2-file-upload';
import { FileUploadModule } from 'ng2-file-upload';
import { AppHttpService } from "../../../service/app-http/app-http.service";
import { HttpClientModule } from '@angular/common/http';
import { ImportTaskRoutingModule } from '../import-task/import-task-routing.module';
import { ImportTaskComponent } from './import-task.component';
import { ImportTaskService } from './import-task.service';

@NgModule({
    imports: [CommonModule,
        ImportTaskRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        HttpClientModule,
        FileUploadModule
    ],
    declarations: [ImportTaskComponent],
    providers: [ImportTaskService, AppHttpService]
})
export class ImportTaskModule { }