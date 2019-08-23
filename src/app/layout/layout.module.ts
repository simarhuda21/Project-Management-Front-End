import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import {RoleGuardService} from './role.guard.service';
import { AuthGuardService } from './auth.guard.service';
import { AuthService } from './auth.service';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { ProfileModule } from './profile/profile.module';
import {ToasterModule, ToasterService} from 'angular5-toaster';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbModule.forRoot(),
        NgbDropdownModule.forRoot(),
        HttpClientModule,
        JwtModule,
        ProfileModule, 
        ToasterModule
    ], providers: [RoleGuardService , AuthGuardService, AuthService, ToasterService],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent]
})
export class LayoutModule {}
