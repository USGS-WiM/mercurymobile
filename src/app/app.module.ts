import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {AppComponent} from './app.component';
import {AcidService} from './acid/acid.service';
import {AnalysisService} from './analysis/analysis.service';
import {AuthenticationService} from './authentication/authentication.service';
import {BottleService} from './bottle/bottle.service';
import {FilterService} from './filter/filter.service';
import {MediumService} from './medium/medium.service';
import {PreservationService} from './preservation/preservation.service';
import {ProjectService} from './project/project.service';
import {SampleService} from './sample/sample.service';
import {SampleBottleService} from './samplebottle/samplebottle.service';
import {SiteService} from './site/site.service';
import {UserService} from './users/user.service';
import {HomePage} from '../pages/home/home';
import {SampleListPage} from '../pages/samples/sample-list';
import {SampleDetailPage} from '../pages/samples/sample-detail';
import {SampleBottlePage} from '../pages/samples/sample-bottle';
import {AcidSelectPage} from '../pages/samples/acid-select';
import {BottleSelectPage} from '../pages/samples/bottle-select';
import {SiteListPage} from '../pages/sites/site-list';
import {SiteDetailPage} from '../pages/sites/site-detail';
import {ConfigPage} from '../pages/config/config';
//import {ReversePipe} from './reverse.pipe';
import { DatePickerModule } from 'ionic2-date-picker';
import {BulkAcidUpdatePage} from '../pages/samples/bulk-acid-update';
import {FilterSelectPage} from '../pages/samples/filter-select';

@NgModule({
  declarations: [
    AppComponent, HomePage, SampleListPage, SampleDetailPage, AcidSelectPage, BottleSelectPage,
    SiteListPage, SiteDetailPage, SampleBottlePage, ConfigPage, BulkAcidUpdatePage, FilterSelectPage
  ],
  /*declarations: [
    AppComponent, HomePage, SampleListPage, SampleDetailPage, AcidSelectPage, BottleSelectPage,
    SiteListPage, SiteDetailPage, SampleBottlePage, ConfigPage, ReversePipe, DatePicker
  ],*/
  imports: [
    IonicModule.forRoot(AppComponent), ReactiveFormsModule, HttpModule, BrowserModule, DatePickerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent, HomePage, SampleListPage, SampleDetailPage, AcidSelectPage, BottleSelectPage,
    SiteListPage, SiteDetailPage, SampleBottlePage, ConfigPage, BulkAcidUpdatePage, FilterSelectPage
  ],
  providers: [
    AcidService, AnalysisService, AuthenticationService, BottleService, FilterService, MediumService,
    PreservationService, ProjectService, SampleService, SampleBottleService, SiteService, UserService, StatusBar
  ]
})
export class AppModule {}
