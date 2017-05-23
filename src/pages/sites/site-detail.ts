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
  site_ID: number;
  mySite: Site;
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
    this.mySite = new Site();
    console.log(this.mySite);

    // get the fields for the object type
    this._mySite_fields = Object.keys(this.mySite);
    console.log(this._mySite_fields);

    // make the controls for the control group
    this._siteControls = this._makeControls(this._mySite_fields);
    console.log(this._siteControls);

    // populate the control groups with the controls
    this.sitegroup = new FormGroup(this._siteControls);
    console.log(this.sitegroup);

    this.siteForm = fb.group({
      sitegroup: this.sitegroup
    });

    // If we navigated to this page, we will have an item available as a nav param
    this.site_ID = this.navParams.get('id');

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
    console.log(site_id + " (" + typeof site_id + ")")
    this._siteService.getSiteByID(site_id.toString())
      .then(
        response => {
          console.log(response);
          this.mySite = response.rows[0].doc;
          this._myOriginalProjects = response.rows[0].doc['projects'];
          this._updateControls(this._mySite_fields, this._siteControls, this.mySite);
          this.mySite = response;
          this.notready = false;
        },
        error => this._errorMessage = <any>error);
  }

  private _getProjects() {
    this._projectService.getAll()
      .then(response =>
      {
        //console.log(response);
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
    this.mySite['_id'] = formValue.sitegroup.id;
    this._siteService.update(this.mySite).then(response => {
        console.log(response);
        // TODO: update projects to include the new site
        if (this.mySite['projects'] != this._myOriginalProjects) {
          // let newProjects = [];
          // this._projectService.update(newProjects).then(response => {
          //   console.log(response);
          //   this.dismiss();
          // }
          this.dismiss();
        }
        else {this.dismiss();}
    });
  }

}
