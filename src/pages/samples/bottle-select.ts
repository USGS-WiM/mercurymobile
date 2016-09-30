import {Component} from '@angular/core';
import {URLSearchParams}   from '@angular/http';
import {NavParams, ViewController, Platform} from 'ionic-angular';
import {Bottle} from '../../app/bottle/bottle';
import {BottleService} from '../../app/bottle/bottle.service';


@Component({
  templateUrl: 'bottle-select.html',
  providers: [BottleService,]
})
export class BottleSelectPage {
  active: Boolean = true;
  isReadOnly: Boolean = true;
  notready: Boolean = true;
  private _errorMessage: string;
  selectedbottle: string = '';
  myBottles: Bottle[];
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
    this._bottleService.getBottles(new URLSearchParams('unused=true&page_size=100'))
      .subscribe(
        response => {
          this.myBottles = response;
          this._buildBottleOptions();
          this.notready = false;
        },
        error => this._errorMessage = <any>error);
  }

  private _buildBottleOptions() {
    this.bottles.length = 0;
    for (let i = 0, j = this.myBottles.length; i < j; i++) {
      this.bottles.push(this.myBottles[i]['bottle_unique_name']);
    }
  }

  filterBottles(event: any) {
    this._buildBottleOptions();
    let val = event.target.value;
    if (val && val.trim() != ''){
      this.bottles = this.bottles.filter((bottle) => {
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
