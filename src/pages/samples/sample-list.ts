import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, Events } from 'ionic-angular';
import { Sample } from '../../app/sample/sample';
import { SampleService } from '../../app/sample/sample.service';
import { SampleBottleService } from '../../app/samplebottle/samplebottle.service';
import { AcidService } from "../../app/acid/acid.service";
import { SampleDetailPage } from './sample-detail';
import { BulkAcidUpdatePage } from './bulk-acid-update'

@Component({
  templateUrl: 'sample-list.html'
})

export class SampleListPage implements OnInit {
  samples: Sample[] = [];
  sampleCount: number = 0;
  currentPage: number = 1;
  selectedAll: boolean = false;
  selectedSample: string;
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
    private _acidService: AcidService,
    public modalCtrl: ModalController,
    private events: Events
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

  // update all selected samples with acid value for acidification bottles
  updateBulkSampleAcids() {
    const numSamplesSelected = this._bulkSamples.length;
    let numSamplesUpdated = 0;

    if (!numSamplesSelected) {
      const alert = this.alertCtrl.create({
        title: 'Bulk Update',
        subTitle: 'You need to select samples to update first!',
        buttons: ['OK']
      });
      alert.present();
      return false;
    }

    const opts = { showBackdrop: true, enableBackdropDismiss: true };
    let modal = this.modalCtrl.create(BulkAcidUpdatePage, this._bulkSamples, opts);
    modal.onDidDismiss(newAcidName => {
      if (newAcidName) {
        this._acidService.getAcidsByName(newAcidName)
          .then(response => {
            const newAcidID = response.rows[0].doc.id;
            for (let i = 0; i < numSamplesSelected; i++) {
              const sampleName = this._bulkSamples[i].toString();
              // update the sample
              this._sampleService.getOne(sampleName)
              .then(response => {
                let sampleBottles = response['sample_bottles'];
                const numSampleBottlesAttached = sampleBottles.length;
                let numSampleBottlesRetrieved = 0;
                for (let i = 0; i < numSampleBottlesAttached; i++) {
                  const bottleName = sampleBottles[i]['_id'];
                  // update samplebottles with acid
                  this._samplebottleService.getOne(bottleName)
                  .then(bottle => {
                    numSampleBottlesRetrieved++;
                    if (numSampleBottlesAttached == numSampleBottlesRetrieved) {
                      numSamplesUpdated++;
                      if (numSamplesSelected == numSamplesUpdated) {
                        const alert = this.alertCtrl.create({
                          title: 'Bulk Acid Update Success!',
                          subTitle: '',
                          buttons: ['OK']
                        });
                        alert.present();
                      }
                    }
                    
                    if (bottle['preservation_type'] == 8) {
                      this._samplebottleService.update({
                        '_id': bottle['_id'],
                        '_rev': bottle['_rev'],
                        'analysis_type': bottle['analysis_type'],
                        'filter_type': bottle['filter_type'],
                        'volume_filtered': bottle['volume_filtered'],
                        'preservation_type': bottle['preservation_type'],
                        'preservation_volume': bottle['preservation_volume'],
                        'preservation_comment': bottle['preservation_comment'],
                        'preservation_acid': newAcidID
                      })
                      .then(response => 
                        {
                          this.selectedAll = false;
                        },
                        error => {
                          const alert = this.alertCtrl.create({
                            title: 'Bulk Acid Update Error',
                            subTitle: 'Error updating sample bottle ' + bottle['_id'] + ' with error message ' + error,
                            buttons: ['OK']
                          });
                          alert.present();
                        });                                                  
                    }
                  },
                  error => {
                    const alert = this.alertCtrl.create({
                      title: 'Bulk Acid Update Error',
                      subTitle: 'Error retrieving sample bottle ' + bottleName + ' with error message ' + error,
                      buttons: ['OK']
                    });
                    alert.present();
                  });
                }
              }); 
            }
          })
          .catch(error => {
            const alert = this.alertCtrl.create({
              title: 'Bulk Acid Update Error',
              subTitle: 'Error retrieving acid ' + newAcidName + ' with error message ' + error,
              buttons: ['OK']
            });
            alert.present();
          });
      }
    });

    modal.present();
  }

  updateBulkSamples(sample_id, checked) {    
    const index = this._bulkSamples.indexOf(sample_id);
    if (index > -1) {
      this._bulkSamples.splice(index, 1);
    } else {
      this._bulkSamples.push(sample_id);
    }      
  }

  selectAllSamples(action: boolean) {
    if (action) {
      this.selectedAll = true;
    } else {
      this.selectedAll = false;
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
            return false;
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
    
    this.events.subscribe('custom-user-events', () => {
      this._getSamples();
      this.events.unsubscribe('custom-user-events');
    });

    this.navCtrl.push(SampleDetailPage, {
      sample: sample_id,
      clone: clone ? clone : false
    });
  }

}
