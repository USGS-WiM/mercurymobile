import {Injectable}     from '@angular/core';
//import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
//import {Sample}           from './sample';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {APP_UTILITIES}   from '../../app/app.utilities';
import {SAMPLES} from './mock-samples';
import PouchDB from 'pouchdb';
import PouchDBLoad from 'pouchdb-load';
import replicationStream from 'pouchdb-replication-stream';
import MemoryStream from 'memorystream';

@Injectable()
export class SampleService{

  public _db;
  //private _samples;

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
          for (let sample of SAMPLES) {
            this._db.post(sample);
          }
        }
      })
      .catch( error => {
        console.log(error)
      });
  }

  private _createDB() {
      this._db = new PouchDB('samples');
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

  add(sample) {
      return this._db.post(sample);
  }

  update(sample) {
      return this._db.put(sample);
  }

  delete(sample) {
      return this._db.remove(sample);
  }

  public getSampleByID(val: string) {
      return this._db.allDocs({startkey: val, endkey: val+'\uffff', include_docs: true, limit: 1});
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

  // getSample(id: number | string): Promise<Sample> {
  //   let newid: number = +id - 1;
  //   return Promise.resolve(SAMPLES[newid]);
  // }

  // getSamples(): Promise<Sample[]> {
  //   return Promise.resolve(SAMPLES);
  // }

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
