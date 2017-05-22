import {Injectable}     from '@angular/core';
import {Http, Response, RequestOptions, URLSearchParams} from '@angular/http';
import {Project}           from './project';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {APP_SETTINGS}   from '../app.settings';
import {APP_UTILITIES}   from '../../app/app.utilities';
import {PROJECTS} from './projects';
import PouchDB from 'pouchdb';
import find from 'pouchdb-find';
import load from 'pouchdb-load';
import replicationStream from 'pouchdb-replication-stream';
import MemoryStream from 'memorystream';

@Injectable()
export class ProjectService {
    private _db;
    private _projects;

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
            //this._db.bulkDocs(PROJECTS);
            for (let project of PROJECTS) {
              //this._db.post(analysis);
              this._db.put({
                _id: project['name'],
                id: project['id'],
                name: project['name'],
                sites: project['sites']
              });
            }
          }
        })
        .catch( error => {
          console.log(error)
        });
    }

    private _createDB() {
      this._db = new PouchDB('projects');
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

    findProject(val: string) {
      this._db.find({
        selector: {_id: val},
        fields: ['id', 'name']
        //sort: ['code']
      }).then(function (result) {
        return result['docs'];
      }).catch(function (err) {
        console.log('project find error');
      });
    }

    public getProjectByName(val: string) {
      return this._db.allDocs({startkey: val, endkey: val+'\uffff', include_docs: true, limit: 100});
    }

    public getAll(opts?: any) {
        if (this._db) {
            if (!opts) {opts = {include_docs: true}}
            return this._db.allDocs(opts);
        }
        else {return false;}
    }

    getAllProjects() {
      if (!this._projects) {
          this._db.allDocs({ include_docs: true})
              .then(docs => {
                  this._projects = docs.rows.map(row => {
                      return row.doc;
                  });
                  Promise.resolve(this._projects);
              });
      } else {
          return Promise.resolve(this._projects);
      }
  }

    getProject (id: number | string) {
        let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS });

        return this.http.get(APP_SETTINGS.PROJECTS_URL+id+'/', options)
            .map(res => <Project> res.json()[0])
            .catch(this.handleError);
    }

    getProjects (searchArgs?: URLSearchParams) {
        let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS, search: searchArgs });

        return this.http.get(APP_SETTINGS.PROJECTS_URL, options)
            .map(res => <Project[]> res.json())
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
