import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Sample } from '../../app/sample/sample';
import { SampleService } from '../../app/sample/sample.service';
import { SampleBottleService } from '../../app/samplebottle/samplebottle.service';
import { SampleDetailPage } from './sample-detail';
import { BulkAcidUpdatePage } from './bulk-acid-update'

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
  private _bulkSamples = Array<string>();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private _sampleService: SampleService,
    private _samplebottleService: SampleBottleService,
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this._getSamples();
  }

  private _getSamples() {
    this.notready = true;
    this._sampleService.getAll()
      .then(response => {
        this.samples.length = 0;
        for (let i = 0; i < response.rows.length; i++) {
          this.samples.push(response.rows[i].doc);
          this.notready = false;
        }
      }, error => {
        this._errorMessage = <any>error;
        this.notready = false;
      });
  }

  updateBulkSampleAcids() {

    console.log(this._bulkSamples);

    if (!this._bulkSamples.length) {      
      let alert = this.alertCtrl.create({
        title: 'Bulk Update',
        subTitle: 'You need to select sites to update first!',
        buttons: ['OK']
      });
      alert.present();      
      return;
    }

    let opts = { showBackdrop: true, enableBackdropDismiss: true };
    let modal = this.modalCtrl.create(BulkAcidUpdatePage, this._bulkSamples, opts);
    modal.onDidDismiss(data => {
      if (data) {
        console.log("Bulk update acid: " + data);
        for (let i = 0, j = this._bulkSamples.length; i < j; i++) {
          console.log(this._bulkSamples[i]);
          // update the sample
          this._sampleService.getOne(<string>this._bulkSamples[i].toString()).then(response => { 
            response['acid'] = data;
            this._sampleService.update(response);   
                  
            for (let i = 0, j = response['sample_bottles'].length; i < j; i++) {
              
              // update samplebottles with acid
              this._samplebottleService.getOne(response['sample_bottles'][i]['_id'].toString()).then(savedBottle => {
                console.log("Saved bottle: ");
                console.log(savedBottle);      
                
                if (savedBottle['preservation_type'] == 8) {
                  this._samplebottleService.update({
                    '_id': savedBottle['_id'],
                    '_rev': savedBottle['_rev'],
                    'analysis_type': savedBottle['analysis_type'],
                    'filter_type': savedBottle['filter_type'],
                    'volume_filtered': savedBottle['volume_filtered'],
                    'preservation_type': savedBottle['preservation_type'],
                    'preservation_volume': savedBottle['preservation_volume'],
                    'preservation_comment': savedBottle['preservation_comment'],
                    'preservation_acid': data
                  }).then(response => 
                    {console.log('update success'); console.log(response);}, 
                    error => { 
                      console.log(error)
                      let alert = this.alertCtrl.create({
                        title: 'Bulk Update Error',
                        subTitle: 'Error updating ' + savedBottle['_id'] + ' with error message ' + error,
                        buttons: ['OK']
                      });
                      alert.present();                                                
                    });                                                  
                }                  
              });
            }              
          }); 
        }
                
        let alert = this.alertCtrl.create({
          title: 'Bulk Update',
          subTitle: 'Update Success!',
          buttons: ['OK']
        });
        alert.present();
        
      }
    });

    modal.present();
  }

  updateBulkSamples(sample_id, checked) {
    var index = this._bulkSamples.indexOf(sample_id);
    if (index > -1) {
      this._bulkSamples.splice(index, 1);
    } else {
      this._bulkSamples.push(sample_id);
    }
  }

  addSample() {
    this.openPage(null);
  }

  editSample(sample_id) {
    this.openPage(sample_id);
  }

  cloneSample(sample_id) {
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
