import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppHttpService } from "../../../service/app-http/app-http.service";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';


@Injectable()
export class ImportTaskService {
    constructor(private httpService: AppHttpService) { }

    handleError(error: Response | any) {
        const body = JSON.parse(JSON.stringify(error)) || '';
        return Observable.throw(body);
      }

    // GetProject() - get projects.
    GetProject() {
        return this.httpService.get('task/getProject/')
        .map(res => res.json())
        .catch(this.handleError);
    }
}