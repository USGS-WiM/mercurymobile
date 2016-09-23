import {Injectable}        from '@angular/core';
import {Headers}           from '@angular/http';

@Injectable()
export class APP_SETTINGS {

  private static _environment: string = 'development';
  private static _API_ENDPOINT: string = APP_SETTINGS._environment == 'production' ? 'http://' + window.location.hostname + '/mercuryservices/' : 'http://localhost:8000/mercuryservices/';
  public static set environment (env: string) { this._environment = env };

  public static get AUTH_URL(): string { return this._API_ENDPOINT+'auth/' };
  public static get ACIDS_URL(): string { return this._API_ENDPOINT+'acids/' };
  public static get ANALYSES_URL(): string { return this._API_ENDPOINT+'analyses/' };
  public static get BOTTLES_URL(): string { return this._API_ENDPOINT+'bottles/' };
  public static get FILTERS_URL(): string { return this._API_ENDPOINT+'filters/' };
  public static get MEDIUMS_URL(): string { return this._API_ENDPOINT+'mediums/' };
  public static get PRESERVATIONS_URL(): string { return this._API_ENDPOINT+'preservations/' };
  public static get PROJECTS_URL(): string { return this._API_ENDPOINT+'projects/' };
  public static get SAMPLES_URL(): string { return this._API_ENDPOINT+'samples/' };
  public static get SAMPLEBOTTLES_URL(): string { return this._API_ENDPOINT+'samplebottles/' };
  public static get SITES_URL(): string { return this._API_ENDPOINT+'sites/' };
  public static get USERS_URL(): string { return this._API_ENDPOINT+'users/' };

  public static get MIN_JSON_HEADERS() { return new Headers({ 'Accept': 'application/json' }) };
  public static get JSON_HEADERS() { return new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' }) };
  public static get AUTH_HEADERS() { return new Headers({ 'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password'))}) };
  public static get MIN_AUTH_JSON_HEADERS() { return new Headers({
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')),
      'Accept': 'application/json' }
  )};
  public static get AUTH_JSON_HEADERS() { return new Headers({
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')),
      'Accept': 'application/json', 'Content-Type': 'application/json' }
  )};

}
