import {Component} from '@angular/core';
import {URLSearchParams}   from '@angular/http';
import {REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, FormArray, FormBuilder} from "@angular/forms";
import {NavController, NavParams} from 'ionic-angular';
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
import {SampleService} from "../../sample/sample.service";
import {SampleBottleService} from "../../samplebottle/samplebottle.service";

@Component({
  templateUrl: 'build/pages/samples/sample-detail.html',
  directives: [REACTIVE_FORM_DIRECTIVES],
  providers: [
    SampleService,
    SampleBottleService,
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
export class SampleDetailPage {
  cooperator_ID: number = 20000166;
  project_ID: number = 6104;
  sample_ID: number;
  active: Boolean = true;
  notready: Boolean = true;
  private _errorMessage: string;
  private _defaultRowCount: number = 8;
  private _numRowsAdded: number = 0;
  private _numSampleBottles: number;

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
  projectName: FormControl = new FormControl(null);
  projectNumber: FormControl = new FormControl(null);
  siteName: FormControl = new FormControl(null);
  siteNumber: FormControl = new FormControl(null);
  sampleDate: FormControl = new FormControl(null);
  sampleTime: FormControl = new FormControl(null);
  sampleDepth: FormControl = new FormControl(null);
  sampleRep: FormControl = new FormControl(null);
  sampleComment: FormControl = new FormControl(null);

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fb: FormBuilder,
              private _sampleService: SampleService,
              private _samplebottleService: SampleBottleService,
              private _projectService: ProjectService,
              private _siteService: SiteService,
              private _bottleService: BottleService,
              private _mediumService: MediumService,
              private _analysisService: AnalysisService,
              private _filterService: FilterService,
              private _preservationService: PreservationService,
              private _acidService: AcidService
  ) {

    this._getProjects();
    //this._getSites(this.project_ID);
    this._getBottles();
    this._getMediums();
    this._getAnalyses();
    this._getFilters();
    this._getPreservations();
    this._getAcids();

    // If we navigated to this page, we will have an item available as a nav param
    this.sample_ID = this.navParams.get('sample');
    // TODO: figure out how to handle template selected logic with no (empty new) sample

    this.sampleHeaderControls = new FormGroup({
      projectName: this.projectName,
      projectNumber: this.projectNumber,
      siteName: this.siteName,
      siteNumber: this.siteNumber,
      sampleDate: this.sampleDate,
      sampleTime: this.sampleTime,
      sampleDepth: this.sampleDepth,
      sampleRep: this.sampleRep
    });

    this.sampleCommentControls = new FormGroup({
      sampleComment: this.sampleComment
    });

    this.sampleForm = fb.group({
      sampleHeaderControls: this.sampleHeaderControls,
      sampleBottleControls: this.sampleBottleControls,
      sampleCommentControls: this.sampleCommentControls
    });

    if (this.sample_ID) {
      this._getSample(this.sample_ID);
    }
    else {
      for (let i = 0, j = this._defaultRowCount; i < j; i++){
        this.addRow();
      }
      this.notready = false;
    }

  }

  private _getSample(sampleID: number){
    this._sampleService.getSample(sampleID)
      .then(
        response => {
          this.mySample = response;
          this._getSites(response['projectNumber']);
          this.sampleDate.updateValue(response['date']);
          this.sampleTime.updateValue(response['time']);
          this.sampleDepth.updateValue(response['depth']);
          this.sampleRep.updateValue(response['replicate']);
          this.sampleComment.updateValue(response['comment']);
          if (response['sample_bottles'].length > 0) {
            this._numSampleBottles = response['sample_bottles'].length;
            this._getSampleBottles(sampleID);
          }
          else {
            this.notready = false;
          }
        },
        error => this._errorMessage = <any>error);
  }

  private _getSampleBottles(sampleID){
    this._samplebottleService.getSampleBottles(new URLSearchParams('sample='+sampleID))
      .then(
        response => {
          this.mySampleBottles = response;
          for (let i = 0, j = this.mySampleBottles.length; i < j; i++){
            this.addRow(this.mySampleBottles[i]);
          }
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

  private _getSites(projectID: number | string) {
    this._siteService.getSites(new URLSearchParams('project='+projectID))
      .subscribe(
        response => {
          this.mySites = response.results;
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
          // TODO: figure out how to handle paginated response
        },
        error => this._errorMessage = <any>error);
  }

  addRow(samplebottle?){
    if(samplebottle) {
      this.sampleBottleControls.push(
        new FormGroup({
          bottle: new FormControl(samplebottle['bottle'] ? samplebottle['bottle'] : null),
          medium: new FormControl(null),
          //medium: new FormControl(this.mySample['medium'] ? this.mySample['medium'] : null),
          // TODO: figure out how to properly handle mediums
          analysis: new FormControl(samplebottle['analysis_type'] ? samplebottle['analysis_type'] : null),
          filterType: new FormControl(samplebottle['filter_type'] ? samplebottle['filter_type'] : null),
          filterVolume: new FormControl(samplebottle['volume_filtered'] ? samplebottle['volume_filtered'] : null),
          preservationType: new FormControl(samplebottle['preservation_type'] ? samplebottle['preservation_type'] : null),
          preservationAcid: new FormControl(samplebottle['preservation_acid'] ? samplebottle['preservation_acid'] : null),
          preservationVolume: new FormControl(samplebottle['preservation_volume'] ? samplebottle['preservation_volume'] : null)
        })
      );
      this._numRowsAdded++;
      if (this._numRowsAdded == this._numSampleBottles) {
        this.notready = false;
      }
    }
    else {
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
