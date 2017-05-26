import {Component} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {NavParams, ViewController, Platform} from 'ionic-angular';
import {Site} from '../../app/site/site';
import {Project} from '../../app/project/project';
import {SiteService} from '../../app/site/site.service';
import {ProjectService} from '../../app/project/project.service';


@Component({
  templateUrl: 'site-detail.html'
})
export class SiteDetailPage {
  active: Boolean = true;
  isReadOnly: Boolean = true;
  notready: Boolean = true;
  private _errorMessage: string;
  site_name: number;
  mySite: Site = new Site();
  myProjects: Project[] = [];
  private _myOriginalProjects = [];
  private _mySite_fields;
  siteForm: FormGroup;
  private _siteControls;
  sitegroup: FormGroup;

  private _makeControls(fields) {
      let controls = {};
      for (let i = 0, j = fields.length; i < j; i++) {
          if (fields[i] == 'name') {
              controls[fields[i]] = new FormControl({value: "", disabled: false}, Validators.required);
          }
          else {controls[fields[i]] = new FormControl({value: "", disabled: false});}
      }
      return controls;
  }

  private _updateControls(fields, controls, values): void {
      for (let i = 0, j = fields.length; i < j; i++) {
          let field = fields[i];
          controls[field].setValue(values[field]);
      }
  }

  constructor(
      fb: FormBuilder,
      public platform: Platform,
      public navParams: NavParams,
      public viewCtrl: ViewController,
      private _siteService: SiteService,
      private _projectService: ProjectService
  ) {
    this._getProjects();

    // get the fields for the object type
    this._mySite_fields = Object.keys(this.mySite);

    // make the controls for the control group
    this._siteControls = this._makeControls(this._mySite_fields);

    // populate the control groups with the controls
    this.sitegroup = new FormGroup(this._siteControls);

    // build the form
    this.siteForm = fb.group({
      sitegroup: this.sitegroup
    });

    // get the Site name from the route; if we navigated to this page, we will have an item available as a nav param
    this.site_name = this.navParams.get('name');

    // if the Site name exists, get the site details
    if (this.site_name) {
      this.isReadOnly = true;
      this._getSite(this.site_name);
    }
    // otherwise, this is a new site
    else {
      this.isReadOnly = false;
      this.notready = false;
    }

  }

  private _getSite(site_name){
    this._siteService.getOne(site_name)
      .then(
        response => {
          console.log(response);
          this.mySite = response;
          this._myOriginalProjects = response['projects'];
          this._updateControls(this._mySite_fields, this._siteControls, this.mySite);
          this.mySite = response;
          this.notready = false;
        },
        error => console.log(error));//this._errorMessage = <any>error);
  }

  private _getProjects() {
    this._projectService.getAll()
      .then(response =>
      {
        for(let i =0; i < response.rows.length; i++) {
          this.myProjects.push(response.rows[i].doc);
        }
      }, error => {
        this._errorMessage = <any>error;
      });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit(formValue){
    // TODO: build proper onSubmit function, including validations
    console.log(formValue);
    this.mySite['name'] = formValue.sitegroup.name;
    this.mySite['usgs_sid'] = formValue.sitegroup.usgs_sid;
    this.mySite['usgs_scode'] = formValue.sitegroup.usgs_scode;
    this.mySite['description'] = formValue.sitegroup.description;
    this.mySite['latitude'] = formValue.sitegroup.latitude;
    this.mySite['longitude'] = formValue.sitegroup.longitude;
    this.mySite['datum'] = formValue.sitegroup.datum;
    this.mySite['method'] = formValue.sitegroup.method;
    this.mySite['site_status'] = formValue.sitegroup.site_status;
    this.mySite['nwis_customer_code'] = formValue.sitegroup.nwis_customer_code;
    this.mySite['projects'] = formValue.sitegroup.projects;
    this.mySite['id'] = formValue.sitegroup.id;
    this.mySite['_id'] = formValue.sitegroup.name;
    this._siteService.update(this.mySite).then(response => {
        if (this.mySite['projects'] != this._myOriginalProjects) {
          let newSite = {"id": this.mySite['id'], "name": this.mySite['name'], "usgs_scode": this.mySite['usgs_scode']}
          for (let projectID of this.mySite['projects']) {
            if (this._myOriginalProjects.indexOf(projectID) < 0) {
              this._projectService.findProjectByID(projectID).then(response => {
                let project = response[0];
                project['sites'].push(newSite);
                this._projectService.update(project).then(response => {
                  this.dismiss();
                });
              });
            }
          }
        }
        else {this.dismiss();}
    });
  }

}
