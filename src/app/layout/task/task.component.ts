import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from './task.service';
import * as _moment from 'moment';
import { DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { MomentDateTimeAdapter, OWL_MOMENT_DATE_TIME_FORMATS } from 'ng-pick-datetime-moment';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import swal from 'sweetalert2';
import decode from 'jwt-decode';
import { NgProgress } from 'ngx-progressbar';
import { ProfileService } from '../profile/profile.service';
const moment = (_moment as any).default ? (_moment as any).default : _moment;
import { HelperService } from '../../service/helper.service';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss'],
    providers: [
        { provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE] },
        { provide: OWL_DATE_TIME_FORMATS, useValue: OWL_MOMENT_DATE_TIME_FORMATS },
    ],
})

export class TaskComponent implements OnInit {

    @Input('data') meals: string[] = [];
    @ViewChild('task') taskDetails: NgForm;
    page: number = 1;
    getDeveloper: any[];
    userdata = {
        firstname: "",
        lastname: "",
        // username: "",
        email: "",
        role: 0,
        
    };
    projectName;
    taskSrNo;
    
    // constructor()
    constructor(private _taskServive: TaskService, 
        public route: Router, 
        public activeRoute: ActivatedRoute, 
        public ngProgress: NgProgress, 
        private _profileService: ProfileService,
        private helperService: HelperService) {

    }

    // #region "Variables"

    projectList = [];
    tasks = [];
    getUsers = [];
    getUsersCopy = [];
    taskObj = {
        _id: "",
        srNo: "",
        projectRef: "",
        title: "",
        hours: "",
        dueDateTime: "",
        description: "",
        developer: "",
        //mode: "",
        status: "Pending",
        startDate: ""
    }
    isListView = true;
    isEdit = false;
    checkRole = "";
    managerId = "";
    title = "Add New"
    btnName = "Submit";
    fileToUpload: File = null;

    // npm Expot object.
    options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true,
        showTitle: false,
        useBom: false,
        noDownload: false,
        headers: ["Sr #", "Project Name", "Title", "Hours", "End Date", "Description", "Developer", "Created"]
    };
    statusList = [
        {
            id: 1,
            name: "Pending"
        },
        {
            id: 2,
            name: "In Progress"
        },
        {
            id: 3,
            name: "Completed"
        }
    ];
    public startAt = new Date();
    public min = new Date();

    // #endregion

    // #region "Functions"

    // ngOnInit()
    ngOnInit() {

        const token = localStorage.getItem('jwtToken');
        const tokenPayload = decode(token);
        this.userdata.role = tokenPayload.role;
        this._profileService.getLoginUserDetails().subscribe(data => {
            this.userdata = data.data;
        })
        this.ngProgress.start();
        this._taskServive.GetUser().subscribe(
            data => {
                this.getUsers = [];
                data.data.forEach(user => {
                    if (user.role == 2) {
                        this.getUsers.push(user);
                    }
                });
                this.ngProgress.done();
                this.getUsersCopy = this.getUsers;
            });
        this._taskServive.GetProject().subscribe(
            data => {
                this.projectList = data.data;
                this.ngProgress.done();
            });
        this.getTask();
    }

    getTask() {
        this._taskServive.getTask().subscribe(
            data => {
                this.tasks = data.data;
                //this.taskObj.srNo = this.tasks.length + 1;
                this.ngProgress.done();
            });
    }

    // exportTask() - Export task.
    exportTask() {
        let exportCSV = [];
        this.tasks.forEach(element => {
            let test: any = {};
            for (let i of Object.keys(element)) {
                if (i == 'srNo') {
                    test[i] = element[i];
                }
                if (i == 'projectRef') {
                    test[i] = element[i].title;
                }
                if (i == 'title') {
                    test[i] = element[i];
                }
                if (i == 'hours') {
                    test[i] = element[i];
                }
                if (i == 'dueDateTime') {
                    test[i] = element[i];
                }
                if (i == 'description') {
                    test[i] = element[i];
                }
                if (i == 'developer') {
                    test[i] = element[i].firstname + '' + element[i].lastname;
                }
                if (i == 'createdAt') {
                    test[i] = element[i];
                }
            }
            exportCSV.push(test);
        });

        new Angular5Csv(exportCSV, "Task List", this.options);
    }

    // onSubmit() - Submit data to database.
    onSubmit(task: NgForm) {
        if (this.taskObj.projectRef == "" || this.taskObj.projectRef == undefined) {
            this.helperService.showWarning("Please Select Project");
            return;
        }
        if (this.taskObj.title == "" || this.taskObj.title == undefined) {
            this.helperService.showWarning("Enter task title");
            return;
        }

        if (this.userdata.role == 2) {

            this.getUsers.forEach(developer => {

                if (this.userdata.email == developer.email) {
                    console.log(developer._id);
                    this.taskObj.developer = developer._id;

                }
            });

        }
        
        if (this.taskObj.status == "" || this.taskObj.status == undefined) {
            this.helperService.showWarning("Plaese select status");
            return;
        }

        if (this.taskObj.developer == "" || this.taskObj.developer == undefined) {
            this.helperService.showWarning("Plaese select developer");
            return;
        }

        if (this.btnName == "Submit") {
            // Pass data to service.
            this._taskServive.saveTask(this.taskObj)
                .subscribe(data => {
                    // swal({
                    //     position: 'bottom-end',
                    //     type: 'success',
                    //     title: data.message,
                    //     showConfirmButton: false,
                    //     timer: 1500
                    // });
                    this.helperService.showSuccess(data.message)
                    this.ngOnInit();
                });
        } else {
            this._taskServive.updateTask(this.taskObj)
                .subscribe(data => {
                    // swal({
                    //     position: 'bottom-end',
                    //     type: 'success',
                    //     title: data.message,
                    //     showConfirmButton: false,
                    //     timer: 1500
                    // });
                    this.helperService.showSuccess(data.message);
                    this.ngOnInit();
                });
        }
        this.taskObj = {
            _id: "",
            srNo: "",
            projectRef: "",
            title: "",
            hours: "",
            dueDateTime: "",
            description: "",
            developer: "",
            status: "Pending",
            startDate: ""
        }
        this.isListView = true;
    }

    // addNewTask() - add new task.
    addNewTask() {
        this.isListView = false;
        this.btnName = "Submit";
        this.getUsers = this.getUsersCopy;
        this.isEdit = false;
    }

    // goBack() - Go back to list.
    goBack() {
        this.isListView = true;
        this.taskObj = {
            _id: "",
            srNo: "",
            projectRef: "",
            title: "",
            hours: "",
            dueDateTime: "",
            description: "",
            developer: "",
            status: "Pending",
            startDate: ""
        }
    }

    // deleteTask() - Delete task.
    deleteTask(id) {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this Task?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                this._taskServive.removeTask(id)
                    .subscribe(data => {
                        //swal("Deleted!", data.data, "success");
                        this.helperService.showSuccess(data.data);
                    });
                this.ngOnInit();
                if ((this.tasks.length - 1) / 6 == 1) {
                    window.location.reload();
                }
            } else {
                return;
            }
        });
    }

    // editTask() - edit task.
    editTask(task) {
        this.taskObj._id = task._id;
        this.taskObj.srNo = task.srNo;
        this.taskObj.projectRef = task.projectRef._id;
        this.taskObj.title = task.title;
        this.taskObj.hours = task.hours;
        this.taskObj.dueDateTime = task.dueDateTime;
        this.taskObj.description = task.description ? task.description : "";
        this.taskObj.developer = task.developer ? task.developer._id : "";
        this.taskObj.status = task.status ? task.status : "Pending";
        this.taskObj.startDate = task.startDate;
        this.isEdit = true;
        this.isListView = false;
        this.btnName = "Update";
        this.title = "Update";
        this.getDeveloperOfProject(task.projectRef._id)
        /* get Project according to user */
        this.getUsers = [];
        let selectedProject: any = {}
        this.projectList.forEach(element1 => {
            if (this.taskObj.projectRef == element1._id) {
                selectedProject = element1;
                selectedProject.team.forEach(userId => {
                    this.getUsersCopy.forEach(user => {
                        if (user._id == userId) {
                            this.getUsers.push(user);
                        }
                    });
                });
            }
        });
    }

    // getDeveloperOfProject() - get developer according to select project.
    async getDeveloperOfProject(projectId) {
        this.getUsers = [];
        let selectedProject: any = {}
        this.projectList.forEach(element1 => {
            if (projectId == element1._id) {
                selectedProject = element1;
                selectedProject.team.forEach(userId => {
                    this.getUsersCopy.forEach(user => {
                        if (user._id == userId) {
                            this.getUsers.push(user);
                        }
                    });
                });
            }
        });
        this.taskObj.srNo = selectedProject.lastTaskSrNo + 1;
    }
    //#endregion
}
