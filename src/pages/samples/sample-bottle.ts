import {Component} from '@angular/core';
import {FormControl, FormGroup, FormBuilder} from "@angular/forms";
import {ModalController, NavController, NavParams} from 'ionic-angular';
import {SampleBottle} from '../../app/samplebottle/samplebottle';
import {Analysis} from "../../app/analysis/analysis";
import {Filter} from "../../app/filter/filter";
import {Preservation} from "../../app/preservation/preservation";
import {AnalysisService} from "../../app/analysis/analysis.service";
import {FilterService} from "../../app/filter/filter.service";
import {PreservationService} from "../../app/preservation/preservation.service";
import {SampleBottleService} from "../../app/samplebottle/samplebottle.service";

@Component({
  templateUrl: 'sample-bottle.html',
  styles: ['.select-wide {max-width: 100%;}']
})
export class SampleBottlePage {
  sample_bottle_ID: number;
  sample_bottle_name: string;
  active: Boolean = true;
  notready: Boolean = true;
  private _errorMessage: string;

  mySampleBottle: SampleBottle;
  myAnalyses: Analysis[];
  myFilters: Filter[];
  myPreservations: Preservation[];

  sampleBottleForm: FormGroup;
  sampleBottleControlsGroup: FormGroup;
  sampleBottleControls;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public fb: FormBuilder,
              private _samplebottleService: SampleBottleService,
              private _analysisService: AnalysisService,
              private _filterService: FilterService,
              private _preservationService: PreservationService) {

    this.sampleBottleControls = {
      "analysis": new FormControl(null),
      "filterType": new FormControl(null),
      "filterVolume": new FormControl(null),
      "preservationType": new FormControl(null),
      "preservationAcid": new FormControl(null),
      "preservationVolume": new FormControl(null)
  };
    this.sampleBottleControlsGroup = new FormGroup(this.sampleBottleControls);
    this.sampleBottleForm = fb.group({sampleBottleControlsGroup: this.sampleBottleControlsGroup});


    //this._getBottles();
    this._getAnalyses();
    this._getFilters();
    this._getPreservations();

    // If we navigated to this page, we will have an item available as a nav param
    this.sample_bottle_ID = this.navParams.get('samplebottle');

    if (this.sample_bottle_ID) {
      this._getSampleBottle((this.sample_bottle_ID));
    }
    else {
      this.notready = false;
    }

  }

  _updateControls() {
    this.sampleBottleControls['filterVolume'].setValue(this.mySampleBottle['volume_filtered']);
    this.sampleBottleControls['preservationVolume'].setValue(this.mySampleBottle['preservation_volume']);
  }

  private _getSampleBottle(sampleBottleID: number | string){
    this._samplebottleService.getSampleBottle(sampleBottleID)
      .then(
        response => {
          if (typeof response == "undefined") {alert("undefined"); this.notready = false;}
          else {
            this.mySampleBottle = response;
            this.sample_bottle_name = this.mySampleBottle['bottle_string'];
            this._updateControls();
            // (<FormGroup>this.sampleBottleControls).controls['filterVolume'].setValue(this.mySampleBottle['volume_filtered']);
            // (<FormGroup>this.sampleBottleControls).controls['preservationAcid'].setValue(this.mySampleBottle['preservation_acid']);
            // (<FormGroup>this.sampleBottleControls).controls['preservationVolume'].setValue(this.mySampleBottle['preservation_volume']);
            this.notready = false;
          }
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
          this.myPreservations = response;
        },
        error => this._errorMessage = <any>error);
  }



}
