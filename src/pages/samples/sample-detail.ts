import {Component} from '@angular/core';
import {FormControl, FormGroup, FormArray, FormBuilder} from "@angular/forms";
import {ModalController, NavController, NavParams, AlertController} from 'ionic-angular';
import {Project} from '../../app/project/project';
import {Site} from '../../app/site/site';
import {Sample} from '../../app/sample/sample';
import {SampleBottle} from '../../app/samplebottle/samplebottle';
import {Medium} from "../../app/medium/medium";
import {ProjectService} from '../../app/project/project.service';
// import {SiteService} from '../../app/site/site.service';
import {MediumService} from "../../app/medium/medium.service";
import {SampleService} from "../../app/sample/sample.service";
import {SampleBottleService} from "../../app/samplebottle/samplebottle.service";
import {AcidService} from "../../app/acid/acid.service";
import {BottleService} from "../../app/bottle/bottle.service";
import {BottleSelectPage} from './bottle-select';
import {AcidSelectPage} from './acid-select';
import {SampleBottlePage} from './sample-bottle';


@Component({
  templateUrl: 'sample-detail.html',
  styles: ['.select-wide {max-width: 100%;}']
})
export class SampleDetailPage {
  sample_ID: number;
  clone = false;
  active = true;
  notready = true;
  lookupContainers = false;
  private _errorMessage: string;
  private _defaultRowCount: number = 8;
  private _numRowsAdded: number = 0;
  private _numSampleBottles: number = 0;
  private _selectedAcid: number;

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
              public alertCtrl: AlertController,
              public modalCtrl: ModalController,
              public fb: FormBuilder,
              private _sampleService: SampleService,
              private _samplebottleService: SampleBottleService,
              private _projectService: ProjectService,
              // private _siteService: SiteService,
              private _mediumService: MediumService,
              private _acidService: AcidService,
              private _bottleService: BottleService
  ) {

    //moved these two down to _getSample to avoid race condition
    //this._getProjects();
    //this._getMediums();

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
    this.clone = this.navParams.get('clone');

    // if the sample exists retrieve its data, otherwise set up a new empty sample
    if (this.sample_ID) {
      this._getSample(this.sample_ID, this.clone);
    } else {
        this._getProjects();
        this._getMediums();
        // this a new sample, so set all values to empty of equivalent
        this.mySample = new Sample('', 0, '', 0, null, null, 0, 0, 0, [], '');
        // force setting of depth and rep input fields to zero
        this.sampleDepth.setValue('0');
        this.sampleRep.setValue('0');
        // set sample id to some random unique number
        let id = Date.now() % 10000000000;
        this.mySample['id'] = id;
        this.mySample['_id'] = id.toString();
        this.sample_ID = id;
        // save this new sample, and add empty sample bottle slots
        this._sampleService.update(this.mySample).then(response => {
            for (let i = 0, j = this._defaultRowCount; i < j; i++){
                this.addRow();
            }
            this.notready = false;
        });
    }

  }

  toggleLookupContainers() {
    this.lookupContainers = !this.lookupContainers;
  }

  private _getSample(sampleID: number, clone: boolean){
    let self = this;
    this._sampleService.getSampleByID(sampleID.toString())
      .then(
        response => {
          const sample = response.rows[0].doc;
          this._getMediums();

          // if this is a clone, set common values and empty remaining values and assign new ID
          if (clone) {
            // if the source sample used acid, grab that acid value
            if (sample['sample_bottles'] && sample['sample_bottles'].length > 0) {
              this._getSampleBottles(sample['sample_bottles']);
            }
            // create a new new sample with cloned values from source sample
            // this.mySample = new Sample(sample['projectName'], sample['projectNumber'], sample['siteName'], sample['siteNumber'], sample['date'], null, 0, 0, sample['medium'], [], '');
            this.mySample['projectName'] = sample['projectName'];
            this.mySample['projectNumber'] = sample['projectNumber'];
            this.mySample['siteName'] = sample['siteName'];
            this.mySample['siteNumber'] = sample['siteNumber'];
            this.mySample['date'] = sample['date'];
            this.mySample['medium'] = sample['medium'];
            // set new sample id to some random unique number
            let id = Date.now() % 10000000000;
            this.mySample['id'] = id;
            this.mySample['_id'] = id.toString();
            this.sample_ID = id;
            // save this new cloned sample, and add empty sample bottle slots
            this._sampleService.update(this.mySample).then(response => console.log(response), error => console.log(error));
          } else {
            this.mySample = sample;
          }

          if (this.mySample['projectName']) {
            this._getProjects(this.mySample['projectName']);
            this._getSites(this.mySample['projectName']);
          } else {
            this._getProjects();
          }
          this.sampleDate.setValue(this.mySample['date']);
          this.sampleMedium.setValue(this.mySample['medium']);
          this.sampleComment.setValue(this.mySample['comment']);
          this.sampleTime.setValue(this._timeToText(this.mySample['time']));
          this.sampleDepth.setValue(this.mySample['depth']);
          this.sampleRep.setValue(this.mySample['replicate']);
          if (this.mySample['sample_bottles'] && this.mySample['sample_bottles'].length > 0) {
            this._numSampleBottles = this.mySample['sample_bottles'].length;
            this._getSampleBottles(this.mySample['sample_bottles']);
            this.notready = false;
          } else {
              this.mySample['sample_bottles'] = [];
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
              // if this sample is not a clone, populate the sample bottle list
              if (!this.clone) {
                this.mySampleBottles.push(samplebottle);
                this.addRow(samplebottle);
              }
              // populate the sample's acid field if any of the sample bottles have used an acid
              let acid = samplebottle['preservation_acid'];
              if (acid && !this._selectedAcid) {
                this._selectedAcid = acid;
                this._getAcidName(this._selectedAcid);
              }
          });
      }
      
      if (this.clone) {
        this.mySample['sample_bottles'].length = 0;
      }
      this.notready = false;
  }

  private _getProjects(projectName?: any) {
    this._projectService.getAll()
      .then(response =>
      {
        for(let i =0; i < response.rows.length; i++) {
          this.myProjects.push(response.rows[i].doc);
        }
        // if there is only one project, automatically select it and filter the sites
        if (this.myProjects.length == 1) {
          let proj = this.myProjects[0];
          this.projectName.setValue(proj['id']);
          this.projectNumber.setValue(proj['id']);
          this.mySample['projectName'] = proj['name'];
          this.mySample['projectNumber'] = proj['id'];
          this.mySites = proj['sites'];
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

  private _getAcidName(acidID: number) {
    this._acidService.findAcid(acidID)
      .then(
        response => {
          this.sampleAcid.setValue(response[0].code);
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
          this._samplebottleService.update(bottle);
      });
  }

  // TODO: fix time so it appears in HTML field, seems to be setting to '00:00:00' every time
  private _timeToText(time: string) {
    return time? time.substring(0, 5) : ''
  }

  private _textToTime(text: string) {
    if (text && text.length === 3) {
      return text.slice(0, 1) + ':' + text.slice(1, 3) + ':00';
    }
    else if (text && text.length === 4) {
      return text.slice(0, 2) + ':' + text.slice(2, 4) + ':00';
    }
    else {
      return '00:00:00';
    }
  }

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
      this._acidService.getAcidsByName(data).then(response => {
        this._selectedAcid = response.rows[0].doc.id;
      });
    });
    modal.present();
  }

  editSampleBottle(rowIndex: number){
    let sbName = (<FormGroup>this.sampleBottleControls.controls[rowIndex]).controls['bottle'].value;
    if (sbName == null) {alert("Please select a bottle first!")}
    else {
        this._bottleService.getBottlesByName(sbName).then(response => {
            this.openPage(response.rows[0]['id']);
        });
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
    this.mySites = projects[0]['sites'];
  }

  projectNumberChange(projectNumber: number) {
    let projects = this.myProjects.filter(function(project: Project) {return project['id'] == projectNumber});
    this.projectName.setValue(projects[0]['id']);
    this.mySample['projectName'] = projects[0]['name'];
    this.mySample['projectNumber'] = projects[0]['id'];
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

  mediumChange(mName: string) {
    let mediums = this.myMediums.filter(function(medium: Medium) {return medium['nwis_code'] == mName});
    this.mySample['medium'] = mediums[0]['id'];
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
                this.mySampleBottles.splice(i, 1);
              });
          });
        }
        break;
      }
    }
  }

  onSubmit(formValue){
    let self = this;
    // TODO: build proper onSubmit function, including validations (especially assigning acid to samplebottles)
    this.mySample['date'] = formValue.sampleHeaderControls.sampleDate;
    this.mySample['time'] = this._textToTime(formValue.sampleHeaderControls.sampleTime);
    this.mySample['depth'] = formValue.sampleHeaderControls.sampleDepth;
    this.mySample['replicate'] = formValue.sampleHeaderControls.sampleRep;
    this.mySample['sample_bottles'] = this.mySampleBottles;
    this.mySample['comment'] = formValue.sampleCommentControls.sampleComment;
    // update the sample
    this._sampleService.getOne(this.mySample['_id']).then(response => {
      this.mySample['_rev'] = response['_rev'];
      this._sampleService.update(this.mySample).then(result => {
        // for (let i = 0, j = this.mySampleBottles.length; i < j; i++) {
        //     // update samplebottles with acid
        //     this._samplebottleService.getOne(this.mySampleBottles[i]['_id']).then(response => {
        //       console.log(response);
        //       return this._samplebottleService.update({
        //         '_id': response['_id'],
        //         '_rev': response['_rev'],
        //         'analysis_type': response['analysis_type'],
        //         'filter_type': response['filter_type'],
        //         'volume_filtered': response['volume_filtered'],
        //         'preservation_type': response['preservation_type'],
        //         'preservation_volume': response['preservation_volume'],
        //         'preservation_comment': response['preservation_comment'],
        //         'preservation_acid': self._selectedAcid
        //       });
        //     });
        // }
        this.navCtrl.pop();
      }, error => {console.log(error);})
    })
    
  }

  retrySubmitUntilWritten(doc) {

  }

  deleteSample() {
      for (let sampbottle of this.mySampleBottles) {
        this._samplebottleService.getOne(sampbottle['_id']).then(response => {
          this._samplebottleService.delete(response);
        });
      }
      this._sampleService.delete(this.mySample['id']).then(response => {
          this.navCtrl.pop();
      });
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Delete this sample?',
      message: 'Are you sure you want to delete this sample?\n(This will delete all sample bottles in this sample.)',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.deleteSample();
          }
        }
      ]
    });
    confirm.present();
  }

}
