import {Component} from '@angular/core';
import {NavParams, ViewController, Platform} from 'ionic-angular';
import {FilterService} from '../../app/filter/filter.service';


@Component({
  templateUrl: 'filter-select.html',
})
export class FilterSelectPage {
  active: Boolean = true;
  isReadOnly: Boolean = true;
  notready: Boolean = true;
  private _errorMessage: string;
  selectedfilter: string = '';
  filters = [];

  constructor(
      public platform: Platform,
      public navParams: NavParams,
      public viewCtrl: ViewController,
      private _filterService: FilterService
  ) {
    this._getFilters();
  }

  private _getFilters() {
    this._filterService.getAll({include_docs: true, limit: 100})
      .then(response =>
        {
          for(let i = 0; i < response.rows.length; i++) {
            this.filters.push(response.rows[i]['id']);
          }
          this.notready = false;
        }, error => {
          this._errorMessage = <any>error;
          this.notready = false;
        });
  }
  
  selectAcid(filter) {
    this.viewCtrl.dismiss(filter);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
