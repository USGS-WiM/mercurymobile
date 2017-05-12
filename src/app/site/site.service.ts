import {Injectable}     from '@angular/core';
import {Http, Response, RequestOptions, URLSearchParams} from '@angular/http';
import {Site}           from './site';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {APP_SETTINGS}   from '../app.settings';
import {APP_UTILITIES}   from '../../app/app.utilities';
import {SITES} from './sites';
import PouchDB from 'pouchdb';
import find from 'pouchdb-find';
import load from 'pouchdb-load';
import replicationStream from 'pouchdb-replication-stream';
import MemoryStream from 'memorystream';


@Injectable()
export class SiteService {
    private _db;

    constructor (private http: Http) {
      PouchDB.plugin(find);
      PouchDB.plugin(load);
      PouchDB.plugin(replicationStream.plugin);
      PouchDB.adapter('writableStream', replicationStream.adapters.writableStream);
      this._createDB();
    }

    initDB() {
      console.log("start init sites");
      this._db.allDocs()
        .then(result => {
          //console.log(result.total_rows);
          if(result.total_rows === 0) {
            console.log("start put sites");
            let count = 0;
            for (let site of SITES) {
              this._db.put({
                _id: site['name'],
                id: site['id'],
                name: site['name'],
                usgs_scode: site['usgs_scode'],
                description: site['description'],
                latitude: site['latitude'],
                longitude: site['longitude'],
                datum: site['datum'],
                method: site['method'],
                site_status: site['site_status'],
                nwis_customer_code: site['nwis_customer_code'],
                projects: site['projects']
              });
              count++;
              if (count % 1000 == 0) {
                console.log(count);
              }
            }
            console.log("end put sites");
          }
        })
        .catch( error => {
          console.log(error)
        });
      console.log("end init sites");
    }

    private _createDB() {
      this._db = new PouchDB('sites');
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
      let count = 0;
      stream.on('data', function(chunk) {
        dumpedString += chunk.toString();
        count++;
        console.log(count);
      });

      this._db.dump(stream)
        .then(function() {
          //console.log('dumpDB SUCCESS! ' + dumpedString);
          APP_UTILITIES.downloadTXT({filename: filename, data: dumpedString});
        }).catch(function(err) {
          console.log('dumpDB ERROR! ', err);
      });
    }

    findSite(val: string) {
      return this._db.find({
        selector: {id: val},
        fields: ['id', 'name', 'usgs_sid', 'usgs_scode',
          'description', 'latitude', 'longitude', 'datum',
          'method', 'site_status', 'nwis_customer_code', 'projects']
        //sort: ['site']
      }).then(function (result) {
        return result['docs'][0];
      }).catch(function (err) {
        console.log('site find error: ' + err);
      });
    }

    findSitesByProject(val: number) {
        return this._db.find({
          selector: {projects: {$elemMatch: {$eq: val}}},
          //selector: {_id: {$elemMatch: {$regex: "^" + val}}},
          fields: ['id', 'name', 'usgs_scode'],
          sort: ['code']
        }).then(function (result) {
          console.log(result);
          return result['docs'];
        }).catch(function (err) {
          console.log(err);
        });
    }

    public getSitesByProject(val: string) {
      return this._db.allDocs({startkey: val, endkey: val+'\uffff', include_docs: true, limit: 100});
    }

    public getAll(opts?: any) {
        if (this._db) {
            if (!opts) {opts = {include_docs: true}}
            return this._db.allDocs(opts);
        }
        else {return false;}
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
