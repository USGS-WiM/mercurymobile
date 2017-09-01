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
            for (let sitegroup of SITES) {
              for (let site of <Array <Site> >sitegroup) {
                let projects = site['projects'];
                let siteID;
                for (let project in projects) {
                  siteID = siteID + "_" + project;
                }
                this._db.put({
                  _id: siteID,
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

    findSite(val: string) {
      return this._db.find({
        selector: {id: val},
        fields: ['id', 'name', 'usgs_sid', 'usgs_scode',
          'description', 'latitude', 'longitude', 'datum',
          'method', 'site_status', 'nwis_customer_code', 'projects']
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
          fields: ['id', 'name', 'usgs_scode']
        }).then(function (result) {
          return result['docs'];
        }).catch(function (err) {
          console.log(err);
        });
    }

    public getSiteByID(val: string) {
        return this._db.allDocs({startkey: val, endkey: val+'\uffff', include_docs: true, limit: 1});
    }

    public getAll(opts: any) {
        return this._db.allDocs(opts);
    }

    public getOne(_id: string) {
        return this._db.get(_id);
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
