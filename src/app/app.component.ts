import { Component, OnInit } from '@angular/core';
import { ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    toasterService: ToasterService;
    public toasterconfig: ToasterConfig =
        new ToasterConfig({
            showCloseButton: true,
            tapToDismiss: true,
            timeout: 2000,
            newestOnTop: true,
            mouseoverTimerStop: true,
            positionClass: "toast-top-right"
        });

    constructor(toasterService: ToasterService) {
        this.toasterService = toasterService;
    }

    ngOnInit() {
    }
}
