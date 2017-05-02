import {Component, ViewChild} from '@angular/core';
import {Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from '../pages/home/home';
import {SampleListPage} from '../pages/samples/sample-list';
import {SiteListPage} from '../pages/sites/site-list';
import {ConfigPage} from '../pages/config/config'


@Component({
  templateUrl: 'app.html'
})
export class AppComponent {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {
    sessionStorage.setItem('username', 'admin');
    sessionStorage.setItem('password', 'm3rcury@dm1n');
    this.initializeApp();


    // set our app's pages
    this.pages = [
      {title: 'Home', component: HomePage},
      {title: 'Samples', component: SampleListPage},
      {title: 'Sites', component: SiteListPage},
      {title: 'Config', component: ConfigPage}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
