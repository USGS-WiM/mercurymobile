import {Injectable}     from '@angular/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {Sample}           from './sample';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {APP_SETTINGS}   from '../app.settings';
import {SAMPLES} from './mock-samples'

@Injectable()
export class SampleService {
  getSample(id: number | string): Promise<Sample> {
    let newid: number = +id - 1;
    return Promise.resolve(SAMPLES[newid]);
  }

  getSamples(): Promise<Sample[]> {
    return Promise.resolve(SAMPLES);
  }

    // constructor (private http: Http) {}
    //
    // getSample (id: number | string) {
    //     let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS });
    //
    //     return this.http.get(APP_SETTINGS.SAMPLES_URL+id+'/', options)
    //         .map(res => <Sample> res.json())
    //         .catch(this.handleError);
    // }
    //
    // getSamples (searchArgs?: URLSearchParams) {
    //     let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS, search: searchArgs });
    //
    //     return this.http.get(APP_SETTINGS.SAMPLES_URL, options)
    //         .map(res => <Sample[]> res.json())
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
