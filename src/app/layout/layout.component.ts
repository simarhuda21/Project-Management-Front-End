import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    role = ""
    constructor() {
        const token = localStorage.getItem('jwtToken');
        const tokenPayload = decode(token);
         this.role = tokenPayload.role;
    }

    ngOnInit() {}
}
