import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../task.service';
import { NgProgress } from 'ngx-progressbar';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { ProfileService } from '../../profile/profile.service';
import decode from 'jwt-decode';
import { HelperService } from '../../../service/helper.service';

@Component({
  selector: 'app-taskdetail',
  templateUrl: './taskdetail.component.html',
  styleUrls: ['./taskdetail.component.scss']
})
export class TaskdetailComponent implements OnInit {

  id;
  page: number = 1;
  // project: any = {};
  tasks: any = [];
  team: any = [];
  projectname;
  // username;
  userdata = {
    firstname: "",
    lastname: "",
    email: "",
    role: 0
  };
  comments : any = [];
  commentDetial = {
    comment: "",
    commentor: "",
    commenterId: ""
  }
  commentObj = {
    commentDetail: this.commentDetial,
    taskId: ""
  }
  public mycomment = false;
  // #endregion

  // constructor()
  constructor(private _Activatedroute: ActivatedRoute, private helperService: HelperService,
    private router: Router, private _taskServive: TaskService, public ngProgress: NgProgress, private _profileService: ProfileService) {
    this._profileService.getLoginUserDetails().subscribe(data => {
      this.userdata = data.data;
    })

  }

  ngOnInit() {


    // _Activatedroute params
    this._Activatedroute.params.subscribe(routeParams => {
      this.id = routeParams.id;
    });

    this.getTaskFromId(this.id);
    this.commentObj = {
      commentDetail: this.commentDetial,
      taskId: this.id
    }
  }

  getTaskFromId(id) {
    const token = localStorage.getItem('jwtToken');
    // decode the token to get its payload
    const tokenPayload = decode(token);
    let myId = tokenPayload.id;

    this._taskServive.getTaskFromId(id).subscribe(
      (data) => {
        // console.log(data);
        this.tasks = data.data;
        
        this.projectname = data.projectTitle;
        this.comments = data.cdata != null ? data.cdata.commentDetail : "";
        console.log(this.comments);
        // this.comments.forEach(element => {
         
        //   if (myId == element.commenterId) {
        //     element.mycomment = true;
        //   }
        // });

        this.ngProgress.done();
      });
  }

  addComment(commentObj) {
    if (this.commentObj.commentDetail.comment == "" || this.commentObj.commentDetail.comment == undefined) {
      this.helperService.showWarning("Please Write Commet");
      return;
    }

    //changes username to firstname
    if (this.userdata.firstname != "" || this.userdata.firstname != undefined) {

      this.commentObj.commentDetail.commentor = this.userdata.firstname + " " + this.userdata.lastname;
      this.commentObj.commentDetail.commenterId = this.userdata['_id'];
    }
    this._taskServive.addComments(this.commentObj)

      .subscribe(data => {
        // swal({
        //   position: 'bottom-end',
        //   type: 'success',
        //   title: data.message,
        //   showConfirmButton: false,
        //   timer: 1500
        // });
        this.helperService.showSuccess(data.message);
        this.getTaskFromId(this.id);
      });
    this.commentDetial.comment = "";
  }

  deleteComment(id) {

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this comment?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        let taskid = this.id;
        let loginuser = this.userdata.firstname + " " + this.userdata.lastname;
        this._taskServive.deleteComments(id, taskid, loginuser)
          .subscribe(
            data => {
              // swal({
              //   position: 'bottom-end',
              //   type: 'success',
              //   title: data.message,
              //   showConfirmButton: false,
              //   timer: 1500
              // });
              this.helperService.showSuccess(data.message);
              this.getTaskFromId(this.id);
            },
            err => {
              swal({
                title: '<strong>Info</strong>',
                type: 'info',
                html:
                  'You can not delete <b>other person</b> comments',
                focusConfirm: false,
                confirmButtonText:
                  '<i class="fa fa-thumbs-up"></i> Ok!',
                confirmButtonAriaLabel: 'Thumbs up, great!',
              })
            });

      }

    })

  }

}