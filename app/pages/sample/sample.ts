import {Component} from '@angular/core';
import {URLSearchParams}   from '@angular/http';
import {REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, FormArray, FormBuilder} from "@angular/forms";
import {NavController} from 'ionic-angular';
import {Project} from '../../project/project';
import {Site} from '../../site/site';
import {Sample} from '../../sample/sample';
import {SampleBottle} from '../../samplebottle/samplebottle';
import {Bottle} from "../../bottle/bottle";
import {Medium} from "../../medium/medium";
import {Analysis} from "../../analysis/analysis";
import {Filter} from "../../filter/filter";
import {Preservation} from "../../preservation/preservation";
import {Acid} from "../../acid/acid";
import {ProjectService} from '../../project/project.service';
import {SiteService} from '../../site/site.service';
import {BottleService} from "../../bottle/bottle.service";
import {MediumService} from "../../medium/medium.service";
import {AnalysisService} from "../../analysis/analysis.service";
import {FilterService} from "../../filter/filter.service";
import {PreservationService} from "../../preservation/preservation.service";
import {AcidService} from "../../acid/acid.service";

@Component({
  templateUrl: 'build/pages/sample/sample.html',
  directives: [REACTIVE_FORM_DIRECTIVES],
  providers: [
    ProjectService,
    SiteService,
    BottleService,
    MediumService,
    AnalysisService,
    FilterService,
    PreservationService,
    AcidService
  ]
})
export class SamplePage {
  cooperator_ID: number = 20000166;
  project_ID: number = 6104;
  active: Boolean = true;
  private _errorMessage: string;
  private _defaultRowCount: number = 8;

  mySample: Sample;
  mySampleBottles: SampleBottle[];
  myProjects: Project[];
  mySites: Site[];
  myBottles: Bottle[];
  myMediums: Medium[];
  myAnalyses: Analysis[];
  myFilters: Filter[];
  myPreservations: Preservation[];
  myAcids: Acid[];

  sampleForm: FormGroup;
  sampleHeaderControls: FormGroup;
  sampleBottleControls: FormArray = new FormArray([]);
  sampleCommentControls: FormGroup;

  constructor(navCtrl: NavController,
              fb: FormBuilder,
              private _projectService: ProjectService,
              private _siteService: SiteService,
              private _bottleService: BottleService,
              private _mediumService: MediumService,
              private _analysisService: AnalysisService,
              private _filterService: FilterService,
              private _preservationService: PreservationService,
              private _acidService: AcidService
  ) {
    sessionStorage.setItem('username', 'admin');
    sessionStorage.setItem('password', 'm3rcury@dm1n');

    this.sampleHeaderControls = new FormGroup({
      projectName: new FormControl(null),
      projectNumber: new FormControl(null),
      siteName: new FormControl(null),
      siteNumber: new FormControl(null),
      sampleDate: new FormControl(null),
      sampleTime: new FormControl(null),
      sampleDepth: new FormControl(null),
      sampleRep: new FormControl(null)
    });

    this.sampleCommentControls = new FormGroup({
      sampleComment: new FormControl(null)
    });

    this.sampleForm = fb.group({
      sampleHeaderControls: this.sampleHeaderControls,
      sampleBottleControls: this.sampleBottleControls,
      sampleCommentControls: this.sampleCommentControls
    });

    for (let i = 0, j = this._defaultRowCount; i < j; i++){
      this.addRow();
    }

    this._getProjects();
    this._getSites(this.project_ID);
    this._getBottles();
    this._getMediums();
    this._getAnalyses();
    this._getFilters();
    this._getPreservations();
    this._getAcids();

  }

  private _getProjects() {
    this._projectService.getProjects()
      .subscribe(
        response => {
          this.myProjects = response;
        },
        error => this._errorMessage = <any>error);
  }

  private _getSites(projectID: number | string) {
    this._siteService.getSites(new URLSearchParams('project='+projectID))
      .subscribe(
        response => {
          this.mySites = response;
        },
        error => this._errorMessage = <any>error);
  }

  private _getBottles() {
    this._bottleService.getBottles(new URLSearchParams('unused=true'))
      .subscribe(
        response => {
          this.myBottles = response;
        },
        error => this._errorMessage = <any>error);
  }

  private _getMediums() {
    this._mediumService.getMediums()
      .subscribe(
        response => {
          this.myMediums = response;
        },
        error => this._errorMessage = <any>error);
  }

  private _getAnalyses() {
    this._analysisService.getAnalyses()
      .subscribe(
        response => {
          this.myAnalyses = response;
        },
        error => this._errorMessage = <any>error);
  }

  private _getFilters() {
    this._filterService.getFilters()
      .subscribe(
        response => {
          this.myFilters = response;
        },
        error => this._errorMessage = <any>error);
  }

  private _getPreservations() {
    this._preservationService.getPreservations()
      .subscribe(
        response => {
          this.myPreservations = response
        },
        error => this._errorMessage = <any>error);
  }

  private _getAcids() {
    this._acidService.getAcids()
      .subscribe(
        response => {
          this.myAcids = response;
        },
        error => this._errorMessage = <any>error);
  }

  addRow(){
    this.sampleBottleControls.push(
      new FormGroup({
        bottle: new FormControl(null),
        medium: new FormControl(null),
        analysis: new FormControl(null),
        filterType: new FormControl(null),
        filterVolume: new FormControl(null),
        preservationType: new FormControl(null),
        preservationAcid: new FormControl(null),
        preservationVolume: new FormControl(null)
      })
    );
  }

  removeRow(row) {
    let sampleBottleControlRows = this.sampleBottleControls.controls;
    for(let i = 0, j = sampleBottleControlRows.length; i < j; i++) {
      if(sampleBottleControlRows[i] == row) {
        sampleBottleControlRows.splice(i, 1);
        break;
      }
    }
  }

  onSubmit(formValue){
    alert("Submitted!");
    console.log(formValue);
  }

}
