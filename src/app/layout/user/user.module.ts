import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppHttpService } from "../../service/app-http/app-http.service";
import { HttpClientModule } from '@angular/common/http';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import {UserService } from './user.service';
import { UiSwitchModule } from 'ngx-toggle-switch';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
    imports: [CommonModule, UserRoutingModule, FormsModule, HttpModule, UiSwitchModule, NgxPaginationModule],
    declarations: [UserComponent],
     providers: [UserService, AppHttpService]
})



export class UserModule {}
