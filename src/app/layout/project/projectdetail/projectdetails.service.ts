import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppHttpService } from "../../../service/app-http/app-http.service";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})
export class ProjectdetailsService {

  constructor(private httpService: AppHttpService) { }

  handleError(error: Response | any) {
    const body = JSON.parse(JSON.stringify(error)) || '';
    return Observable.throw(body);
  }

  GetProjectFromId(id) {
    return this.httpService.get('project/getProjectFromId/', { 'id': id })
    .map(res => res.json())
    .catch(this.handleError);
  }

  GetTaskFromProject(id) {
    return this.httpService.get('project/getTaskFromProject/', { 'id': id })
    .map(res => res.json())
    .catch(this.handleError);
  }
}
