import {Injectable}     from '@angular/core';
//import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {Sample}           from './sample';
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
      .catch( error => {
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

  add(sample) {
      return this._db.post(sample);
  }

  update(sample) {
      return this._db.put(sample);
  }

  delete(sample) {
      return this._db.remove(sample);
  }

  public getAll() {
      return this._db.allDocs({include_docs: true});
  }

  // Binary search, the array is by default sorted by _id.
  // private findIndex(array, id) {
  //     let low = 0, high = array.length, mid;
  //     while (low < high) {
  //     mid = (low + high) >>> 1;
  //     array[mid]._id < id ? low = mid + 1 : high = mid
  //     }
  //     return low;
  // }

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
