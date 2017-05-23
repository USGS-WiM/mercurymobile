import {Component} from '@angular/core';
import {FormControl, FormGroup, FormArray, FormBuilder} from "@angular/forms";
import {ModalController, NavController, NavParams} from 'ionic-angular';
import {Project} from '../../app/project/project';
import {Site} from '../../app/site/site';
import {Sample} from '../../app/sample/sample';
import {SampleBottle} from '../../app/samplebottle/samplebottle';
import {Medium} from "../../app/medium/medium";
import {ProjectService} from '../../app/project/project.service';
import {SiteService} from '../../app/site/site.service';
import {MediumService} from "../../app/medium/medium.service";
import {SampleService} from "../../app/sample/sample.service";
import {SampleBottleService} from "../../app/samplebottle/samplebottle.service";
import {AcidService} from "../../app/acid/acid.service";
import {BottleService} from "../../app/bottle/bottle.service";
import {BottleSelectPage} from './bottle-select';
import {AcidSelectPage} from './acid-select';
import {SampleBottlePage} from './sample-bottle';
import {SampleListPage} from './sample-list';
import {APP_UTILITIES}   from '../../app/app.utilities';


@Component({
  templateUrl: 'sample-detail.html',
  styles: ['.select-wide {max-width: 100%;}']
})
export class SampleDetailPage {
  sample_ID: number;
  active: Boolean = true;
  notready: Boolean = true;
  private _errorMessage: string;
  private _defaultRowCount: number = 8;
  private _numRowsAdded: number = 0;
  private _numSampleBottles: number = 0;

  mySample: Sample = new Sample(null, null, null, null, null, null, null, null, null, null, null, null, null);
  mySampleBottles: SampleBottle[] = [];
  myProjects: Project[] = [];
  mySites: Site[] = [];
  myMediums: Medium[] = [];

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
              private _mediumService: MediumService,
              private _acidService: AcidService,
              private _bottleService: BottleService
  ) {

    this._getProjects();
    this._getMediums();

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
        this.mySample = new Sample('', 0, '', 0, null, null, 0, 0, 0, [], '');
        let id = Date.now() % 10000000000;
        this.mySample['id'] = id;
        this.mySample['_id'] = id.toString();
        this.sample_ID = id;
        console.log(this.mySample);
        this._sampleService.update(this.mySample).then(response => {
            console.log(response);
            for (let i = 0, j = this._defaultRowCount; i < j; i++){
                this.addRow();
            }
            this.notready = false;
        });
    }

  }

  private _getSample(sampleID: number){
    let self = this;
    this._sampleService.getSampleByID(sampleID.toString())
      .then(
        response => {
          self.mySample = response.rows[0].doc;
          if (self.mySample['projectName']) {
              this._getSites(self.mySample['projectName']);
          }
          this.sampleDate.setValue(self.mySample['date']);
          this.sampleTime.setValue(self.mySample['time']);
          this.sampleDepth.setValue(self.mySample['depth']);
          this.sampleRep.setValue(self.mySample['replicate']);
          this.sampleMedium.setValue(self.mySample['medium']);
          this.sampleComment.setValue(self.mySample['comment']);
          if (self.mySample['sample_bottles'] && self.mySample['sample_bottles'].length > 0) {
            this._numSampleBottles = self.mySample['sample_bottles'].length;
            this._getSampleBottles(self.mySample['sample_bottles']);
          }
          else {
              self.mySample['sample_bottles'] = [];
              for (let i = 0, j = this._defaultRowCount; i < j; i++){
                this.addRow();
              }
              this.notready = false;
          }
        },
        error => this._errorMessage = <any>error)
        .catch(err => console.log(err));
  }

  private _getSampleBottles(sampBottles: any){
      for (let i = 0, j = sampBottles.length; i < j; i++) {
          this._samplebottleService.getOne(sampBottles[i]['_id']).then(response => {
              let samplebottle = response;
              this.mySampleBottles.push(samplebottle);
              let acid = samplebottle['preservation_acid'];
              if (acid) {
                this._getAcid(acid);
              }
              this.addRow(samplebottle);
          });
      }
      this.notready = false;
    // this._samplebottleService.getSampleBottles(new URLSearchParams('sample='+sampleID))
    //   .then(
    //     response => {
    //       this.mySampleBottles = response;
    //       for (let i = 0, j = this.mySampleBottles.length; i < j; i++){
    //         // if (!this.sampleAcid.value) {
    //         //   let acid = this.mySampleBottles[i]['preservation_acid'];
    //         //   if (acid) {
    //         //     let acids = response.filter(function (a) {return a['id'] == acid;});
    //         //     let acidcode = acids[0]['code'];
    //         //     this.sampleAcid.setValue(acidcode);
    //         //     break;
    //         //   }
    //         // }
    //         let acid = this.mySampleBottles[i]['preservation_acid'];
    //         if (acid) {
    //           this._getAcid(acid);
    //           break;
    //         }
    //         this.addRow(this.mySampleBottles[i]);
    //       }
    //     },
    //     error => this._errorMessage = <any>error);
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

  private _getSites(projectName: any) {
    this._projectService.getProjectByName(projectName)
      .then(response =>
      {
        let sites = response.rows[0].doc['sites'];
        for(let i =0; i < sites.length; i++) {
          let sitedata = sites[i];
          let newsite = new Site("temp");
          newsite['name'] = sitedata.name;
          newsite['usgs_scode'] = sitedata.usgs_scode;
          newsite['id'] = sitedata.id;
          this.mySites.push(newsite);
        }
      }, error => {
        this._errorMessage = <any>error;
      });
  }

  private _getMediums() {
    this._mediumService.getAll()
      .then(response =>
      {
        for(let i =0; i < response.rows.length; i++) {
          this.myMediums.push(response.rows[i].doc);
        }
      }, error => {
        this._errorMessage = <any>error;
      });
  }

  private _getAcid(acidID: number) {
    this._acidService.findAcid(acidID)
      .then(
        response => {
          let acids = response.filter(function (a) {
            return a['id'] == acidID;
          });
          this.sampleAcid.setValue(acids[0]['code']);
        }, error => {
        this._errorMessage = <any>error;
      });
  }

  private _addSampleBottle(bottleName: string) {
      this._bottleService.getBottlesByName(bottleName).then(response => {
          let bottleID = response.rows[0]['id'];
          let bottle = new SampleBottle(this.sample_ID, bottleID, null, null, null, null, null, null, null, bottleName, bottleID);
          this.mySampleBottles.push(bottle);
          // include the PouchDB internal ID for quick retrieval
          bottle['_id'] = bottleID;
          this._samplebottleService.update(bottle).then(response => {
              console.log(response);
              console.log(this.mySampleBottles);
          });
      });
  }

  // private _updateSampleBottle() {
  //
  // }

  openBottleSelect(rowIndex: number) {
    let opts = {showBackdrop: false, enableBackdropDismiss: false};
    let modal = this.modalCtrl.create(BottleSelectPage, {}, opts);
    modal.onDidDismiss(data => {
        if (data) {
            (<FormGroup>this.sampleBottleControls.controls[rowIndex]).controls['bottle'].setValue(data);
            this._addSampleBottle(data);
        }
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
    console.log(this.mySampleBottles);
    let sbName = (<FormGroup>this.sampleBottleControls.controls[rowIndex]).controls['bottle'].value;
    console.log(sbName);
    if (sbName == null) {alert("Please select a bottle first!")}
    else {
        console.log(this.mySampleBottles);
        // let samplebottles = this.mySampleBottles.filter(function (sb) {
        //     console.log(sb);
        //     return sb['bottle_string'] == sbName;
        // });
        this._bottleService.getBottlesByName(sbName).then(response => {
            console.log(response.rows[0]['id']);
            this.openPage(response.rows[0]['id']);
        });
        // console.log(samplebottles);
        // if (samplebottles.length > 0) {
        //     this.openPage(samplebottles[0]['bottle']);
        // }
        // else {this.openPage(null);}
    }
  }

  openPage(sample_bottle_id) {
      this.navCtrl.push(SampleBottlePage, {
          samplebottle: sample_bottle_id
      });
  }

  projectNameChange(projectName: String) {
    let projects = this.myProjects.filter(function(project: Project) {return project['name'] == projectName});
    this.projectNumber.setValue(projects[0]['id']);
    this.mySample['projectName'] = projects[0]['name'];
    this.mySample['projectNumber'] = projects[0]['id'];
    //this._getSites(projects[0]['sites']);
    this.mySites = projects[0]['sites'];
  }

  projectNumberChange(projectNumber: number) {
    let projects = this.myProjects.filter(function(project: Project) {return project['id'] == projectNumber});
    this.projectName.setValue(projects[0]['id']);
    this.mySample['projectName'] = projects[0]['name'];
    this.mySample['projectNumber'] = projects[0]['id'];
    //this._getSites(projects[0]['sites']);
    this.mySites = projects[0]['sites'];
  }

  siteNameChange(siteName: string) {
    let sites = this.mySites.filter(function(site: Site) {return site['name'] == siteName});
    this.siteNumber.setValue(sites[0]['id']);
    this.mySample['siteName'] = sites[0]['name'];
    this.mySample['siteNumber'] = sites[0]['id'];
  }

  siteNumberChange(siteNumber: number) {
    let sites = this.mySites.filter(function(site: Site) {return site['id'] == siteNumber});
    this.siteName.setValue(sites[0]['id']);
    this.mySample['siteName'] = sites[0]['name'];
    this.mySample['siteNumber'] = sites[0]['id'];
  }

  addRow(samplebottle?: SampleBottle){
    if(samplebottle) {
      this.sampleBottleControls.push(
        new FormGroup({
          bottle: new FormControl(samplebottle['bottle_string'] ? samplebottle['bottle_string'] : samplebottle['_id'] ? samplebottle['_id'] : null)
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
        let sampleBottleID = (<FormGroup>this.sampleBottleControls.controls[i]).controls['bottle'].value;
        if (sampleBottleID == null) {
          sampleBottleControlRows.splice(i, 1);
        }
        else {
          this._samplebottleService.getOne(sampleBottleID).then(response => {
              this._samplebottleService.delete(response).then(response => {
                sampleBottleControlRows.splice(i, 1);
              });
          });
        }
        break;
      }
    }
  }

  onSubmit(formValue){
    // TODO: build proper onSubmit function, including validations (especially assigning acid to samplebottles)
    this.mySample['date'] = formValue.sampleHeaderControls.sampleDate;
    this.mySample['time'] = formValue.sampleHeaderControls.sampleTime;
    this.mySample['depth'] = formValue.sampleHeaderControls.sampleDepth;
    this.mySample['replicate'] = formValue.sampleHeaderControls.sampleRep;
    this.mySample['medium'] = formValue.sampleHeaderControls.sampleMedium;
    this.mySample['sample_bottles'] = this.mySampleBottles;
    this.mySample['comment'] = formValue.sampleCommentControls.sampleComment;
    // update the sample
    this._sampleService.update(this.mySample).then(result => {
        console.log(result);
        let acid = formValue.acid;
        for (let i = 0, j = this.mySampleBottles.length; i < j; i++) {
            // update samplebottles with acid
            console.log(this.mySampleBottles[i]);
            this.mySampleBottles[i]['preservation_acid'] = acid;
            this._samplebottleService.update(this.mySampleBottles[i]).then(response => {console.log(response);});
        }
        this.navCtrl.push(SampleListPage);
    })
  }

  deleteSample() {
      this._sampleService.delete(this.mySample['id']).then(response => {
          console.log("sample deleted");
          console.log(response);
          this.navCtrl.push(SampleListPage);
      });
  }

}
