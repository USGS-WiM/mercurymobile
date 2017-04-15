import {Component} from '@angular/core';
import {NavParams, ViewController, Platform} from 'ionic-angular';
import {AcidService} from '../../app/acid/acid.service';


@Component({
  templateUrl: 'acid-select.html',
})
export class AcidSelectPage {
  active: Boolean = true;
  isReadOnly: Boolean = true;
  notready: Boolean = true;
  private _errorMessage: string;
  selectedacid: string = '';
  acids = [];

  constructor(
      public platform: Platform,
      public navParams: NavParams,
      public viewCtrl: ViewController,
      private _acidService: AcidService
  ) {
    this._getAcids();
  }

  private _getAcids() {
    this._acidService.getAll()
      .then(response =>
        {
          for(let i = 0; i < response.rows.length; i++) {
            this.acids.push(response.rows[i].doc['code']);
          }
          this.notready = false;
        }, error => {
          this._errorMessage = <any>error;
          this.notready = false;
        });
  }

  filterAcids(event: any) {
    this.notready = true;
    let val = event.target.value;
    if (val && val.trim() != ''){
      this._acidService.getAcidsByName(val)
        .then(response =>
        {
          this.acids.length = 0;
          for(let i = 0; i < response.rows.length; i++) {
            this.acids.push(response.rows[i].doc['code']);
          }
          this.notready = false;
        }, error => {
          this._errorMessage = <any>error;
          this.notready = false;
        });
    }
  }

  selectAcid(acid) {
    this.viewCtrl.dismiss(acid);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
