import {Injectable}     from '@angular/core';
import {Http, Response, RequestOptions, URLSearchParams} from '@angular/http';
import {Project}           from './project';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {APP_SETTINGS}   from '../app.settings';
import {PROJECTS} from './projects';
import PouchDB from 'pouchdb';
import find from 'pouchdb-find';
import load from 'pouchdb-load';
import replicationStream from 'pouchdb-replication-stream';

@Injectable()
export class ProjectService {
    private _db;
    private _projects;

    constructor (private http: Http) {
      PouchDB.plugin(find);
      PouchDB.plugin(load);
      PouchDB.plugin(replicationStream.plugin);
      PouchDB.adapter('writableStream', replicationStream.adapters.writableStream);
      this._db = new PouchDB('projects');
      //this.destroyDB();
      this.initDB();
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

    destroyDB() {
      new PouchDB('projects').destroy();
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

    getAllProjects () {
        if (!this._projects) {
          return this._db.allDocs({ include_docs: true})
              .then(docs => {
                  this._projects = docs.rows.map(row => {
                      return row.doc;
                  });
                  return this._projects;
              });
      } else {
          // Return cached data as a promise
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
