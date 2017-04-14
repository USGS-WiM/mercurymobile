import {Component} from '@angular/core';
//import {URLSearchParams}   from '@angular/http';
import {NavParams, ViewController, Platform} from 'ionic-angular';
import {Bottle} from '../../app/bottle/bottle';
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
  myBottles: Bottle[] = [];
  bottles = [];
  private _allbottles = [];

  constructor(
      public platform: Platform,
      public navParams: NavParams,
      public viewCtrl: ViewController,
      private _bottleService: BottleService
  ) {
    this._getBottleNames();
  }

  private _getBottles() {
    this._bottleService.getAll()
      .then(response =>
        {
          for(let i =0; i < response.rows.length; i++) {
            this.myBottles.push(response.rows[i].doc);
          }
          this._buildBottleOptions();
          this.notready = false;
        }, error => {
          this._errorMessage = <any>error;
          this.notready = false;
        });
    // this._bottleService.getBottles(new URLSearchParams('unused=true&page_size=100'))
    //   .subscribe(
    //     response => {
    //       this.myBottles = response;
    //       this._buildBottleOptions();
    //       this.notready = false;
    //     },
    //     error => this._errorMessage = <any>error);
  }

  private _getBottleNames() {
    this._allbottles = this._bottleService.getAllNames();
    for (let i = 0; i < 100; i++) {
      this.bottles.push(this._allbottles[i]);
    }
    this.notready = false;
  }

  private _buildBottleOptions() {
    this.bottles.length = 0;
    for (let i = 0, j = this.myBottles.length; i < j; i++) {
      this._allbottles.push(this.myBottles[i]['name']);
      if (i < 100) {
        this.bottles.push(this.myBottles[i]['name']);
      }
    }
  }

  filterBottles(event: any) {
    let val = event.target.value;
    if (val && val.trim() != ''){
      this.bottles = this._allbottles.filter((bottle) => {
        return (bottle.indexOf(val) > -1);
      })
    }
  }

  selectBottle(bottle) {
    this.viewCtrl.dismiss(bottle);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
