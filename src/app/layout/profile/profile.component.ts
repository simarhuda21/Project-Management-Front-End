import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import decode from 'jwt-decode';
import { FormGroup, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { UserRoutingModule } from '../user/user-routing.module';
import { HelperService } from '../../service/helper.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userdata = {
    firstname: "",
    lastname: "",
    // username: "",
    email: "",
    role: 0
  };
  changePassword = new FormGroup({
    currentPassword: new FormControl(''),
    newPassword: new FormControl(''),
    confirmPassword: new FormControl('')
  });

  constructor(
    private _profileService: ProfileService, private helperService: HelperService,
  ) { }

  ngOnInit() {
    this._profileService.getLoginUserDetails().subscribe(data => {
      this.userdata = data.data;
      //console.log(this.userdata);
        })
  }

  onSubmit() {
    if (this.changePassword.value.newPassword != this.changePassword.value.confirmPassword) {
      this.helperService.showWarning("Your new password does not match with confirm password");
      return
    }
    this._profileService.changePassword(this.changePassword.value).subscribe(
      data => {
        // swal({
        //   position: 'bottom-end',
        //   type: 'success',
        //   title: data.message,
        //   showConfirmButton: false,
        //   timer: 1500
        // });
        this.helperService.showSuccess(data.message);
        this.changePassword.reset();
      }, err => {
        // swal("", err.message, "warning");
        this.helperService.showError(err.message)
      })
  }

  clear(){
    this.changePassword.reset();
  }
}
