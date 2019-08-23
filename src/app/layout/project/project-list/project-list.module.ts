import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectListService } from './project-list.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HttpModule } from '@angular/http';
import { ProjectListComponent } from './project-list.component';
import { ProjectListRoutingModule } from './project-list-routing.module';
import { AppHttpService } from "../../../service/app-http/app-http.service";
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule, 
    NgMultiSelectDropDownModule, 
    FormsModule, 
    HttpModule,
    ReactiveFormsModule,
    ProjectListRoutingModule,
    NgxPaginationModule
  ],
  declarations: [ProjectListComponent],
  providers: [ProjectListService, AppHttpService]  
})
export class ProjectListModule { }
