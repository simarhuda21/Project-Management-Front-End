import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppHttpService } from "../service/app-http/app-http.service";

import { ForgetPasswordRoutingModule } from './forgetpassword-routing.module';
import { ForgetpasswordComponent } from './forgetpassword.component';
import { ForgetPasswordService } from './forgetpassword.service';

@NgModule({
    imports: [CommonModule, HttpModule, ForgetPasswordRoutingModule, FormsModule, ReactiveFormsModule],
    declarations: [ForgetpasswordComponent],
    providers:[ForgetPasswordService, AppHttpService]
})
export class ForgetPasswordModule {}
