import {Component} from '@angular/core';
import {FormControl, FormGroup, FormArray, FormBuilder, Validators} from "@angular/forms";
import {ViewController, ModalController, NavController, NavParams, AlertController, Events} from 'ionic-angular';
import {Project} from '../../app/project/project';
import {Site} from '../../app/site/site';
import {Sample} from '../../app/sample/sample';
import {SampleBottle} from '../../app/samplebottle/samplebottle';
import {Medium} from "../../app/medium/medium";
import {ProjectService} from '../../app/project/project.service';
import {MediumService} from "../../app/medium/medium.service";
import {SampleService} from "../../app/sample/sample.service";
import {SampleBottleService} from "../../app/samplebottle/samplebottle.service";
import {AcidService} from "../../app/acid/acid.service";
import {BottleService} from "../../app/bottle/bottle.service";
import {BottleSelectPage} from './bottle-select';
import {AcidSelectPage} from './acid-select';
import {SampleBottlePage} from './sample-bottle';
import {APP_UTILITIES}   from '../../app/app.utilities';
import {DatePickerProvider} from 'ionic2-date-picker';

// bottles
import {Analysis} from "../../app/analysis/analysis";
import {Filter} from "../../app/filter/filter";
import {Preservation} from "../../app/preservation/preservation";
import {AnalysisService} from "../../app/analysis/analysis.service";
import {FilterService} from "../../app/filter/filter.service";
import {PreservationService} from "../../app/preservation/preservation.service";


@Component({
  templateUrl: 'sample-detail.html',
  styles: ['.select-wide {max-width: 100%;}'],
  //providers: [DatePickerModule]
})
export class SampleDetailPage {
  sample_ID: number;
  clone = false;
  active = true;
  notready = true;
  useWidgets = true;
  lookupContainers = false;
  private _errorMessage: string;
  private _defaultRowCount: number = 8;
  private _numRowsAdded: number = 0;
  private _numSampleBottles: number = 0;
  selectedAcid: number;
  selectedFilterID: number;
  selectedFilterName: string;
  acidReady = false;
  filterReady = false;
  analysisReady = false;
  preservationReady = false;
  

  mySample: Sample = new Sample(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
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
  sampleTime: FormControl = new FormControl({value: null, disabled: false}, Validators.required);
  sampleDepth: FormControl = new FormControl(null);
  sampleRep: FormControl = new FormControl(null);
  sampleMedium: FormControl = new FormControl(null);
  sampleAcid: FormControl = new FormControl(null);
  sampleComment: FormControl = new FormControl(null);
  sampleFilter: FormControl = new FormControl(null);

  // bottles
  myAnalyses: Analysis[] = [];
  myFilters: Filter[] = [];
  myPreservations: Preservation[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController,
              public viewCtrl: ViewController,
              public fb: FormBuilder,
              private _sampleService: SampleService,
              private _samplebottleService: SampleBottleService,
              private _projectService: ProjectService,
              // private _siteService: SiteService,
              private _mediumService: MediumService,
              private _acidService: AcidService,
              private _bottleService: BottleService,
              public datePicker: DatePickerProvider,
              private _analysisService: AnalysisService,
              private _filterService: FilterService,
              private _preservationService: PreservationService,
              private events: Events
  ) {

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
      sampleAcid: this.sampleAcid,
      sampleFilter: this.sampleFilter
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

    this._getFilters();
    this._getPreservations();
    this._getAnalyses();

    // if the sample exists retrieve its data, otherwise set up a new empty sample
    if (this.sample_ID) {
      this._getSample(this.sample_ID, this.clone);
    } else {
        this._getProjects();
        this._getMediums();
        // this a new sample, so set all values to empty of equivalent
        this.mySample = new Sample('', 0, '', 0, null, null, 0, 0, 0, '', '', [], '');
        // force setting of date to today
        this.sampleDate.setValue(this._convertDateISOtoUS(APP_UTILITIES.TODAY));
        this.mySample['date'] = APP_UTILITIES.TODAY;
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
        });
        this.acidReady = true;
        this.filterReady = true;
    }
  }

  showCalendar() {
    const dateSelected = 
      this.datePicker.showCalendar(this.modalCtrl);

    dateSelected.subscribe(date => {   
      const isoFormattedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      this.mySample['date'] = isoFormattedDate;
      const usFormattedDate = this._convertDateISOtoUS(isoFormattedDate);
      this.sampleDate.setValue(usFormattedDate);
    });
  }

  toggleUseWidgets() {
    this.useWidgets = !this.useWidgets;
    // const myDate = this.sampleDate.value;
    this.mediumChange(this.mySample['mediumName']);
    if (this.selectedFilterID) {
      this._setFilterName(this.selectedFilterID);
    }
    for (let i = 0; i < this._numSampleBottles; i++) {
      const anName = (<FormGroup>this.sampleBottleControls.controls[i]).controls['analysisName'].value;
      this.analysisChange(anName, i);
      const prName = (<FormGroup>this.sampleBottleControls.controls[i]).controls['preservationTypeName'].value;
      this.preservationChange(prName, i);
    }
  }

  toggleLookupContainers() {
    this.lookupContainers = !this.lookupContainers;
  }

  private _getSample(sampleID: number, clone: boolean){
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

            // create a new new sample with cloned values from source sample            // this.mySample = new Sample(sample['projectName'], sample['projectNumber'], sample['siteName'], sample['siteNumber'], sample['date'], null, 0, 0, sample['medium'], [], '');
            this.mySample['projectName'] = sample['projectName'];
            this.mySample['projectNumber'] = sample['projectNumber'];
            this.mySample['siteName'] = sample['siteName'];
            this.mySample['siteNumber'] = sample['siteNumber'];
            this.mySample['date'] = sample['date'];
            this.mySample['medium'] = sample['medium']; 
            this.mySample['mediumName'] = sample['mediumName'];
            // this.mySample['mediumNumber'] = sample['mediumNumber'];
            // this.mySample['filter'] = sample['filter'];
            // this.mySample['acid'] = sample['acid'];

            // set new sample id to some random unique number
            let id = Date.now() % 10000000000;
            this.mySample['id'] = id;
            this.mySample['_id'] = id.toString();
            this.sample_ID = id;

            // save this new cloned sample, and add empty sample bottle slots
            this._sampleService.update(this.mySample).then(response => {}, error => {});
          } else {
            this.mySample = sample;
          }

          if (this.mySample['projectName']) {
            this._getProjects(this.mySample['projectName']);
            // this._getSites(this.mySample['projectName']);
          } else {
            this._getProjects();
          }

          this.sampleDate.setValue(this._convertDateISOtoUS(this.mySample['date']));
          this.sampleMedium.setValue(this.mySample['medium']);
          this.sampleComment.setValue(this.mySample['comment']);
          this.sampleTime.setValue(this._timeToText(this.mySample['time']));
          this.sampleDepth.setValue(this.mySample['depth']);
          this.sampleRep.setValue(this.mySample['replicate']);
          //this.sampleFilter.setValue(this.mySample['filter']);
          //this.sampleAcid.setValue(this.mySample['acid']);
                    
          if (this.mySample['sample_bottles'] && this.mySample['sample_bottles'].length > 0) {            
            this._numSampleBottles = this.mySample['sample_bottles'].length;
            this._getSampleBottles(this.mySample['sample_bottles']);
          } else {
              this.mySample['sample_bottles'] = [];
              for (let i = 0, j = this._defaultRowCount; i < j; i++){
                this.addRow();
              }
              this.acidReady = true;
              this.filterReady = true;
          }
        },
        error => this._errorMessage = <any>error)
        .catch(err => this._errorMessage = err);
  }

  private _getProjects(projectName?: any) {
    this._projectService.getAll()
      .then(response =>
      {
        for(let i = 0; i < response.rows.length; i++) {
          this.myProjects.push(response.rows[i].doc);
        }
        // if there is only one project, automatically select it and filter the sites
        if (this.myProjects.length == 1) {
          const project = this.myProjects[0];
          this.projectName.setValue(project['name']);
          this.projectNumber.setValue(project['id']);
          this.mySample['projectName'] = project['name'];
          this.mySample['projectNumber'] = project['id'];
          this.mySites = project['sites'];
        }
        // if there is already a project for this sample, automatically select it and filter the sites
        else if (projectName) {
          let projects = this.myProjects.filter(function (project) { return project['name'] == projectName });
          const project = projects[0];
          this.projectName.setValue(project['name']);
          this.projectNumber.setValue(project['id']);
          this.mySample['projectName'] = project['name'];
          this.mySample['projectNumber'] = project['id'];
          this.mySites = project['sites'];
        }
      }, error => {
        this._errorMessage = <any>error;
      });
  }

  private _getSampleBottles(sampBottles: any) {
    for (let i = 0, j = sampBottles.length; i < j; i++) {
      this._samplebottleService.getOne(sampBottles[i]['_id'])
      .then(response => {
        let samplebottle = response;

        // if this sample is not a clone, populate the sample bottle list
        if (!this.clone) {
          this.mySampleBottles.push(samplebottle);
          this.addRow(samplebottle);              
        }

        // populate the sample's acid field if any of the sample bottles have used an acid
        let acid = samplebottle['preservation_acid'];
        if (acid && (typeof this.selectedAcid === 'undefined' || !this.selectedAcid)) {
          this.selectedAcid = acid;
          this._getAcidName(this.selectedAcid);
        }

        // populate the sample's filter field if any of the sample bottles have used an filter
        let filter = samplebottle['filter_type'];
        if (filter && (typeof this.selectedFilterID === 'undefined' || !this.selectedFilterID)) {
          this.selectedFilterID = filter;
          this._setFilterName(filter);
        }
      });
    }
  }

  private _getAnalyses() {
    this._analysisService.getAll()
      .then(response =>
      {
        for(let i =0; i < response.rows.length; i++) {
          this.myAnalyses.push(response.rows[i].doc);
        }
        this.analysisReady = true;
      }, error => {
        this._errorMessage = <any>error;
      });
  }

  private _getFilters() {
    this._filterService.getAll()
      .then(response =>
      {
        for(let i =0; i < response.rows.length; i++) {
          this.myFilters.push(response.rows[i].doc);
        }
        // update filter name just in case _getSampleBottles finished before this function (_getFilters) finished
        if (this.selectedFilterID) {
          this._setFilterName(this.selectedFilterID);
        }
      }, error => {
        this._errorMessage = <any>error;
      });
  }

  private _setFilterName(filterID: number) {
    const myFilter = this.myFilters.filter(function (myFilter) { return myFilter['id'] == filterID });
    if (myFilter.length > 0) {
      const filterName = myFilter[0]['filter'];
      this.selectedFilterName = filterName;
      (<FormGroup>this.sampleHeaderControls).controls['sampleFilter'].setValue(filterID);
      this.filterReady = true;
    }
  }

  private _getPreservations() {
    this._preservationService.getAll()
      .then(response =>
      {
        for(let i =0; i < response.rows.length; i++) {
          this.myPreservations.push(response.rows[i].doc);
        }
        this.preservationReady = true;
      }, error => {
        this._errorMessage = <any>error;
      });
  }

  addNewBottle(ev: any, ndx: number) {
    const newBottleName = ev.value;
    if (newBottleName != null && newBottleName != '') {
      this._bottleService.getBottlesByName(newBottleName).then(response => {
        let exists = response.rows.length > 0 ? true : false;
        if (!exists) {
          let confirm = this.alertCtrl.create({
            title: 'Add New Container',
            message: newBottleName + ' was not found in the database, add a new Container with this value?',
            buttons: [
              {
                text: 'Cancel',
                handler: () => {
                  (<FormGroup>this.sampleBottleControls.controls[ndx]).controls['bottle'].setValue(null);
                }
              },
              {
                text: 'Add New Container',
                handler: () => {
                  this._bottleService.add(newBottleName);
                }
              }
            ]
          });
          confirm.present();
        }
        this._addSampleBottle(newBottleName);
      });
    }
    
  }

  private _addSampleBottle(bottleName: string) {
    this._bottleService.getBottlesByName(bottleName).then(response => {

        let bottleID = response.rows[0]['id'];
        let bottle = new SampleBottle(this.sample_ID, bottleID, null, null, null, null, null, null, null, null, null, bottleName, bottleID);
        this.mySampleBottles.push(bottle);

        // include the PouchDB internal ID for quick retrieval
        bottle['_id'] = bottleID;
        this._samplebottleService.update(bottle);
    });
  }

  // private _getSites(projectName: any) {
  //   this._projectService.getProjectByName(projectName)
  //     .then(response =>
  //     {
  //       let sites = response.rows[0].doc['sites'];
  //       for(let i =0; i < sites.length; i++) {
  //         let sitedata = sites[i];
  //         let newsite = new Site("temp");
  //         newsite['name'] = sitedata.name;
  //         newsite['usgs_scode'] = sitedata.usgs_scode;
  //         newsite['id'] = sitedata.id;
  //         this.mySites.push(newsite);
  //       }
  //     }, error => {
  //       this._errorMessage = <any>error;
  //     });
  // }

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
          //this.sampleAcid.setValue(response[0].code);
          (<FormGroup>this.sampleHeaderControls).controls['sampleAcid'].setValue(response[0].code);
          this.acidReady = true;
        }, error => {
        this._errorMessage = <any>error;
      });
  }

  private _timeToText(time: string) {
    time = time.replace(':', '');
    return time;
  }

  private _textToTime(text: string) {    
    
    if (text.length == 4 && !text.match(/:/g)) {
      text = text.substr(0,2) + ":" + text.substr(2,2);
    }

    if (text.length == 3 && !text.match(/:/g)) {
      text = text.substr(0,1) + ":" + text.substr(1,2);
    }

    return text;
  }

  private _convertDateUStoISO(usFormattedDate: string) {
    const usFormattedDateParts = usFormattedDate.split('/');
    return usFormattedDateParts[2] + '-' + usFormattedDateParts[0] + '-' + usFormattedDateParts[1];
  }

  private _convertDateISOtoUS(isoFormattedDate: string) {
    const isoFormattedDateParts = isoFormattedDate.split('-');
    const year = isoFormattedDateParts[0]
    return isoFormattedDateParts[1] + '/' + isoFormattedDateParts[2] + '/' + year;
  }

  openDateSelect() {
    this.showCalendar();
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
    modal.onDidDismiss(acidName => {
      if (acidName) {
        this.acidNameChange(acidName);
      }
    });
    modal.present();
  }

  acidNameChange(acidName: string) {
    this._acidService.getAcidsByName(acidName)
    .then(response => {
      this.selectedAcid = response.rows[0].doc.id;
      (<FormGroup>this.sampleHeaderControls).controls['sampleAcid'].setValue(acidName);
    })
    .catch(error => {
      this.showAlert('Acid not found!', acidName, 'was not found in the database. Please enter a valid acid.');
    });
  }

  filterNameChange(filterName: string, source: string) {
    this._filterService.getFiltersByName(filterName)
    .then(response => {
      this.selectedFilterID = response.rows[0].doc.id;
      this.selectedFilterName = response.rows[0].doc.filter;
      //(<FormGroup>this.sampleHeaderControls).controls['sampleFilter'].setValue(filterName);
    })
    .catch(error => {
      this.showAlert('Filter not found!', filterName, 'was not found in the database. Please enter a valid filter.');
    });
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

  projectNameChange(projectName: string) {
    if (projectName == null || projectName == "") {
      return;
    }

    let projects = this.myProjects.filter(function(project: Project) {return project['name'] == projectName});
    if (projects.length < 1) {
      this.showAlert('Project not found!', projectName, 'was not found in the database. Please enter a valid project name.');
    } else {
      this.projectNumber.setValue(projects[0]['id']);
      this.projectName.setValue(projects[0]['name']);
      this.mySample['projectName'] = projects[0]['name'];
      this.mySample['projectNumber'] = projects[0]['id'];
      this.mySites = projects[0]['sites'];
    }
  }

  projectNumberChange(projectNumber: number) {
    if (projectNumber == null || projectNumber == NaN) {
      return;
    }

    let projects = this.myProjects.filter(function(project: Project) {return project['id'] == projectNumber});
    if (projects.length < 1) {
      this.showAlert('Project # not found!', projectNumber.toString(), 'was not found in the database. Please enter a valid project number.');
    } else {
      this.projectName.setValue(projects[0]['name']);
      this.projectNumber.setValue(projects[0]['id']);
      this.mySample['projectName'] = projects[0]['name'];
      this.mySample['projectNumber'] = projects[0]['id'];
      this.mySites = projects[0]['sites'];
    }
  }

  siteNameChange(siteName: string) {
    let sites = this.mySites.filter(function(site: Site) {return site['name'] == siteName});
    if (sites.length < 1) {
      this.showAlert('Site not found!', siteName, 'was not found in the database. Please enter a valid site name.');
    } else {
      this.siteNumber.setValue(sites[0]['id']);
      this.mySample['siteName'] = sites[0]['name'];
      this.mySample['siteNumber'] = sites[0]['id'];
    }
  }

  siteNumberChange(siteNumber: number) {
    let sites = this.mySites.filter(function(site: Site) {return site['id'] == siteNumber});
    if (sites.length < 1) {
      this.showAlert('Site not found!', siteNumber.toString(), 'was not found in the database. Please enter a valid site number.');
    } else {
      this.siteName.setValue(sites[0]['id']);
      this.mySample['siteName'] = sites[0]['name'];
      this.mySample['siteNumber'] = sites[0]['id'];
    }
  }

  mediumChange(mName: string) {
    if (mName && mName != null && mName != '' && mName != 'undefined') {
      let mediums = this.myMediums.filter(function(medium: Medium) {return medium['nwis_code'] == mName});
      if (mediums.length < 1) {
        this.showAlert('Medium not found!', mName.toString(), 'was not found in the database. Please enter a valid medium.');
      } else {
        this.mySample['medium'] = mediums[0]['id'];
        // this.mySample['mediumNumber'] = mediums[0]['id'];
        this.mySample['mediumName'] = mediums[0]['nwis_code'];
        (<FormGroup>this.sampleHeaderControls).controls['sampleMedium'].setValue(this.mySample['medium']);
      }
    }
  }

  analysisChange(aName: string, ndx: number) {
    if (aName != null && aName != '') {
      let analyses = this.myAnalyses.filter(function(analysis: Analysis) {return analysis['analysis'] == aName});
      if (analyses.length < 1) {
        this.showAlert('Analysis not found!', aName.toString(), 'was not found in the database. Please enter a valid analysis.');
      } else {
        (<FormGroup>this.sampleBottleControls.controls[ndx]).controls['analysis'].setValue(analyses[0]['id']);
        (<FormGroup>this.sampleBottleControls.controls[ndx]).controls['analysisName'].setValue(aName);
      }
    }
  }

  preservationChange(pName: string, ndx: number) {
    if (pName != null && pName != '') {
      let preservations = this.myPreservations.filter(function(preservation: Preservation) {return preservation['preservation'] == pName});
      if (preservations.length < 1) {
        this.showAlert('Preservation not found!', pName.toString(), 'was not found in the database. Please enter a valid preservation.');
      } else {
        (<FormGroup>this.sampleBottleControls.controls[ndx]).controls['preservationType'].setValue(preservations[0]['id']);
        (<FormGroup>this.sampleBottleControls.controls[ndx]).controls['preservationTypeName'].setValue(pName);
      }
    }
  }

  addRow(samplebottle?: SampleBottle){

    if(samplebottle) {

      this.sampleBottleControls.push(
        new FormGroup({
          bottle: new FormControl(samplebottle['_id'] ? samplebottle['_id'] : null),
          // medium: new FormControl(this.mySample['medium'] ? this.mySample['medium'] : null),
          analysis: new FormControl(samplebottle['analysis_type'] ? samplebottle['analysis_type'] : null),
          analysisName: new FormControl(samplebottle['analysis_type_name'] ? samplebottle['analysis_type_name'] : null),
          filterType: new FormControl(samplebottle['filter_type'] ? samplebottle['filter_type'] : null),
          filterVolume: new FormControl(samplebottle['volume_filtered'] ? samplebottle['volume_filtered'] : null),
          preservationType: new FormControl(samplebottle['preservation_type'] ? samplebottle['preservation_type'] : null),
          preservationTypeName: new FormControl(samplebottle['preservation_type_name'] ? samplebottle['preservation_type_name'] : null),
          preservationAcid: new FormControl(samplebottle['preservation_acid'] ? samplebottle['preservation_acid'] : null),
          preservationVolume: new FormControl(samplebottle['preservation_volume'] ? samplebottle['preservation_volume'] : null),
          preservationComment: new FormControl(samplebottle['preservation_comment'] ? samplebottle['preservation_comment'] : null)
        })
      );
      
      this._numRowsAdded++;
      if (this._numRowsAdded == this._numSampleBottles) {
        this.notready = false;
      }
    } else {
      this.sampleBottleControls.push(
        new FormGroup({
          bottle: new FormControl(null),
          // medium: new FormControl(null),
          analysis: new FormControl(null),
          analysisName: new FormControl(null),
          filterType: new FormControl(null),
          filterVolume: new FormControl(null),
          preservationType: new FormControl(null),
          preservationTypeName: new FormControl(null),
          preservationAcid: new FormControl(null),
          preservationVolume: new FormControl(null),
          preservationComment: new FormControl(null)
        })
      );

      this._numRowsAdded++;
      if (this._numRowsAdded == this._defaultRowCount) {
        this.notready = false;
      }
    }

  }

  removeRow(sampleBottleControlsRow: FormGroup) {
    let sampleBottleControlRows = this.sampleBottleControls.controls;

    for (let i = 0, j = sampleBottleControlRows.length; i < j; i++) {
      
      if (sampleBottleControlRows[i] == sampleBottleControlsRow) {
        let sampleBottleID = (<FormGroup>this.sampleBottleControls.controls[i]).controls['bottle'].value;
        if (sampleBottleID == null) {
          sampleBottleControlRows.splice(i, 1);
        } else {
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
    let myTime = formValue.sampleHeaderControls.sampleTime;
    if (myTime == null || myTime == '') {
      this.showAlert('Time is a required field! Please enter a valid acid.');
      return false;
    }
    let myDate = formValue.sampleHeaderControls.sampleDate;
    if (myDate.includes('/')) {
      myDate = this._convertDateUStoISO(myDate);
    }
      
    this.mySample['date'] = myDate;
    this.mySample['time'] = this._textToTime(myTime);
    this.mySample['depth'] = parseInt(formValue.sampleHeaderControls.sampleDepth);
    this.mySample['replicate'] = parseInt(formValue.sampleHeaderControls.sampleRep);
    this.mySample['sample_bottles'] = this.mySampleBottles;
    this.mySample['comment'] = formValue.sampleCommentControls.sampleComment;
    // this.mySample['filter'] = formValue.sampleHeaderControls.sampleFilter;
    // this.mySample['acid'] = formValue.sampleHeaderControls.sampleAcid;

    // update the sample
    this._sampleService.getOne(this.mySample['_id']).then(response => {
      this.mySample['_rev'] = response['_rev'];
      this._sampleService.update(this.mySample).then(result => {

        for (let i = 0, j = this.sampleBottleControls.length; i < j; i++) {
            if ((<FormGroup>this.sampleBottleControls.controls[i]).controls['bottle'].value !== null) {
              this._samplebottleService.getOne((<FormGroup>this.sampleBottleControls.controls[i]).controls['bottle'].value).then(response => {
                const pType = (<FormGroup>this.sampleBottleControls.controls[i]).controls['preservationType'].value;
                const filterVolume = parseInt((<FormGroup>this.sampleBottleControls.controls[i]).controls['filterVolume'].value);
                return this._samplebottleService.update({
                  '_id': response['_id'],
                  '_rev': response['_rev'],
                  'analysis_type': (<FormGroup>this.sampleBottleControls.controls[i]).controls['analysis'].value,
                  'filter_type': (filterVolume != null) ? formValue.sampleHeaderControls.sampleFilter : null, // formValue.sampleHeaderControls.sampleFilter,
                  'volume_filtered': filterVolume,
                  'analysis_type_name': (<FormGroup>this.sampleBottleControls.controls[i]).controls['analysisName'].value,
                  'preservation_type': pType,
                  'preservation_type_name': (<FormGroup>this.sampleBottleControls.controls[i]).controls['preservationTypeName'].value,
                  'preservation_volume': parseInt((<FormGroup>this.sampleBottleControls.controls[i]).controls['preservationVolume'].value),
                  'preservation_comment': (<FormGroup>this.sampleBottleControls.controls[i]).controls['preservationComment'].value,
                  'preservation_acid': (pType == 8) ? self.selectedAcid : null
                });
              });
            }
        }
        
        this.navCtrl.pop().then(() => {        
          this.events.publish('custom-user-events');
        });        
        
      }, error => {
        this._errorMessage = error})
    })    
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

  showAlert(ttl?: string, subttl?: string, msg?: string) {
    let alrt = this.alertCtrl.create({
      title: ttl ? ttl : 'Alert',
      subTitle: subttl ? subttl : 'Subtitle',
      message: msg ? msg : 'Message',
      buttons: ['OK']
    });
    alrt.present();
  }

  showConfirm(ttl?:string, msg?: string) {
    if (ttl == 'deleteSampleRow') {
      ttl = 'Delete this sample?';
      msg = 'Are you sure you want to delete this sample?\n(This will delete all sample bottles in this sample.)';
    }
    let confirm = this.alertCtrl.create({
      title: ttl ? ttl : 'Confirm',
      message: msg ? msg : 'Message',
      buttons: [
        {
          text: 'No',
          handler: () => {
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
