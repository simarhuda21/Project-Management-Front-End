import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppHttpService } from "../../../service/app-http/app-http.service";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})
export class ProjectListService {

  constructor(private httpService: AppHttpService) { }

  handleError(error: Response | any) {
    const body = JSON.parse(JSON.stringify(error)) || '';
    return Observable.throw(body);
  }

  saveProject(project) {
    return this.httpService.post('project/createProject', project)
    .map(res => res.json())
    .catch(this.handleError);
  }

  updateProject(project) {
    return this.httpService.put('project/updateProject', project)
      .map(res => res.json())
      .catch(this.handleError);
  }

  GetProject() {
    return this.httpService.get('project/getProject/')
    .map(res => res.json())
    .catch(this.handleError);
  }

  GetProjectAll() {
    return this.httpService.get('project/getProject/')
    .map(res => res.json())
    .catch(this.handleError);
  }

  deleteProject(id) {
    return this.httpService.post('project/deleteProject/', { 'id': id })
    .map(res => res.json())
    .catch(this.handleError);
  }

  GetUser() {
    return this.httpService.get('project/getDeveloper/')
      .map(res => res.json())
      .catch(this.handleError);
  }

  GetManager() {
    return this.httpService.get('project/getManager/')
    .map(res => res.json())
    .catch(this.handleError);
  }

  GetTaskFromProject(id) {
    return this.httpService.post('project/getTaskFromProject/', { 'id': id })
    .map(res => res.json())
    .catch(this.handleError);
  }
}
