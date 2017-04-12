import {Injectable}     from '@angular/core';
import {Http, Response, RequestOptions, URLSearchParams} from '@angular/http';
import {Site}           from './site';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {APP_SETTINGS}   from '../app.settings';
import {SITES} from './sites';
import PouchDB from 'pouchdb';
import find from 'pouchdb-find';
import load from 'pouchdb-load';
import replicationStream from 'pouchdb-replication-stream';

@Injectable()
export class SiteService {
    private _db;
    private _sites;

    constructor (private http: Http) {
      PouchDB.plugin(find);
      PouchDB.plugin(load);
      PouchDB.plugin(replicationStream.plugin);
      PouchDB.adapter('writableStream', replicationStream.adapters.writableStream);
      this._db = new PouchDB('sites');
      //this.destroyDB();
      this.initDB();
    }

    initDB() {
      this._db.allDocs()
        .then(result => {
          if(result.total_rows === 0) {
            //this._db.bulkDocs(SITES);
            for (let site of SITES) {
              //this._db.post(site);
              this._db.put({
                _id: site['name'],
                id: site['id'],
                name: site['name'],
                usgs_scode: site['usgs_scode'],
                projects: site['projects']
              });
            }
          }
        })
        .catch( error => {
          console.log(error)
        });
      this._db.createIndex({
        index: {
          fields: ['projects'],
          name: 'projects',
          ddoc: 'projects'
        }
      });
    }

    destroyDB() {
      new PouchDB('sites').destroy();
    }

    findSite(val: string) {
      this._db.find({
        selector: {_id: val},
        fields: ['id', 'site']
        //sort: ['code']
      }).then(function (result) {
        return result['docs'];
      }).catch(function (err) {
        console.log('site find error');
      });
    }

    findSitesByProject(val: number) {
      console.log(val);
        return this._db.find({
          selector: {projects: {$elemMatch: {$eq: val}}},
          fields: ['id', 'name']
          //sort: ['code']
        }).then(function (result) {
          return result['docs'];
        }).catch(function (err) {
          console.log(err);
        });
    }

    public getAll() {
        return this._db.allDocs({include_docs: true});
    }

    getSite (id: number | string) {
        let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS });

        return this.http.get(APP_SETTINGS.SITES_URL+id+'/', options)
            .map(res => <Site> res.json())
            .catch(this.handleError);
    }

    getSites (searchArgs?: URLSearchParams) {
        let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS, search: searchArgs });

        return this.http.get(APP_SETTINGS.SITES_URL, options)
            .map(res => <Site[]> res.json())
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
