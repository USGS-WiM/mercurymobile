import {Injectable}     from '@angular/core';
import {Http, Response, RequestOptions, URLSearchParams} from '@angular/http';
import {Bottle}           from './bottle';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {APP_SETTINGS}   from '../app.settings';
import {APP_UTILITIES}   from '../app.utilities';
import {BOTTLES} from './bottles';
import PouchDB from 'pouchdb';
import find from 'pouchdb-find';
import load from 'pouchdb-load';
import replicationStream from 'pouchdb-replication-stream';
import MemoryStream from 'memorystream';


@Injectable()
export class BottleService {
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
          console.log(result.total_rows);
          if(result.total_rows === 0) {
            console.log("start put bottles");
            let count = 0;
            for (let bottle of BOTTLES) {
              this._db.put({
                _id: bottle['name'],
                id: bottle['id'],
                name: bottle['name']
              });
              count++;
              if (count % 1000 == 0) {
                console.log(count);
              }
            }
            console.log("end put bottles");
          }
        })
        .catch( error => {
          console.log(error)
        });
      console.log("end init bottles");
    }

    private _createDB() {
      this._db = new PouchDB('bottles');
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
        console.log(dumpedString);
      });

      return this._db.dump(stream, {batch_size: 1000})
        .then(function() {
          console.log(dumpedString);
          APP_UTILITIES.downloadTXT({filename: filename, data: dumpedString});
          return true;
        }).catch(function(err) {
          console.log('dumpDB ERROR! ', err);
          return false;
      });
    }

    add(name: string) {
      this._db.put({
        _id: name,
        id: name,
        name: name
      });
    }

    findBottle(val: string) {
      this._db.find({
        selector: {_id: val},
        fields: ['id', 'name']
      }).then(function (result) {
        return result['docs'];
      }).catch(function (err) {
        console.log('bottle find error');
      });
    }

    public getBottlesByName(val: string) {
      return this._db.allDocs({startkey: val, endkey: val+'\uffff', include_docs: false, limit: 100});
    }

    public getAll(opts?: any) {
        if (this._db) {
            if (!opts) {opts = {include_docs: true}}
            return this._db.allDocs(opts);
        }
        else {return false;}
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
