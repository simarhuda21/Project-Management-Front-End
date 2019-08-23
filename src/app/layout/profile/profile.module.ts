import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ProfileService } from './profile.service'
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { AppHttpService } from '../../service/app-http/app-http.service';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    HttpModule,
    ReactiveFormsModule
  ],
  declarations: [ProfileComponent],
  providers: [ProfileService, AppHttpService]
})
export class ProfileModule { }
