import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Sample} from '../../app/sample/sample';
import {SampleService} from '../../app/sample/sample.service';
import {SampleDetailPage} from './sample-detail';


@Component({
  templateUrl: 'sample-list.html'
})
export class SampleListPage {
  selectedSample: Sample;
  samples: Sample[];
  sampleCount: number = 0;
  currentPage: number = 1;
  resultPages = Math.ceil(this.sampleCount / 100);
  notready: Boolean = true;
  private _errorMessage: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _sampleService: SampleService
  ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedSample = navParams.get('sample');

    //this._sampleService.destroyDB();
    //this._sampleService.initDB();
    this._getSamples();

  }

  private _getSamples(){
    this.notready = true;
    //this._sampleService.getSamples()
    this._sampleService.getAll()
      .then(response =>
      {
        for(let i =0; i < response.rows.length; i++) {
          this.samples.push(response.rows[i].doc);
          this.notready = false;
        }
      }, error => {
        this._errorMessage = <any>error;
        this.notready = false;
      });
  }

  addSample(){
    this.openPage(null);
  }

  editSample(sample_id){
    this.openPage(sample_id);
  }

  openPage(sample_id) {
    this.navCtrl.push(SampleDetailPage, {
      sample: sample_id
    });
  }
}
