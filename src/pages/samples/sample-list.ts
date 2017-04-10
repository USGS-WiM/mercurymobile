import {Component} from '@angular/core';
//import {URLSearchParams}   from '@angular/http';
import {NavController, NavParams} from 'ionic-angular';
import {Sample} from '../../app/sample/sample';
import {SampleService} from '../../app/sample/sample.service';
import {AcidService} from '../../app/acid/acid.service';
import {SampleDetailPage} from './sample-detail';
import {APP_UTILITIES}   from '../../app/app.utilities';

@Component({
  templateUrl: 'sample-list.html',
  providers: [SampleService]
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
              private _sampleService: SampleService, private _acidServer: AcidService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedSample = navParams.get('sample');

    //this._sampleService.destroyDB();
    //this._sampleService.initDB();
    this._getSamples();
    this._acidServer.initDB();

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

  fileDragHover(fileInput) {
      fileInput.stopPropagation();
      fileInput.preventDefault();
  }

  loadSamples(fileInput: any){
      let self = this;
      this.fileDragHover(fileInput);
      let selectedFiles = <Array<File>> fileInput.target.files || fileInput.dataTransfer.files;
      let reader = new FileReader();
			reader.onload = function(e) {
					self._sampleService.loadDB(reader.result);
			};
			reader.readAsBinaryString(selectedFiles[0]);
  }

  dumpSamples() {
    for (let sample of this.samples) {
      let filename = sample['projectName'].replace(/\s/g,'') + "_" + sample['siteName'].replace(/\s/g,'') + "_" + APP_UTILITIES.TODAY + ".txt";
      this._sampleService.dumpDB(filename);
    }
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
