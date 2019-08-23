import { Component, OnInit } from '@angular/core';
import { ImportTaskService } from './import-task.service';
import { environment } from '../../../../environments/environment.prod';
import decode from 'jwt-decode';
import { FileUploader } from 'ng2-file-upload';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';

const URL = environment.API_URI + 'task/uploadCSV';
@Component({
  selector: 'app-import-task',
  templateUrl: './import-task.component.html',
  styleUrls: ['./import-task.component.scss']
})

export class ImportTaskComponent implements OnInit {

  // #region "Variables"

  loginId = "";
  checkRole = "";
  projectList = [];
  projectRef = "";
  uploadFile = "";

  // #endregion

  // constructor()
  constructor(private router: Router, private _importTaskServive: ImportTaskService) { }
  // Initialize file upload path 
  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });
  // ngOnInit()
  ngOnInit() {

    // get token payload
    const token = localStorage.getItem('jwtToken');
    const tokenPayload = decode(token);
    this.loginId = tokenPayload.id;
    this.checkRole = tokenPayload.role;

    // Get Projects List
    this._importTaskServive.GetProject().subscribe(
      data => {
        this.projectList = data.data;
      });

    // give extra parameter to ng2-uploader
    this.uploader.onBeforeUploadItem = (fileItem: any) => {
      fileItem.formData.push({ id: this.projectRef });
      fileItem.formData.push({ developer: this.loginId });
      fileItem.formData.push({ role: this.checkRole });
    };
    this.uploader.options.additionalParameter = {
      id: this.projectRef,
      developer: this.loginId,
      role: this.checkRole
    };

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    // file upload response.
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      swal("Success", 'File uploaded successfully', "success");
      this.router.navigate(['tasks']);
      this.ngOnInit();
    };
  }

  // #region "Funtion"

  // onSelectProject() - select project.
  onSelectProject() {
    this.ngOnInit();
  }

  downloadTemplate(){
    let template = [];
    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: false,
      useBom: false,
      noDownload: false,
      headers: ["projectRef", "title", "hours", "dueDateTime", "description", "startDate"]
    };
   
    new Angular5Csv(template, "Template", options);
  }
  
  // #endregion

}
