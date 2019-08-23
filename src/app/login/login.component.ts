import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { routerTransition } from '../router.animations';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import swal from 'sweetalert2';
import { NgZone } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';
import { environment } from '../../environments/environment.prod';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  email: String;
  password: String;
    message = '';
    data: any = [];
    // url = "http://localhost:3000/api/v1/user/login";
     url =  environment.API_URI + "user/login";
    constructor(public http: HttpClient , public router: Router, private _ngZone: NgZone, public ngProgress: NgProgress) {}
    role: any = '0';
    ngOnInit() {}

    login() {  
      const user = {
        email: this.email,
        password: this.password  
      }  
        this.http.post(this.url, user).subscribe(resp => {       
          this.data = resp;
          //const res = resp;
            //console.log(res);
          localStorage.setItem('jwtToken', this.data.token);
          localStorage.setItem('isLoggedin', 'true');
           localStorage.setItem('name', this.data.firstname);
           localStorage.setItem('role', this.data.role);
           localStorage.setItem('role', this.data.id);
           this.ngProgress.start();
          this._ngZone.run(() => {
            this.role = localStorage.getItem('role');
            if (this.role === 1) {
            this.router.navigate(['./projects']);
              } else if (this.role === 4) {
                this.router.navigate(['./users']);
              } else {
                this.router.navigate(['./tasks']);
              }
              this.ngProgress.done();
          });
        }, err => {    
          swal("", "Username and password incorrect.", "warning");
          return;
        });
        localStorage.removeItem('role');
      }

      private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          console.error(error); // log to console instead
          return of(result as T);
        };
      }

}
