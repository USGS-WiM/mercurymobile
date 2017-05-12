import {Component} from '@angular/core';
import {NavParams, ViewController, Platform} from 'ionic-angular';
import {BottleService} from '../../app/bottle/bottle.service';


@Component({
  templateUrl: 'bottle-select.html',
})
export class BottleSelectPage {
  active: Boolean = true;
  isReadOnly: Boolean = true;
  notready: Boolean = true;
  private _errorMessage: string;
  selectedbottle: string = '';
  bottles = [];

  constructor(
      public platform: Platform,
      public navParams: NavParams,
      public viewCtrl: ViewController,
      private _bottleService: BottleService
  ) {
    this._getBottles();
  }

  private _getBottles() {
    this._bottleService.getAll({include_docs: true, limit: 100})
      .then(response =>
        {
          for(let i = 0; i < response.rows.length; i++) {
            this.bottles.push(response.rows[i]['id']);
          }
          this.notready = false;
        }, error => {
          this._errorMessage = <any>error;
          this.notready = false;
        });
  }

  filterBottles(event: any) {
    this.notready = true;
    let val = event.target.value;
    if (val && val.trim() != ''){
      this._bottleService.getBottlesByName(val)
        .then(response =>
        {
          this.bottles.length = 0;
          for(let i = 0; i < response.rows.length; i++) {
            this.bottles.push(response.rows[i]['id']);
          }
          this.notready = false;
        }, error => {
          this._errorMessage = <any>error;
          this.notready = false;
        });
    }
  }

  selectBottle(bottle) {
    this.viewCtrl.dismiss(bottle);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
