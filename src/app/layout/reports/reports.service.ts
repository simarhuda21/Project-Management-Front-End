import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppHttpService } from "../../service/app-http/app-http.service";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class ReportsService {
    constructor(private httpService: AppHttpService) { }

    handleError(error: Response | any) {
        const body = JSON.parse(JSON.stringify(error)) || '';
        return Observable.throw(body);
    }

    // get repoers
    getReports() {
        // return this.httpService.get('reports/getReport/')
        //     .map(res => res.json())
        //     .catch(this.handleError);
        return this.httpService.get(`task/getTask/`)
        .map(res => res.json())
        .catch(this.handleError);
    }

    // get projects
    GetProject() {
        return this.httpService.get('reports/getProject/')
            .map(res => res.json())
            .catch(this.handleError);
    }

    // get task
    getTaskFromData(ngproject, startDate, endDate, status) {
        return this.httpService.post('reports/getTaskFromData/', { 'id': ngproject, 'startDate': startDate, 'endDate': endDate, 'status': status })
            .map(res => res.json())
            .catch(this.handleError);
    }

    // get users
    GetUser() {
        return this.httpService.get('reports/getUser/')
            .map(res => res.json())
            .catch(this.handleError);
    }

    // get data 
    getData(text) {
        return this.httpService.post('reports/getSearchData/', { 'text': text })
            .map(res => res.json())
            .catch(this.handleError);
    }

    // get task according to developer
    getTaskFromDeveloper(developer) {
        return this.httpService.post('reports/getTaskDeveloper/', { 'developer': developer })
            .map(res => res.json())
            .catch(this.handleError);
    }
}