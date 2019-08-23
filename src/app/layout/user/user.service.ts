import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppHttpService } from "../../service/app-http/app-http.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { HttpClientModule } from '@angular/common/http';
import { Users } from './user.model';
@Injectable()
export class UserService {
    selectedUser: Users;
    UserList: Users[];
    constructor(private httpService: AppHttpService) { }

    handleError(error: Response | any) {
        const body = JSON.parse(JSON.stringify(error)) || '';
        return Observable.throw(body);
    }

    // register user
    registeruser(user) {
        return this.httpService.post('user/register', user)
        .map(res => res.json())
        .catch(this.handleError);
    }

    updateUser(user) {
        return this.httpService.put('user/updateUser', user)
        .map(res => res.json())
        .catch(this.handleError);
    }

    // email check
    isemail(email) {
        return this.httpService.post('http://localhost:3000/check', email)
        .map(res => res.json())
        .catch(this.handleError);
    }

    // get user
    GetUser() {
        return this.httpService.get('user/getUser')
        .map(res => res.json())
        .catch(this.handleError);
    }

    // delete user
    DeleteUser(id) {
        return this.httpService.post('user/deleteUser', { 'id': id })
        .map(res => res.json())
        .catch(this.handleError);
    }

    // edit user
    editUser(id) {
        return this.httpService.put('user/update/id', + id)
        .map(res => res.json())
        .catch(this.handleError);
    }
}
