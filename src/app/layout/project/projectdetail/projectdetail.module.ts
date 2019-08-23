import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { ProjectdetailRoutingModule } from './projectdetail-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectdetailsService } from './projectdetails.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ActivatedRoute } from '@angular/router'
import { ProjectdetailComponent } from './projectdetail.component';
import { AppHttpService } from "../../../service/app-http/app-http.service";
  @NgModule({
    imports: [
      CommonModule, 
      NgMultiSelectDropDownModule, 
      FormsModule, 
      HttpModule,
      ReactiveFormsModule,
      ProjectdetailRoutingModule
    ],
    declarations: [ProjectdetailComponent],
    providers: [ProjectdetailsService, AppHttpService]  
})
export class ProjectdetailModule {}
