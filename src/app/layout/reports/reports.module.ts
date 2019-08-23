import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppHttpService } from "../../service/app-http/app-http.service";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgbModule } from  '@ng-bootstrap/ng-bootstrap';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import {ReportsService} from './reports.service';
import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
    imports: [CommonModule,
                ReportsRoutingModule,
                FormsModule,
                ReactiveFormsModule,
                OwlDateTimeModule,
                OwlNativeDateTimeModule,
                HttpModule,
                NgxPaginationModule
                ],
    declarations: [ReportsComponent],
    providers: [ReportsService, AppHttpService]
})
export class ReportsModule {}
