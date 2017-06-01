import {Injectable}     from '@angular/core';
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

}
