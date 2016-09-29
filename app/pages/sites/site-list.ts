import {Component} from '@angular/core';
import {URLSearchParams}   from '@angular/http';
import {ModalController, NavController, NavParams} from 'ionic-angular';
import {Site} from '../../site/site';
import {SiteService} from '../../site/site.service';
import {SiteDetailPage} from './site-detail';


@Component({
  templateUrl: 'build/pages/sites/site-list.html',
  providers: [SiteService]
})
export class SiteListPage {
  selectedSite: Site;
  sites: Site[];
  siteCount: number = 0;
  currentPage: number = 1;
  resultPages = Math.ceil(this.siteCount / 100);
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

  private _getSites(newUrlSearchParams?){
    this.notready = true;
    this._siteService.getSites(new URLSearchParams(newUrlSearchParams))
      .subscribe(
        res => {
          this.sites = res.results;
          this.siteCount = res.count;
          this.resultPages = Math.ceil(this.siteCount / 100);
          this.notready = false;
        },
        error => {
          this._errorMessage = <any>error;
          this.notready = false;
        });
  }

  nextPage(){
    if (this.currentPage != this.resultPages) {
      this._getSites('page='+(this.currentPage + 1));
      this.currentPage++;
    }
    else {
      alert("End of results, there are no pages after Page " + this.resultPages + ".");
    }
  }

  prevPage(){
    if (this.currentPage != 1) {
      this._getSites('page='+(this.currentPage - 1));
      this.currentPage--;
    }
    else {
      alert("There are no pages before Page 1.");
    }
  }

  addSite(){
    this.openModal(null);
  }

  editSite(site_id){
    this.openModal(site_id);
  }

  openModal(site_id) {
    let opts = {showBackdrop: false, enableBackdropDismiss: false};
    let modal = this.modalCtrl.create(SiteDetailPage, {id: site_id}, opts);
    modal.present();
  }

}

