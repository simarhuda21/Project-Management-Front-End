import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppHttpService } from "../../service/app-http/app-http.service";
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import "rxjs/add/observable/of";

@Injectable()
export class ProfileService {
    
    constructor(private httpService: AppHttpService) { }

    handleError(error: Response | any) {
        const body = JSON.parse(JSON.stringify(error)) || '';
        return Observable.throw(body);
    }

    getLoginUserDetails(){
        return this.httpService.get('user/loginUser')
        .map(res => res.json())
        .catch(this.handleError);
    }

    changePassword(body){
        return this.httpService.put('user/changePassword', body)
        .map(res => res.json())
        .catch(this.handleError);
    }
}