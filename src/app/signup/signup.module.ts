import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from '../layout/user/user.service';
import { AppHttpService } from '../service/app-http/app-http.service';

@NgModule({
  imports: [
    CommonModule,
    SignupRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [SignupComponent],
  providers:[UserService, AppHttpService]
})
export class SignupModule { }
