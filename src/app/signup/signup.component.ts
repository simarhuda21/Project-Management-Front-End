import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { UserService } from '../layout/user/user.service';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    firstname: String;
    lastname: String;
    password: String;
    email: String;
    role: Number;
    repeatpassword:String;
    url =  environment.API_URI + "user/register";
    constructor(private http:  HttpClient) {}
    


    ngOnInit() {}
    signup(){
        const user ={
            firstname:this.firstname,
            lastname: this.lastname,
            email:this.email,
            password:this.password,
            role:this.role

        };
        console.log(user);
        this.http.post(this.url, user).subscribe(resp => {  
            const res = resp;
            console.log(res);
        });
}
}
