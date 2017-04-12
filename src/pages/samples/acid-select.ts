import {Component} from '@angular/core';
//import {URLSearchParams}   from '@angular/http';
import {NavParams, ViewController, Platform} from 'ionic-angular';
import {Acid} from '../../app/acid/acid';
import {AcidService} from '../../app/acid/acid.service';


@Component({
  templateUrl: 'acid-select.html',
  providers: [AcidService,]
})
export class AcidSelectPage {
  active: Boolean = true;
  isReadOnly: Boolean = true;
  notready: Boolean = true;
  private _errorMessage: string;
  selectedacid: string = '';
  myAcids: Acid[] = [];
  acids = [];

  constructor(
      public platform: Platform,
      public navParams: NavParams,
      public viewCtrl: ViewController,
      private _acidService: AcidService
  ) {
    this._getAllAcids();
  }

  // private _getAcids() {
  //   this._acidService.getAcids(new URLSearchParams('unused=true&page_size=100'))
  //     .subscribe(
  //       response => {
  //         this.myAcids = response.results;
  //         this._buildAcidOptions();
  //         this.notready = false;
  //       },
  //       error => this._errorMessage = <any>error);
  // }

  private _getAllAcids() {
    this._acidService.getAll()
      .then(response =>
        {
          for(let i =0; i < response.rows.length; i++) {
            this.myAcids.push(response.rows[i].doc);
          }
          this._buildAcidOptions();
        }, error => {
          this._errorMessage = <any>error;
          this.notready = false;
        });
  }

  private _buildAcidOptions() {
    this.acids.length = 0;
    for (let i = 0, j = this.myAcids.length; i < j; i++) {
      this.acids.push(this.myAcids[i]['code']);
    }
    this.notready = false;
  }

  filterAcids(event: any) {
    this._buildAcidOptions();
    let val = event.target.value;
    if (val && val.trim() != ''){
      this.acids = this.acids.filter((acid) => {
        return (acid.indexOf(val) > -1);
      })
    }
  }

  selectAcid(acid) {
    this.viewCtrl.dismiss(acid);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
