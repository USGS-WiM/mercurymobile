import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/observable/of';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {Router, ROUTER_DIRECTIVES}    from '@angular/router';
import {APP_SETTINGS}   from '../app.settings';
import {User} from '../users/user'

@Injectable()
export class AuthenticationService {
    user: User;

    constructor(private _http: Http, private _router: Router) {}

    login(username: string, password: string) {
        let options = new RequestOptions({headers: new Headers({ "Authorization": "Basic " + btoa(username + ":" + password)})});

        return this._http.post(APP_SETTINGS.AUTH_URL, null, options)
            .map((res : any) => {
                this.user = res.json();
                if (this.user.is_staff) {
                    sessionStorage.setItem('username', username);
                    sessionStorage.setItem('password', password);
                    sessionStorage.setItem('first_name', this.user.first_name);
                    sessionStorage.setItem('last_name', this.user.last_name);
                    sessionStorage.setItem('email', this.user.email);
                    sessionStorage.setItem('is_staff', this.user.is_staff.toString());
                }
                else {
                    // TODO: do something more professional here
                    alert('This user is not authorized!');
                }
            });

    }

  logout() {

      this._router.navigate(['/login']);
      this.user = undefined;
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('password');
      sessionStorage.removeItem('first_name');
      sessionStorage.removeItem('last_name');
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('is_staff');
      return Observable.of(true);

  }
}
