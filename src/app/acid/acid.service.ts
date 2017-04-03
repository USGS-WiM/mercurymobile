import {Injectable}     from '@angular/core';
import {Http, Response, RequestOptions, URLSearchParams} from '@angular/http';
import {Acid}           from './acid';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {APP_SETTINGS}   from '../app.settings';
import {ACIDS} from './acids';
import PouchDB from 'pouchdb';
import find from 'pouchdb-find';
import load from 'pouchdb-load';
import replicationStream from 'pouchdb-replication-stream';
//import MemoryStream from 'memorystream';

@Injectable()
export class AcidService {
    private _db;
    private _acids;

    constructor (private http: Http) {
      PouchDB.plugin(find);
      PouchDB.plugin(load);
      PouchDB.plugin(replicationStream.plugin);
      PouchDB.adapter('writableStream', replicationStream.adapters.writableStream);
      this._db = new PouchDB('acids');
      //this.destroyDB();
      this.initDB();
    }

    initDB() {
      this._db.allDocs()
        .then(result => {
          if(result.total_rows === 0) {
            //this._db.bulkDocs(ACIDS);
            for (let acid of ACIDS) {
              //this._db.post(acid);
              this._db.put({
                _id: acid['code'],
                id: acid['id'],
                code: acid['code']
              });
            }
          }
        })
        .catch( error => {
          console.log(error)
        });
    }

    destroyDB() {
      new PouchDB('acids').destroy();
    }

    findAcid(val: string) {
      this._db.find({
        selector: {_id: val},
        fields: ['id', 'code']
        //sort: ['code']
      }).then(function (result) {
        return result['docs'];
      }).catch(function (err) {
        console.log('acid find error');
      });
    }

    getAllAcids () {
        if (!this._acids) {
          return this._db.allDocs({ include_docs: true})
              .then(docs => {
                  this._acids = docs.rows.map(row => {
                      return row.doc;
                  });
                  return this._acids;
              });
      } else {
          // Return cached data as a promise
          return Promise.resolve(this._acids);
      }
    }

    getAcid (id: number | string) {
        let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS });

        return this.http.get(APP_SETTINGS.ACIDS_URL+id+'/', options)
            .map(res => <Acid> res.json())
            .catch(this.handleError);
    }

    getAcids (searchArgs?: URLSearchParams) {
        let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS, search: searchArgs });

        return this.http.get(APP_SETTINGS.ACIDS_URL, options)
            .map(res => <Acid[]> res.json())
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
