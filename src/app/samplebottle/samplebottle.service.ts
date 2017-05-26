import {Injectable}     from '@angular/core';
import {URLSearchParams} from '@angular/http';
import {SampleBottle}           from './samplebottle';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {APP_UTILITIES}   from '../app.utilities';
import {SAMPLEBOTTLES} from './mock-samplebottles'
import PouchDB from 'pouchdb';
import PouchDBLoad from 'pouchdb-load';
import replicationStream from 'pouchdb-replication-stream';
import MemoryStream from 'memorystream';


@Injectable()
export class SampleBottleService {

  public _db;
  //private _samplebottles;

  constructor() {
    PouchDB.plugin(replicationStream.plugin);
    PouchDB.adapter('writableStream', replicationStream.adapters.writableStream);
    PouchDB.plugin({loadIt: PouchDBLoad.load});
    this._createDB();
  }

  initDB() {
    this._db.allDocs()
      .then(result => {
        if(result.total_rows === 0) {
          for (let samplebottle of SAMPLEBOTTLES) {
            this._db.post(samplebottle);
          }
        }
      })
      .catch( error => {
        console.log(error)
      });
  }

  private _createDB() {
      this._db = new PouchDB('samplebottles');
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
        console.log("load success");
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
        //console.log('dumpDB SUCCESS! ' + dumpedString);
        APP_UTILITIES.downloadTXT({filename: filename, data: dumpedString});
        return true;
      }).catch(function(err) {
        console.log('dumpDB ERROR! ', err);
        return false;
    });
  }

  add(obj) {
      return this._db.post(obj);
  }

  update(obj) {
      return this._db.put(obj);
  }

  delete(obj) {
      return this._db.remove(obj);
  }

  findSampleBottle(val: string) {
      this._db.find({
          selector: {name: val},
          fields: ['id', 'name']
          //sort: ['_id']
      }).then(function (result) {
          return result['docs'];
      }).catch(function (err) {
          console.log('bottle find error');
      });
  }

  public getSampleBottlesBySample(val: string) {
      return this._db.allDocs({startkey: val, endkey: val+'\uffff', include_docs: true, limit: 100});
  }

  public getAll(opts?: any) {
        if (this._db) {
            if (!opts) {opts = {include_docs: true}}
            return this._db.allDocs(opts);
        }
        else {return false;}
    }

  public getOne(_id: string) {
      return this._db.get(_id);
  }

  getSampleBottle(id: number | string): Promise<SampleBottle> {
    let samplebottle = SAMPLEBOTTLES.filter(function (sb) {return sb['bottle'] == id;})[0];
    return Promise.resolve(samplebottle);
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
