import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {IonicApp, IonicModule} from 'ionic-angular';
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


@NgModule({
  declarations: [
    AppComponent, HomePage, SampleListPage, SampleDetailPage, AcidSelectPage, BottleSelectPage,
    SiteListPage, SiteDetailPage, SampleBottlePage, ConfigPage
  ],
  imports: [
    IonicModule.forRoot(AppComponent), ReactiveFormsModule, HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent, HomePage, SampleListPage, SampleDetailPage, AcidSelectPage, BottleSelectPage,
    SiteListPage, SiteDetailPage, SampleBottlePage, ConfigPage
  ],
  providers: [
    AcidService, AnalysisService, AuthenticationService, BottleService, FilterService, MediumService,
    PreservationService, ProjectService, SampleService, SampleBottleService, SiteService, UserService
  ]
})
export class AppModule {}
