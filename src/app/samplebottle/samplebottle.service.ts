import {Injectable}     from '@angular/core';
import {URLSearchParams} from '@angular/http';
//import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {SampleBottle}           from './samplebottle';
//import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//import {APP_SETTINGS}   from '../app.settings';
import {SAMPLEBOTTLES} from './mock-samplebottles'

@Injectable()
export class SampleBottleService {
  getSampleBottle(id: number | string): Promise<SampleBottle> {
    let newid: number = +id - 1;
    return Promise.resolve(SAMPLEBOTTLES[newid]);
  }

  getSampleBottles(searchArgs?: URLSearchParams): Promise<SampleBottle[]> {
    return Promise.resolve(SAMPLEBOTTLES);
  }

    // constructor (private http: Http) {}
    //
    // getSampleBottle (id: number | string) {
    //     let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS });
    //
    //     return this.http.get(APP_SETTINGS.SAMPLEBOTTLES_URL+id+'/', options)
    //         .map(res => <SampleBottle> res.json())
    //         .catch(this.handleError);
    // }
    //
    // getSampleBottles (searchArgs?: URLSearchParams) {
    //     let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS, search: searchArgs });
    //
    //     return this.http.get(APP_SETTINGS.SAMPLEBOTTLES_URL, options)
    //         .map(res => <SampleBottle[]> res.json())
    //         .catch(this.handleError);
    // }
    //
    // private handleError (error: Response) {
    //     // TODO figure out a better error handler
    //     // in a real world app, we may send the server to some remote logging infrastructure
    //     // instead of just logging it to the console
    //     console.error(error);
    //     return Observable.throw(error.json().error || 'Server error');
    // }
}
