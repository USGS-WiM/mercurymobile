import {Injectable}     from '@angular/core';
import {Http, Response, RequestOptions, URLSearchParams} from '@angular/http';
import {Acid}           from './acid';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {APP_SETTINGS}   from '../app.settings';
import {APP_UTILITIES}   from '../../app/app.utilities';
import {ACIDS} from './acids';
import PouchDB from 'pouchdb';
import find from 'pouchdb-find';
import load from 'pouchdb-load';
import replicationStream from 'pouchdb-replication-stream';
import MemoryStream from 'memorystream';


@Injectable()
export class AcidService {
    private _db;

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
            for (let acid of ACIDS) {
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

    private _createDB() {
      this._db = new PouchDB('acids');
    }

    destroyDB() {
      this._db.destroy()
        .then(res => {
          this._createDB();
        }).catch(error => {
          console.log(error);
        });
    }

    loadDB(data) {
      this._db.loadIt(data)
        .then(res => {
          console.log("load success");
        })
        .catch(error => {
          console.log(error);
        });
    }

    dumpDB(filename: string) {
      let dumpedString = '';
      let stream = new MemoryStream();
      stream.on('data', function(chunk) {
        dumpedString += chunk.toString();
      });

      this._db.dump(stream)
        .then(function() {
          //console.log('dumpDB SUCCESS! ' + dumpedString);
          APP_UTILITIES.downloadTXT({filename: filename, data: dumpedString});
        }).catch(function(err) {
          console.log('dumpDB ERROR! ', err);
      });
    }

    findAcid(val: number) {
      return this._db.find({
        selector: {id: val},
        fields: ['id', 'code'],
        sort: ['_id']
      }).then(function (result) {
        return result['docs'];
      }).catch(function (err) {
        console.log('acid find error');
      });
    }

    public getAcidsByName(val: string) {
      return this._db.allDocs({startkey: val, endkey: val+'\uffff', include_docs: false, limit: 100});
    }

    public getAll(opts?: any) {
        if (this._db) {
            if (!opts) {opts = {include_docs: true}}
            return this._db.allDocs(opts);
        }
        else {return false;}
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
