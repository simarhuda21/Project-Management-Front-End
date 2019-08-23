import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//import { FileSelectDirective } from 'ng2-file-upload';
import { FileUploadModule } from 'ng2-file-upload';
import { AppHttpService } from "../../../service/app-http/app-http.service";
import { HttpClientModule } from '@angular/common/http';
import { TaskDetailRoutingModule } from '../taskdetail/taskdetail-routing.module';
import { TaskdetailComponent } from './taskdetail.component';
import { ProfileModule } from '../../profile/profile.module';
import { NgxPaginationModule } from 'ngx-pagination';
// import { ImportTaskService } from './tas';

@NgModule({
    imports: [CommonModule,
        TaskDetailRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        HttpClientModule,
        FileUploadModule,
        ProfileModule,
        NgxPaginationModule,

    ],
    declarations: [TaskdetailComponent],
    providers: [AppHttpService]
})
export class TaskDetailModule { }