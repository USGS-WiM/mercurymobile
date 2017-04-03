import {Component} from '@angular/core';
import {URLSearchParams}   from '@angular/http';
import {FormControl, FormGroup, FormArray, FormBuilder} from "@angular/forms";
import {ModalController, NavController, NavParams} from 'ionic-angular';
import {Project} from '../../app/project/project';
import {Site} from '../../app/site/site';
import {Sample} from '../../app/sample/sample';
import {SampleBottle} from '../../app/samplebottle/samplebottle';
import {Bottle} from "../../app/bottle/bottle";
import {Medium} from "../../app/medium/medium";
import {Acid} from "../../app/acid/acid";
import {ProjectService} from '../../app/project/project.service';
import {SiteService} from '../../app/site/site.service';
import {BottleService} from "../../app/bottle/bottle.service";
import {MediumService} from "../../app/medium/medium.service";
import {SampleService} from "../../app/sample/sample.service";
import {SampleBottleService} from "../../app/samplebottle/samplebottle.service";
import {AcidService} from "../../app/acid/acid.service";
import {BottleSelectPage} from './bottle-select';
import {AcidSelectPage} from './acid-select';
import {SampleBottlePage} from './sample-bottle';
import {APP_UTILITIES}   from '../../app/app.utilities';

@Component({
  templateUrl: 'sample-detail.html',
  providers: [
    SampleService,
    SampleBottleService,
    ProjectService,
    SiteService,
    BottleService,
    MediumService,
    AcidService
  ],
  styles: ['.select-wide {max-width: 100%;}']
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

  mySample: Sample = new Sample(null, null, null, null, null, null, null, null, null, null, null, null, null);
  mySampleBottles: SampleBottle[];
  myProjects: Project[];
  mySites: Site[];
  myBottles: Bottle[];
  myMediums: Medium[];
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
  sampleMedium: FormControl = new FormControl(null);
  sampleAcid: FormControl = new FormControl(null);
  sampleComment: FormControl = new FormControl(null);

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public fb: FormBuilder,
              private _sampleService: SampleService,
              private _samplebottleService: SampleBottleService,
              private _projectService: ProjectService,
              private _siteService: SiteService,
              private _bottleService: BottleService,
              private _mediumService: MediumService,
              private _acidService: AcidService
  ) {

    this._getProjects();
    //this._getSites(this.project_ID);
    //this._getBottles();
    this._getMediums();
    this._getAcids();

    this.sampleHeaderControls = new FormGroup({
      projectName: this.projectName,
      projectNumber: this.projectNumber,
      siteName: this.siteName,
      siteNumber: this.siteNumber,
      sampleDate: this.sampleDate,
      sampleTime: this.sampleTime,
      sampleDepth: this.sampleDepth,
      sampleRep: this.sampleRep,
      sampleMedium: this.sampleMedium,
      sampleAcid: this.sampleAcid
    });

    this.sampleCommentControls = new FormGroup({
      sampleComment: this.sampleComment
    });

    this.sampleForm = fb.group({
      sampleHeaderControls: this.sampleHeaderControls,
      sampleBottleControls: this.sampleBottleControls,
      sampleCommentControls: this.sampleCommentControls
    });

    // If we navigated to this page, we will have an item available as a nav param
    this.sample_ID = this.navParams.get('sample');

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
          this.sampleDate.setValue(response['date']);
          this.sampleTime.setValue(response['time']);
          this.sampleDepth.setValue(response['depth']);
          this.sampleRep.setValue(response['replicate']);
          this.sampleMedium.setValue(response['medium']);
          this.sampleComment.setValue(response['comment']);
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

  private _getSampleBottles(sampleID: number | string){
    this._samplebottleService.getSampleBottles(new URLSearchParams('sample='+sampleID))
      .then(
        response => {
          this.mySampleBottles = response;
          for (let i = 0, j = this.mySampleBottles.length; i < j; i++){
            // if (!this.sampleAcid.value) {
            //   let acid = this.mySampleBottles[i]['preservation_acid'];
            //   if (acid) {
            //     let acids = response.filter(function (a) {return a['id'] == acid;});
            //     let acidcode = acids[0]['code'];
            //     this.sampleAcid.setValue(acidcode);
            //     break;
            //   }
            // }
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

  // private _getBottles() {
  //   this._bottleService.getBottles(new URLSearchParams('unused=true&page_size=100'))
  //     .subscribe(
  //       response => {
  //         this.myBottles = response;
  //         alert(this.myBottles.length);
  //         //this._buildBottleOptions();
  //       },
  //       error => this._errorMessage = <any>error);
  // }

  private _getMediums() {
    this._mediumService.getMediums()
      .subscribe(
        response => {
          this.myMediums = response;
        },
        error => this._errorMessage = <any>error);
  }

  private _getAcids() {
    this._acidService.getAllAcids(/*new URLSearchParams('page_size=all')*/)
      .then(
        response => {
          this.myAcids = response;
          if (!this.sampleAcid.value) {
            if (this.mySampleBottles.length > 0) {
              for (let i = 0, j = this.mySampleBottles.length; i < j; i++) {
                let acid = this.mySampleBottles[i]['preservation_acid'];
                if (acid) {
                  let acids = response.filter(function (a) {
                    return a['id'] == acid;
                  });
                  let acidcode = acids[0]['code'];
                  this.sampleAcid.setValue(acidcode);
                  break;
                }
              }
            }
          }
        })
        .catch(function(error) {this._errorMessage = <any>error});
  }

  openBottleSelect(rowIndex: number) {
    let opts = {showBackdrop: false, enableBackdropDismiss: false};
    let modal = this.modalCtrl.create(BottleSelectPage, {}, opts);
    modal.onDidDismiss(data => {
      (<FormGroup>this.sampleBottleControls.controls[rowIndex]).controls['bottle'].setValue(data);
    });
    modal.present();
  }

  openAcidSelect() {
    let opts = {showBackdrop: false, enableBackdropDismiss: false};
    let modal = this.modalCtrl.create(AcidSelectPage, {}, opts);
    modal.onDidDismiss(data => {
      (<FormGroup>this.sampleHeaderControls).controls['sampleAcid'].setValue(data);
    });
    modal.present();
  }

  editSampleBottle(rowIndex: number){
    let sbName = (<FormGroup>this.sampleBottleControls.controls[rowIndex]).controls['bottle'].value;
    let samplebottles = this.mySampleBottles.filter(function (sb) {return sb['bottle_string'] == sbName;});
    let sbID = samplebottles[0]['bottle'];
    this.openPage(sbID);
  }

  openPage(sample_bottle_id) {
    this.navCtrl.push(SampleBottlePage, {
      samplebottle: sample_bottle_id
    });
  }

  projectNameChange(projectName: String) {
    let projects = this.myProjects.filter(function(project: Project) {return project['name'] == projectName});
    let projectID = projects[0]['id'];
    this.projectNumber.setValue(projectID);
    this._getSites(projectID);
  }

  projectNumberChange(projectNumber: number) {
    let projects = this.myProjects.filter(function(project: Project) {return project['id'] == projectNumber});
    let projectID = projects[0]['id'];
    this.projectName.setValue(projectID);
    this._getSites(projectID);
  }

  siteNameChange(siteName: number) {
    let sites = this.mySites.filter(function(site: Site) {return site['name'] == siteName});
    let siteID = sites[0]['id'];
    this.siteNumber.setValue(siteID);
  }

  siteNumberChange(siteNumber: number) {
    let sites = this.mySites.filter(function(site: Site) {return site['id'] == siteNumber});
    let siteID = sites[0]['id'];
    this.siteName.setValue(siteID);
  }

  addRow(samplebottle?: SampleBottle){
    if(samplebottle) {
      this.sampleBottleControls.push(
        new FormGroup({
          bottle: new FormControl(samplebottle['bottle_string'] ? samplebottle['bottle_string'] : null)
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
          bottle: new FormControl(null)
        })
      );
    }

  }

  removeRow(sampleBottleControlsRow: FormGroup) {
    let sampleBottleControlRows = this.sampleBottleControls.controls;
    for(let i = 0, j = sampleBottleControlRows.length; i < j; i++) {
      if(sampleBottleControlRows[i] == sampleBottleControlsRow) {
        sampleBottleControlRows.splice(i, 1);
        break;
      }
    }
  }

  onSubmit(formValue){
    // TODO: build proper onSubmit function, including validations (especially grabbing medium from samplebottles)
    alert("Submitted!");
    console.log(formValue);
  }

  dumpDB(){
    let filename = this.mySample['projectName'].replace(/\s/g,'') + "_" + this.mySample['siteName'].replace(/\s/g,'') + "_" + APP_UTILITIES.TODAY + ".txt";
    this._sampleService.dumpDB(filename);
  }

}
