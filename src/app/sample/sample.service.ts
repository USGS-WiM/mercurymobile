import {Injectable}     from '@angular/core';
//import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {Sample}           from './sample';
//import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//import {APP_SETTINGS}   from '../app.settings';
import {SAMPLES} from './mock-samples'
import PouchDB from 'pouchdb';

@Injectable()
export class SampleService {

  private _db;
  private _samples;
  //PouchDB.debug.enable('*');

  constructor() {
     this._db = new PouchDB('samples');
  }

  initDB() {
    this._db.allDocs()
      .then(function (result) {
        if(result.total_rows === 0) {
          for (let sample of SAMPLES) {
            this._db.post(sample);
          }
        }
        console.log(result);
      })
      .catch(function (error) {
        console.log(error)
      });
  }

  destroyDB() {
    new PouchDB('samples').destroy();
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

  getAll() {

      if (!this._samples) {
          return this._db.allDocs({ include_docs: true})
              .then(docs => {

                  // Each row has a .doc object and we just want to send an
                  // array of birthday objects back to the calling controller,
                  // so let's map the array to contain just the .doc objects.

                  this._samples = docs.rows.map(row => {
                      // Dates are not automatically converted from a string.
                      //row.doc.Date = new Date(row.doc.Date);
                      return row.doc;
                  });

                  // Listen for changes on the database.
                  this._db.changes({ live: true, since: 'now', include_docs: true})
                      .on('change', this.onDatabaseChange);

                  return this._samples;
              });
      } else {
          // Return cached data as a promise
          return Promise.resolve(this._samples);
      }
  }

  private onDatabaseChange = (change) => {
      let index = this.findIndex(this._samples, change.id);
      let sample = this._samples[index];

      if (change.deleted) {
          if (sample) {
              this._samples.splice(index, 1); // delete
          }
      }
      else {
          //change.doc.Date = new Date(change.doc.Date);
          if (sample && sample._id === change.id) {
              this._samples[index] = change.doc; // update
          } else {
              this._samples.splice(index, 0, change.doc); // insert
          }
      }
  };

  // Binary search, the array is by default sorted by _id.
  private findIndex(array, id) {
      let low = 0, high = array.length, mid;
      while (low < high) {
      mid = (low + high) >>> 1;
      array[mid]._id < id ? low = mid + 1 : high = mid
      }
      return low;
  }

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
