import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SampleListPage} from '../samples/sample-list';
import {SiteListPage} from '../sites/site-list';

@Component({
  templateUrl: 'home.html'
})
export class HomePage {  
  constructor(public navCtrl: NavController) {}
  
    goToOtherPage(page) {       

      switch(page) {
        case "sites":
          this.navCtrl.push(SiteListPage);
          break;
        case "samples":
          this.navCtrl.push(SampleListPage);
          break;
      }      
    }
}
