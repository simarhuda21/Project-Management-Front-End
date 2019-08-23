import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ForgetPasswordService } from './forgetpassword.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { HelperService } from '../service/helper.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {

  reset: FormGroup;
  password: FormGroup;
  id = '';
  token = '';
  count = 0;


  constructor(public http: HttpClient, 
    private router: Router, 
    private helperService: HelperService,
    private _Activatedroute: ActivatedRoute, 
    public _ForgetPasswordService: ForgetPasswordService) { }

  // forgotpasswordEmail = { email:'' };


  ngOnInit() {

    this.reset = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-z0-9_\.]+@[a-zA-Z]+\.[a-zA-Z]+')]),
    }),
      this.password = new FormGroup({
        password: new FormControl(null, Validators.required),
        cpassword: new FormControl(null, Validators.required)
      }, this.passwordMatchValidator);

    this._Activatedroute.params.subscribe(routeParams => {
      this.token = (routeParams.token);
      this.id = routeParams.id;
      if (this.id === undefined) {
        this.count = 0;
      } else {
        this.count = 1;
      }
    });
  }

  resetpass(email, isValid: boolean) {
    
    this._ForgetPasswordService.sendemail(this.reset.value)
      .subscribe(data => {
        this.helperService.showSuccess("Password sent to your email")
        this.reset.value.email = "";
      }, err => {
        this.helperService.showError("Email Id is not registered")
        this.reset.reset();
        return;
      });
  };

  changepassword (password, isValid: boolean) {
    const obj: any = {
      password: this.password.value,
      token: this.token,
      id: this.id
    };
    this._ForgetPasswordService.changepassword(obj)
      .subscribe(data => {
        // swal({
        //   position: 'bottom-end',
        //   type: 'success',
        //   title: data.message,
        //   showConfirmButton: false,
        //   timer: 1500
        // });
        //this.ngOnInit();
        this.helperService.showSuccess(data.message)
        this.router.navigate(['login']);
      }, error => this['errorMessage'] = error);
    this.password.reset();
  };

  passwordMatchValidator(g: FormGroup) {
    return g.get('cpassword').value === g.get('password').value
      ? null : { 'mismatch': true };
  }

}
