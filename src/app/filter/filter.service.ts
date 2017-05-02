import {Injectable}     from '@angular/core';
import {Http, Response, RequestOptions, URLSearchParams} from '@angular/http';
import {Filter}           from './filter';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {APP_SETTINGS}   from '../app.settings';
import {FILTERS} from './filters';
import PouchDB from 'pouchdb';
import find from 'pouchdb-find';
import load from 'pouchdb-load';
import replicationStream from 'pouchdb-replication-stream';

@Injectable()
export class FilterService {
    private _db;
    //private _filters;

    constructor (private http: Http) {
      PouchDB.plugin(find);
      PouchDB.plugin(load);
      PouchDB.plugin(replicationStream.plugin);
      PouchDB.adapter('writableStream', replicationStream.adapters.writableStream);
      this._createDB();
    }

    initDB() {
      this._db.allDocs()
        .then(result => {
          if(result.total_rows === 0) {
            //this._db.bulkDocs(FILTERS);
            for (let filter of FILTERS) {
              //this._db.post(analysis);
              this._db.put({
                _id: filter['filter'],
                id: filter['id'],
                filter: filter['filter']
              });
            }
          }
        })
        .catch( error => {
          console.log(error)
        });
    }

    private _createDB() {
      this._db = new PouchDB('filters');
    }

    destroyDB() {
      this._db.destroy()
        .then(res => {
          this._createDB();
        }).catch(error => {
          console.log(error);
        });
    }

    findFilter(val: string) {
      this._db.find({
        selector: {_id: val},
        fields: ['id', 'filter']
        //sort: ['code']
      }).then(function (result) {
        return result['docs'];
      }).catch(function (err) {
        console.log('filter find error');
      });
    }

    public getAll() {
        return this._db.allDocs({include_docs: true});
    }

    getFilter (id: number | string) {
        let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS });

        return this.http.get(APP_SETTINGS.FILTERS_URL+id+'/', options)
            .map(res => <Filter> res.json())
            .catch(this.handleError);
    }

    getFilters (searchArgs?: URLSearchParams) {
        let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS, search: searchArgs });

        return this.http.get(APP_SETTINGS.FILTERS_URL, options)
            .map(res => <Filter[]> res.json())
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
