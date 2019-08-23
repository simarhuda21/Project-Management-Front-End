import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import decode from 'jwt-decode';
import { ProfileService } from '../../profile/profile.service';
import { TitleCasePipe } from '@angular/common';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    userdata = {
        firstname: "",
        lastname: "",
        // username: "",
        email: "",
        role: 0
    };
    pushRightClass: string = 'push-right';
    name;
    // name = localStorage.getItem('name');

    role = ""
    constructor(private titlecasePipe: TitleCasePipe, private translate: TranslateService, public router: Router, private _profileService: ProfileService) {
        const token = localStorage.getItem('jwtToken');
        const tokenPayload = decode(token);
        this.role = tokenPayload.role;
        // this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        // this.translate.setDefaultLang('en');
        // const browserLang = this.translate.getBrowserLang();
        // this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this._profileService.getLoginUserDetails().subscribe(data => {
            this.userdata = data.data;
            this.name = this.titlecasePipe.transform(this.userdata.firstname + " " + this.userdata.lastname)
        })
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
