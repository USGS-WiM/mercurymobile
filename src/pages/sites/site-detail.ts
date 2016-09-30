import {Component} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {NavParams, ViewController, Platform} from 'ionic-angular';
import {Site} from '../../app/site/site';
import {Project} from '../../app/project/project';
import {SiteService} from '../../app/site/site.service';
import {ProjectService} from '../../app/project/project.service';


@Component({
  templateUrl: 'site-detail.html',
  providers: [SiteService, ProjectService]
})
export class SiteDetailPage {
  active: Boolean = true;
  isReadOnly: Boolean = true;
  notready: Boolean = true;
  private _errorMessage: string;
  site_ID: number;
  mySite: Site;
  myProjects: Project[];
  private _myOriginalProjects = [];

  siteForm: FormGroup;
  id: FormControl = new FormControl(null);
  name: FormControl = new FormControl(null, Validators.required);
  usgs_sid: FormControl = new FormControl(null);
  usgs_scode: FormControl = new FormControl(null);
  description: FormControl = new FormControl(null);
  latitude: FormControl = new FormControl(null);
  longitude: FormControl = new FormControl(null);
  datum: FormControl = new FormControl(null);
  method: FormControl = new FormControl(null);
  status: FormControl = new FormControl(null);
  nwis_customer_code: FormControl = new FormControl(null);
  projects: FormControl = new FormControl(null);

  constructor(
      fb: FormBuilder,
      public platform: Platform,
      public navParams: NavParams,
      public viewCtrl: ViewController,
      private _siteService: SiteService,
      private _projectService: ProjectService
  ) {
    this._getProjects();

    // If we navigated to this page, we will have an item available as a nav param
    this.site_ID = this.navParams.get('id');

    this.siteForm = fb.group({
      id: this.id,
      name: this.name,
      usgs_sid: this.usgs_sid,
      usgs_scode: this.usgs_scode,
      description: this.description,
      latitude: this.latitude,
      longitude: this.longitude,
      datum: this.datum,
      method: this.method,
      status: this.status,
      nwis_customer_code: this.nwis_customer_code,
      projects: this.projects
    });

    if (this.site_ID) {
      this.isReadOnly = true;
      this._getSite(this.site_ID);
    }
    else {
      this.isReadOnly = false;
      this.notready = false;
    }

  }

  private _getSite(site_id){
    this._siteService.getSite(site_id)
      .subscribe(
        response => {
          this.mySite = response;
          this._myOriginalProjects = response.projects;
          this.id.setValue(response.id);
          this.name.setValue(response.name);
          this.usgs_sid.setValue(response.usgs_sid);
          this.usgs_scode.setValue(response.usgs_scode);
          this.description.setValue(response.description);
          this.latitude.setValue(response.latitude);
          this.longitude.setValue(response.longitude);
          this.datum.setValue(response.datum);
          this.method.setValue(response.method);
          this.status.setValue(response.status);
          this.nwis_customer_code.setValue(response.nwis_customer_code);
          this.projects.setValue(response.projects);
          this.notready = false;
        },
        error => this._errorMessage = <any>error);
  }

  private _getProjects() {
    this._projectService.getProjects()
      .subscribe(
        response => {
          this.myProjects = response;
        },
        error => this._errorMessage = <any>error);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit(formValue){
    alert("Submitted!");
    console.log(formValue);
    this.viewCtrl.dismiss();
  }
}
