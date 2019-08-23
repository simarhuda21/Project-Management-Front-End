import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppHttpService } from "../../service/app-http/app-http.service";
import { HttpClientModule } from '@angular/common/http';
import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import {TaskService} from './task.service';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {NgxPaginationModule} from 'ngx-pagination';
import { ProfileService } from '../profile/profile.service';

@NgModule({
    imports: [CommonModule,
                TaskRoutingModule,
                FormsModule,
                ReactiveFormsModule,
                OwlDateTimeModule,
                OwlNativeDateTimeModule,
                HttpModule,
                HttpClientModule,
                NgxPaginationModule,
                ],
    declarations: [TaskComponent],
    providers: [TaskService,ProfileService, AppHttpService]
})
export class TaskModule {}