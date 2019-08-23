import { Component, OnInit, Input } from '@angular/core';
import { ReportsService } from './reports.service';
import * as _moment from 'moment';
import { DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { MomentDateTimeAdapter, OWL_MOMENT_DATE_TIME_FORMATS } from 'ng-pick-datetime-moment';
import decode from 'jwt-decode';
import { NgProgress } from 'ngx-progressbar';
declare var jquery: any;
declare var $: any;
const moment = (_moment as any).default ? (_moment as any).default : _moment;

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss'],
    providers: [
        { provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE] },
        { provide: OWL_DATE_TIME_FORMATS, useValue: OWL_MOMENT_DATE_TIME_FORMATS },
    ],
})

export class ReportsComponent implements OnInit {
    @Input('data') meals: string[] = [];
    page: number = 1;
    // #region "Variables"
    status = ["In Progress", "Completed", "Pending"];
    reports = [];
    projectList = [
    ];
    taskss = [];
    startDate = "";
    endDate = "";
    ngproject = "";
    ngstatus = "";
    ngdeveloper = "";
    userlist = [];
    searchText;
    developerlist = [];
    dtOptions: any = {};
    checkRole;
    alldeveloperlist = [];



    // #endregion

    // constructor()
    constructor(
        private _reportsServive: ReportsService,
        public ngProgress: NgProgress
    ) { }

    // ngOnInit()
    ngOnInit() {

        // Get token payload
        const token = localStorage.getItem('jwtToken');
        const tokenPayload = decode(token);
        this.checkRole = tokenPayload.role;

        // get users
        this.ngProgress.start();
        this._reportsServive.GetUser().subscribe(
            data => {
                this.userlist = data.data;
                for (var i = 0; i < data.data.length; i++) {
                    if (data.data[i].role == 2) {
                        this.developerlist.push(data.data[i]);
                        this.alldeveloperlist.push(data.data[i]);
                    }
                }
                this.ngProgress.done();
            });

        // get reports
        this._reportsServive.getReports().subscribe(
            data => {
                this.taskss = data.data;
                //console.log(this.taskss);
                this.reports = this.taskss;
                this.dtOptions = {
                    searching: false,
                    dom: 'Bfrtip',
                    buttons: [
                        'colvis'
                    ]
                };
                this.ngProgress.done();
            });

        // get projects
        this._reportsServive.GetProject().subscribe(
            data => {
                this.projectList = data.data;
            });

        this.dtOptions = {
            searching: false,
            dom: 'Bfrtip',
            buttons: [
                'colvis'
            ]
        };
    }

    // #region "Function"

    hideShow() {
        $("input:checkbox:not(:checked)").each(function () {
            var column = "table ." + $(this).attr("name");
            $(column).hide();
        });

        $("input:checkbox").click(function () {
            var column = "table ." + $(this).attr("name");
            $(column).show();
        });
    }

    // onSearch() - search from data.
    onSearch() {
        this._reportsServive.getData(this.searchText).subscribe(
            data => {
                this.reports = data;
            });
    }

    // getDeveloperOfProject() - get projects
    async getDeveloperOfProject(project) {
        if (project) {
            this.developerlist = [];
            project.team.forEach(dev => {
                this.developerlist.push(dev);
            });
        }
        else {
            this.developerlist = this.alldeveloperlist;
        }
    }

    // onFormChange() - 
    onFormChange() {
        this._reportsServive.getTaskFromData(this.ngproject, this.startDate, this.endDate, this.ngstatus).subscribe(
            data => {
                this.reports = data.data;
            });
        this.dtOptions = {

            searching: false,
            // Declare the use of the extension in the dom parameter
            dom: 'Bfrtip',
            // Configure the buttons
            buttons: [
                'colvis'
                // {extend:'colvis',className:'colvisButton'}
            ]
        };
    }

    // reset(){
    //     console.log("insidereset");
    //     this.hideShow();
    // }

    // onDeveloperSelect() - developer select show task
    onDeveloperSelect() {
        this._reportsServive.getTaskFromDeveloper(this.ngdeveloper).subscribe(
            data => {
                this.reports = data.data;
            });
        this.dtOptions = {
            searching: false,
            // Declare the use of the extension in the dom parameter
            dom: 'Bfrtip',
            // Configure the buttons
            buttons: [
                'colvis'
                // {extend:'colvis',className:'colvisButton'}
            ]
        };
    }

    reset() {
        
        $('input:checkbox:not(:checked)').trigger('click');
        this.ngproject = "";
        this.ngstatus = "";
        this.ngdeveloper = "";
        this.startDate = "";
        this.endDate = "";
    }

    // #endregion
}
