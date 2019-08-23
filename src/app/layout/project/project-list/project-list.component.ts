import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectListService } from './project-list.service'
import swal from 'sweetalert2';
import decode from 'jwt-decode';
import { NgProgress } from 'ngx-progressbar';
import { TitleCasePipe } from '@angular/common';
import { HelperService } from '../../../service/helper.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})

export class ProjectListComponent implements OnInit {

  @Input('data') meals: string[] = [];
  page: number = 1;

  // #region "Variables"

  isNewproject = false;
  mode = '';
  userslist = [];
  getusers = [];
  cities = [];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  showTitle = "Add New";
  projectObj = {
    id: "",
    title: "",
    manager: "",
    team: [],
    mode: "save",
  }
  Repdata = [];
  valbutton = 'Submit';
  managerId = "";
  manageruser = [];
  checkRole: any = "";
  detailid = false;
  detailtask = [];

  // #endregion

  // constructor()
  constructor(
    private router: Router,
    public activeRoute: ActivatedRoute,
    private newService: ProjectListService,
    public ngProgress: NgProgress,
    private titlecasePipe:TitleCasePipe,
    private helperService: HelperService
  ) { }

  // ngOnInit()
  ngOnInit() {
    const token = localStorage.getItem('jwtToken');
    const tokenPayload = decode(token);
    this.checkRole = tokenPayload.role;
    this.managerId = this.checkRole == "1" ? tokenPayload.id : "";
    this.dropdownList = [];
    //console.log(this.checkRole);
    this.projectObj.manager = this.checkRole == "1" ? tokenPayload.id : "";
    this.ngProgress.start();
    this.newService.GetManager().subscribe(
      data => {
        //console.log(data);
        this.manageruser = [];
        data.data.forEach(user => {
          if (user.role == 1) {
            this.manageruser.push(user);
          }

        });
        this.ngProgress.done();
      });
    if (this.checkRole == '1') {
      this.newService.GetProject().subscribe(
        data => {
          this.Repdata = data.data;
          this.Repdata.forEach(project => {
            project.team.forEach(user => {
              user.showName = user.firstname + ' ' + user.lastname;
            });
          });
          //console.log("GET", this.Repdata);
          this.ngProgress.done();
        });
    } else if (this.checkRole == '4') {
      this.newService.GetProjectAll().subscribe(
        data => {
          this.Repdata = data.data;
          this.Repdata.forEach(project => {
            project.team.forEach(user => {
              user.showName = user.firstname + ' ' + user.lastname;
            });
          });
          //console.log("GET", this.Repdata);
          this.ngProgress.done();
        });
    }

    this.newService.GetUser().subscribe(
      data => {
        this.getusers = [];
        data.data.forEach(user => {
          if (user.role == 2) {
            this.getusers.push(user);
          }
        });
        //console.log("This", this.getusers);
        this.dropdownList = [];
        this.getusers.forEach(user => {
          var users = {
            showName: this.titlecasePipe.transform(user.firstname + " " + user.lastname),
            _id: user._id
          }
          this.dropdownList.push(users);
        });
        this.ngProgress.done();
      });

    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'showName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: false
    };
  }

  // #region "Function"

  // onItemSelect() - select developer.
  onItemSelect(item: any) {
    let teamobj = JSON.parse(JSON.stringify(item));
    this.projectObj.team.push(teamobj._id);
  }

  // onSelectAll() -  select all developer.
  onSelectAll(items: any) {
    items.forEach(element => {
      this.projectObj.team.push(element._id);
    });
  }

  // onSelectRemove() - remove developer from list.
  onSelectRemove(item: any) {
    let index = this.projectObj.team.findIndex(x => x._id == item._id);
    this.projectObj.team.splice(index, 1);
    //console.log("Index", this.projectObj.team.indexOf(item._id));
  }

  // onSave() - Saving the record.
  onSave(project) {
    //console.log(project);
    if (this.projectObj.title === '' || this.projectObj.title === undefined) {
      this.helperService.showWarning('Please enter Title of the Project');
      return;
    }
    if (this.projectObj.manager === '' || this.projectObj.manager === undefined) {
      this.helperService.showWarning('Please Assign the Manager');
      return;
    }
    if (this.projectObj.team.length == 0 || this.projectObj.team === undefined) {
      this.helperService.showWarning('Please Assign the Members');
      return;
    }
    if (this.valbutton == "Submit") {
      this.newService.saveProject(this.projectObj)
        .subscribe(data => {
          // swal({
          //   position: 'bottom-end',
          //   type: 'success',
          //   title: data.message,
          //   showConfirmButton: false,
          //   timer: 1500
          // });
          this.helperService.showSuccess(data.message);
          this.isNewproject = false;
          this.projectObj = {
            id: "",
            title: "",
            manager: "",
            team: [],
            mode: "save",
          }
          this.ngOnInit();
          this.valbutton = 'Submit';
        }
          , error => this['errorMessage'] = error);
    } else {
      this.newService.updateProject(this.projectObj)
        .subscribe(data => {
          // swal({
          //   position: 'bottom-end',
          //   type: 'success',
          //   title: data.message,
          //   showConfirmButton: false,
          //   timer: 1500
          // });
          this.helperService.showSuccess(data.message);
          this.isNewproject = false;
          this.projectObj = {
            id: "",
            title: "",
            manager: "",
            team: [],
            mode: "save",
          }
          this.ngOnInit();
          this.valbutton = 'submit';
        }
          , error => this['errorMessage'] = error);
    }
  };

  // isNewProject() - new Project.
  isNewProject() {
    this.showTitle = "Add New";
    this.userslist = [];
    //this.dropdownList = [];
    this.projectObj = {
      id: "",
      title: "",
      manager: "",
      team: [],
      mode: "save",
    }
    this.projectObj.manager = this.checkRole == "1" ? this.managerId : "";
    this.isNewproject = true;
  }

  // edit() - edit record
  edit = function (kk) {



    // console.log(kk._id);
    // console.log("id" + kk.manager._id);
    // console.log("magid" + kk.managerId + "role" + this.checkRole);
    // console.log("hello");
    // console.log(kk.manager);




    this.showTitle = "Update"
    this.userslist = [];
    //console.log(kk);
    this.projectObj.title = kk.title;
    if (kk.manager) {
      console.log("yes");
      this.projectObj.manager = this.checkRole == "1" ? this.managerId : kk.manager._id;
    }
    if (kk.team.length >= 0) {
      kk.team.forEach(element => {
        this.projectObj.team.push(element);
      });
    }
    if (kk.team.length >= 0) {
      kk.team.forEach(element => {
        this.userslist.push(element);
      });
    }
    this.projectObj.id = kk._id;
    this.projectObj.mode = "Update";
    this.valbutton = 'Update';
    this.isNewproject = true;
  };

  // goBack() - Cancel button go back operation
  goBack() {
    this.isNewproject = false;
  }

  // delete() - Delete record
  delete = function (id) {
    swal({
      title: 'Are you sure?',
      text: 'Are you sure that you want to delete this Project? If you delete this Project then all information of this Project will be delete',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.newService.deleteProject(id)
          .subscribe(data => {
            // swal('Deleted!', data.message, 'success');
            this.helperService.showSuccess(data.message);
            this.ngOnInit();
          });
      } else {
        return;
      }
    });
  };

  //details() - get details
  details = function (id) {
    //console.log(id);
    this.detailid = true;
    //console.log(this.detailid);
    this.newService.GetTaskFromProject(id).subscribe(
      data => {
        this.detailtask = data;
        // console.log(this.detailtask);
      });
    // this.router.navigate('/projectdetail');
  }
  // #endregion
}

