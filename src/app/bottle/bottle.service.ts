import {Injectable}     from '@angular/core';
import {Http, Response, RequestOptions, URLSearchParams} from '@angular/http';
import {Bottle}           from './bottle';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {APP_SETTINGS}   from '../app.settings';
import {BOTTLES} from './bottles';
import PouchDB from 'pouchdb';
import find from 'pouchdb-find';
import load from 'pouchdb-load';
import replicationStream from 'pouchdb-replication-stream';

@Injectable()
export class BottleService {
    private _db;
    private _bottles;

    constructor (private http: Http) {
      PouchDB.plugin(find);
      PouchDB.plugin(load);
      PouchDB.plugin(replicationStream.plugin);
      PouchDB.adapter('writableStream', replicationStream.adapters.writableStream);
      this._db = new PouchDB('bottles');
      //this.destroyDB();
      this.initDB();
    }

    initDB() {
      this._db.allDocs()
        .then(result => {
          if(result.total_rows === 0) {
            //this._db.bulkDocs(BOTTLES);
            for (let bottle of BOTTLES) {
              //this._db.post(acid);
              this._db.put({
                _id: bottle['name'],
                id: bottle['id'],
                name: bottle['name']
              });
            }
          }
        })
        .catch( error => {
          console.log(error)
        });
    }

    destroyDB() {
      new PouchDB('bottles').destroy();
    }

    findBottle(val: string) {
      this._db.find({
        selector: {_id: val},
        fields: ['id', 'name']
        //sort: ['code']
      }).then(function (result) {
        return result['docs'];
      }).catch(function (err) {
        console.log('bottle find error');
      });
    }

    getAllBottles () {
        if (!this._bottles) {
          return this._db.allDocs({ include_docs: true})
              .then(docs => {
                  this._bottles = docs.rows.map(row => {
                      return row.doc;
                  });
                  return this._bottles;
              });
      } else {
          // Return cached data as a promise
          return Promise.resolve(this._bottles);
      }
    }

    getBottle (id: number | string) {
        let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS });

        return this.http.get(APP_SETTINGS.BOTTLES_URL+id+'/', options)
            .map(res => <Bottle> res.json())
            .catch(this.handleError);
    }

    getBottles (searchArgs?: URLSearchParams) {
        let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS, search: searchArgs });

        return this.http.get(APP_SETTINGS.BOTTLES_URL, options)
            .map(res => <Bottle[]> res.json().results)
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
