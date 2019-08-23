import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectRoutingModule } from './project-routing.module';
import { AppHttpService } from "../../service/app-http/app-http.service";
@NgModule({
  imports: [
    CommonModule,
    ProjectRoutingModule,
  ],
  declarations: [],
  providers: [AppHttpService]
})
export class ProjectModule {

}
