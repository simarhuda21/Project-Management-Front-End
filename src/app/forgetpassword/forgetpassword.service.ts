import { Injectable } from '@angular/core';
import {Http,Response, Headers, RequestOptions } from '@angular/http';
import { AppHttpService } from "../service/app-http/app-http.service";
import { Observable, Subject } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import "rxjs/add/observable/of";

@Injectable()
export class ForgetPasswordService {
    constructor(private httpService: AppHttpService) { }

    handleError(error: Response | any) {
        const body = JSON.parse(JSON.stringify(error)) || '';
        return Observable.throw(body);
      }

    sendemail(email){
        return this.httpService.post('user/forgotPassword', email)
        .map(res => res.json())
        .catch(this.handleError);
    }

    changepassword(obj){
        return this.httpService.put('user/resetPassword', obj)
        .map(res => res.json())
        .catch(this.handleError);
    }
}