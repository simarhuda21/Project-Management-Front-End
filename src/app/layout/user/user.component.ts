import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { UserService } from './user.service';
import swal from 'sweetalert2';
import { NgProgress } from 'ngx-progressbar';
import { HelperService } from '../../service/helper.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input('data') meals: string[] = [];
  page: number = 1;

  // #region "Variables"

  userdata = [];
  valbutton = 'Submit';
  emailval = ' ';
  isListView = true;
  isupdated = true;
  role = { 1: 'Manager', 2: 'Developer', 3: 'Admin' };
  roles = [{
    id: 1,
    name: "Manager"
  }, {
    id: 2,
    name: "Developer"
  }];
  user = {
    _id: 0,
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    newpassword: '',
    confirmpassword: '',

    // username: '',
    role: 0,
    remainder: true,
    status: false,
    mode: ""
  };

  // #endregion

  // constructor()
  constructor(
    private newService: UserService,
    public ngProgress: NgProgress,
    private helperService: HelperService
  ) { }

  // ngOnInit()
  ngOnInit() {
    // Display Users
    this.ngProgress.start();
    this.newService.GetUser().subscribe(
      data => {
        // this.userdata = data;
        this.userdata = [];
        data.data.forEach(user => {
          if (user.role != 4) {
            this.userdata.push(user);
          }
        });
        this.ngProgress.done();
      });
  }

  // #region "Functions"

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // editUser() - edit user
  editUser(userobj) {
    this.valbutton = "update"
    this.user._id = userobj._id;
    this.user.firstname = userobj.firstname,
      this.user.lastname = userobj.lastname,
      this.user.email = userobj.email,
      // this.user.username = userobj.username,
      this.user.role = userobj.role,
      this.user.remainder = userobj.remainder,
      this.user.status = userobj.status,
      // this.user.password = userobj.password,
      this.user.newpassword = userobj.newpassword,
      this.user.confirmpassword = userobj.confirmpassword,

      this.isListView = false;
    this.isupdated = true;
  }

  // deleteUser() - delete user
  deleteUser(id) {
    swal({
      title: 'Are you sure?',
      text: 'Are you sure that you want to delete this User?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.newService.DeleteUser(id)
          .subscribe(data => {
            this.helperService.showSuccess(data.message)
            //swal('Deleted!', data.message, 'success');
            this.ngOnInit();
          });
      } else { return; }
    });
  }

  // onFormSubmit() - Registering User
  onFormSubmit (userobj) {
    console.log(this.user);

    if (this.user.firstname == "" || this.user.firstname == undefined) {
      this.helperService.showWarning("Please enter first name");
      return;
    }
    if (this.user.lastname == "" || this.user.lastname == undefined) {
      this.helperService.showWarning("Please enter last name");
      return;
    }
    if (this.user.email == "" || this.user.email == undefined) {
      this.helperService.showWarning("Please enter email Address");
      return;
    } else if (!this.validateEmail(this.user.email)) {
      this.helperService.showWarning("Please enter valid email Address");
      return;
    }

    if (this.user.newpassword != this.user.confirmpassword) {
      this.helperService.showWarning("new password and confirm password is not matched");
      return;
    }

    if (this.user.role == 0 || this.user.role == undefined) {
      this.helperService.showWarning("Please select role");
      return;
    }

    if (this.valbutton == "Submit") {
      this.newService.registeruser(this.user)
        .subscribe(data => {
          this.helperService.showSuccess(data.message);
          this.ngOnInit();
          this.user = {
            _id: 0,
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            newpassword: '',
            confirmpassword: '',
            // username: '',
            role: 0,
            remainder: true,
            status: false,
            mode: ''
          };
        },
          err => {
            if (err.data == 1 || err) {
              this.isListView = false;
              // swal({
              //   position: 'bottom-end',
              //   type: 'warning',
              //   //replace username to ..
              //   title: err.data == 1 ? "User already registered." : "Username already taken",
              //   showConfirmButton: false,
              //   timer: 5000
              // })
              this.helperService.showError(err.data == 1 ? "User already registered." : "Username already taken");
              return;
            }
          });
    } else {
      this.newService.updateUser(this.user)
        .subscribe(data => {
          // swal({
          //   position: 'bottom-end',
          //   type: 'success',
          //   title: data.message,
          //   showConfirmButton: false,
          //   timer: 5000
          // })
          this.helperService.showSuccess(data.message);
          this.ngOnInit();
          this.user = {
            _id: 0,
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            newpassword: '',
            confirmpassword: '',
            // username: '',
            role: 0,
            remainder: true,
            status: false,
            mode: ""
          };
        });
    }
    this.isListView = true;
  };

  // addNewUser() - add new User
  addNewUser() {
    this.user = {
      _id: 0,
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      newpassword: '',
      confirmpassword: '',
      // username: '',
      role: 0,
      remainder: true,
      status: false,
      mode: ""
    };
    this.isListView = false;
    this.isupdated = false;
    this.valbutton = 'Submit';
  }

  // goBack() - go back to list view.
  goBack() {
    this.isListView = true;
  }


  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }
  // #endregion
}




