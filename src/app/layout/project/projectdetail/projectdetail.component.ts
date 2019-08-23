import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectdetailsService } from './projectdetails.service';

@Component({
  selector: 'app-projectdetail',
  templateUrl: './projectdetail.component.html',
  styleUrls: ['./projectdetail.component.scss']
})
export class ProjectdetailComponent implements OnInit {

  // #region "Variables"

  id;
  project: any = {};
  tasks: any = [];
  team: any = [];

  // #endregion

  // constructor()
  constructor(private _Activatedroute: ActivatedRoute,
    private router: Router,
    private _ProjectDetailService: ProjectdetailsService) { }

  // ngOnInit()
  ngOnInit() {
    // _Activatedroute params
    this._Activatedroute.params.subscribe(routeParams => {
      this.id = routeParams.id;
    });

    // Project Details
    this._ProjectDetailService.GetProjectFromId(this.id).subscribe(
      data => {
        this.project = data.data[0];
        this.team = data.data[0].team;
        //console.log("Team", this.team)  
      });

    // get project details from project  
    this._ProjectDetailService.GetTaskFromProject(this.id).subscribe(
      data => {
        for (var i = 0; i < data.data.length; i++) {
          this.tasks.push(data.data[i]);
        }
      });
  }
}
