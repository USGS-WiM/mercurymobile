import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {Sample} from '../../app/sample/sample';
import {SampleService} from '../../app/sample/sample.service';
import {SampleBottleService} from '../../app/samplebottle/samplebottle.service';
import {SampleDetailPage} from './sample-detail';


@Component({
  templateUrl: 'sample-list.html'
})
export class SampleListPage implements OnInit {
  samples: Sample[] = [];
  sampleCount: number = 0;
  currentPage: number = 1;
  resultPages = Math.ceil(this.sampleCount / 100);
  notready: Boolean = true;
  private _errorMessage: string;
  callback: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              private _sampleService: SampleService,
              private _samplebottleService: SampleBottleService
  ) {}

  ngOnInit() {
    this._getSamples();    
  }

  private _getSamples(){
    this.notready = true;
    this._sampleService.getAll()
      .then(response =>
      {
        this.samples.length = 0;
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

  cloneSample(sample_id){
    this.openPage(sample_id, true);
  }

  deleteSample(sampleID) {
      this._sampleService.getOne(sampleID).then(response => {
        if (response['sample_bottles']) {
          let sampbottles = response['sample_bottles'];
          for (let sampbottle of sampbottles) {
            this._samplebottleService.getOne(sampbottle['_id']).then(response => {
              this._samplebottleService.delete(response);
            });
          }
        }
        this._sampleService.delete(response).then(response => {
          this._getSamples();
        });
      });
  }

  showConfirm(sampleID) {
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
            this.deleteSample(sampleID);
          }
        }
      ]
    });
    confirm.present();
  }

  openPage(sample_id, clone?) {
      this.navCtrl.push(SampleDetailPage, {
        sample: sample_id,
        clone: clone ? clone : false
      });
  }

}
