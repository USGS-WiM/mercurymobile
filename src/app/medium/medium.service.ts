import {Injectable}     from '@angular/core';
import {Http, Response, RequestOptions, URLSearchParams} from '@angular/http';
import {Medium}           from './medium';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {APP_SETTINGS}   from '../app.settings';

@Injectable()
export class MediumService {
    constructor (private http: Http) {}

    getMedium (id: number | string) {
        let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS });

        return this.http.get(APP_SETTINGS.MEDIUMS_URL+id+'/', options)
            .map(res => <Medium> res.json())
            .catch(this.handleError);
    }

    getMediums (searchArgs?: URLSearchParams) {
        let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS, search: searchArgs });

        return this.http.get(APP_SETTINGS.MEDIUMS_URL, options)
            .map(res => <Medium[]> res.json())
            .catch(this.handleError);
    }

    private handleError (error: Response) {
        // TODO figure out a better error handler
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
