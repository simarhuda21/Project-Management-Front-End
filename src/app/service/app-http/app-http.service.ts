import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { LocalStorageService } from './../local-storage/local-storage.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class AppHttpService {

  private hostUrl = environment.API_URI;

  constructor(public http: Http, private router: Router, public localStorage: LocalStorageService) { }

  getHeader(headerOptions, params = {}, doNotSendAuthorizationParam){
    var headerParams = {};
    if(doNotSendAuthorizationParam !== true){
      //send authorization param
      headerParams['x-auth-token'] = this.localStorage.getSessionId();
    }
    if(headerOptions){
      Object.assign(headerParams, headerOptions);
    }

    let qParams: URLSearchParams = new URLSearchParams();
    for(let key in params){
      qParams.set(key, params[key]);
    }

    let headers = new Headers(headerParams);
    let req = new RequestOptions({ headers: headers });
    req.search = qParams;
    return req;
  }

  get(url, params:any = {}, headerOptions:any = {}, doNotSendAuthorizationParam:boolean = false){
    let options = this.getHeader(headerOptions, params, doNotSendAuthorizationParam);
    return this.http.get(this.hostUrl+url, options).catch(this.handleError(this));
  }

  post(url, params:any = {}, headerOptions:any = {}, doNotSendAuthorizationParam:boolean = false){
    let options = this.getHeader(headerOptions, {}, doNotSendAuthorizationParam);
    return this.http.post(this.hostUrl+url, params, options).catch(this.handleError(this));
  }

  put(url, params:any = {}, headerOptions:any = {}, doNotSendAuthorizationParam:boolean = false){
    let options = this.getHeader(headerOptions, {}, doNotSendAuthorizationParam);
    return this.http.put(this.hostUrl+url, params, options).catch(this.handleError(this));
  }

  delete(url,headerOptions:any = {}, doNotSendAuthorizationParam:boolean = false){
    let options = this.getHeader(headerOptions, {}, doNotSendAuthorizationParam);
    return this.http.delete(this.hostUrl+url,options).catch(this.handleError(this));
  }

  handleError(obj) {
    return (error: Response | any) => {
      const body = JSON.parse(error._body) || '';
      if(error.status === 401){
        obj.localStorage.clear();
        obj.router.navigate(['/login']);
      }
      return Observable.throw(body);
    }
  }

}
