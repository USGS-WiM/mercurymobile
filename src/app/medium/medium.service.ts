import {Injectable}     from '@angular/core';
import {Http, Response, RequestOptions, URLSearchParams} from '@angular/http';
import {Medium}           from './medium';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {APP_SETTINGS}   from '../app.settings';
import {APP_UTILITIES}   from '../../app/app.utilities';
import {MEDIUMS} from './mediums';
import PouchDB from 'pouchdb';
import find from 'pouchdb-find';
import load from 'pouchdb-load';
import replicationStream from 'pouchdb-replication-stream';
import MemoryStream from 'memorystream';

@Injectable()
export class MediumService {
    private _db;
    //private _mediums;

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
            //this._db.bulkDocs(MEDIUMS);
            for (let medium of MEDIUMS) {
              //this._db.post(medium);
              this._db.put({
                _id: medium['nwis_code'],
                id: medium['id'],
                nwis_code: medium['nwis_code'],
                medium: medium['medium'],
                description: medium['description']
              });
            }
          }
        })
        .catch( error => {
          console.log(error)
        });
    }

    private _createDB() {
      this._db = new PouchDB('mediums');
    }

    destroyDB() {
      return this._db.destroy()
        .then(res => {
          this._createDB();
          return true;
        }).catch(error => {
          console.log(error);
          return false;
        });
    }

    loadDB(data) {
      return this._db.loadIt(data)
        .then(res => {
          return true;
        })
        .catch( error => {
          console.log(error);
          return false;
        });
    }

    dumpDB(filename: string) {
      let dumpedString = '';
      let stream = new MemoryStream();
      stream.on('data', function(chunk) {
        dumpedString += chunk.toString();
      });

      return this._db.dump(stream)
        .then(function() {
          APP_UTILITIES.downloadTXT({filename: filename, data: dumpedString});
          return true;
        }).catch(function(err) {
          console.log('dumpDB ERROR! ', err);
          return false;
      });
    }

    findMedium(val: string) {
      this._db.find({
        selector: {_id: val},
        fields: ['id', 'medium']
      }).then(function (result) {
        return result['docs'];
      }).catch(function (err) {
        console.log('medium find error');
      });
    }

    public getMediumsByName(val: string) {
      return this._db.allDocs({startkey: val, endkey: val+'\uffff', include_docs: false, limit: 100});
    }

    public getAll(opts?: any) {
        if (this._db) {
            if (!opts) {opts = {include_docs: true}}
            return this._db.allDocs(opts);
        }
        else {return false;}
    }

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
