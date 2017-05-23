import {Component} from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';
import {Site} from '../../app/site/site';
import {SiteService} from '../../app/site/site.service';
import {SiteDetailPage} from './site-detail';


@Component({
  templateUrl: 'site-list.html'
})
export class SiteListPage {
  selectedSite: Site;
  sites: Site[] = [];
  private _firstSites: string[] = [];
  private _firstSite: string;
  private _lastSite: string;
  private _pageSize: number = 100;
  siteCount: number = 0;
  currentPage: number = 1;
  resultPages = Math.ceil(this.siteCount / this._pageSize);
  notready: Boolean = true;
  private _errorMessage: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              private _siteService: SiteService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedSite = navParams.get('site');

    this._getSites();

  }

  private _getSites(opts?: any){
    this.notready = true;
    if (!opts) {
      opts = {include_docs: true, limit: this._pageSize}
    }
    this._siteService.getAll(opts)
    .then(response =>
      {
        this.sites.length = 0;
        this.siteCount = response.total_rows;
        this.resultPages = Math.ceil(this.siteCount / this._pageSize);
        for(let i = 0, j = response.rows.length; i < j; i++) {
          this.sites.push(response.rows[i].doc);
        }
        this._firstSite = response.rows[0].doc['_id'];
        this._lastSite = response.rows[this._pageSize - 1].doc['_id'];
        this.notready = false;
      }, error => {
        this._errorMessage = <any>error;
        this.notready = false;
      });
      // .subscribe(
      //   res => {
      //     this.sites = res.results;
      //     this.siteCount = res.count;
      //     this.resultPages = Math.ceil(this.siteCount / 100);
      //     this.notready = false;
      //   },
      //   error => {
      //     this._errorMessage = <any>error;
      //     this.notready = false;
      //   });
  }

  nextPage(){
    if (this.currentPage != this.resultPages) {
      //this._getSites('page='+(this.currentPage + 1));
      this.currentPage++;
      this._firstSites.push(this._firstSite);
      let opts = {include_docs: true, limit: this._pageSize, startkey: this._lastSite, skip: 1};
      this._getSites(opts);
    }
    else {
      alert("End of results, there are no pages after Page " + this.resultPages + ".");
    }
  }

  prevPage(){
    if (this.currentPage != 1) {
      //this._getSites('page='+(this.currentPage - 1));
      this.currentPage--;
      let opts = {include_docs: true, limit: this._pageSize, startkey: this._firstSites.pop()};
      this._getSites(opts);
    }
    else {
      alert("There are no pages before Page 1.");
    }
  }

  addSite(){
    this.openModal(null);
  }

  editSite(site_name){
    this.openModal(site_name);
  }

  openModal(site_name) {
    let opts = {showBackdrop: false, enableBackdropDismiss: false};
    let modal = this.modalCtrl.create(SiteDetailPage, {name: site_name}, opts);
    modal.present();
  }

}

