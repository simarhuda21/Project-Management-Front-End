import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppHttpService } from "../../service/app-http/app-http.service";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
//import { Config } from '';

@Injectable()
export class TaskService {

  constructor(private httpService: AppHttpService) {
  }

  handleError(error: Response | any) {
    const body = JSON.parse(JSON.stringify(error)) || '';
    return Observable.throw(body);
  }

  saveTask(task) {
    return this.httpService.post('task/createTask', task).map(res => res.json())
      .catch(this.handleError);
  }

  updateTask(task) {
    return this.httpService.put('task/updateTask', task).map(res => res.json())
      .catch(this.handleError);
  }

  getTask() {
    return this.httpService.get(`task/getTask/`)
      .map(res => res.json())
      .catch(this.handleError);
  }
  getTaskFromId(id) {
    return this.httpService.get('task/gettaskfromid/', { 'id': id })
      .map(res => res.json())
      .catch(this.handleError);
  }
  // , { 'id': id }
  addComments(comment) {
    return this.httpService.post('task/addComment', comment)
      .map(res => res.json())
      .catch(this.handleError);
  }
  //deletecomment
  deleteComments(id, taskId, loginuser) {
    return this.httpService.post('task/deleteComment', { 'id': id, 'taskid': taskId, loginuser })
      .map(res => res.json())
      .catch(this.handleError);
  }

  removeTask(id) {
    return this.httpService.post('task/deleteTask/', { 'id': id })
      .map(res => res.json())
      .catch(this.handleError);
  }

  GetProject() {
    return this.httpService.get('task/getProject/')
      .map(res => res.json())
      .catch(this.handleError);
  }

  GetUser() {
    return this.httpService.get('task/getDeveloper/')
      .map(res => res.json())
      .catch(this.handleError);
  }
}