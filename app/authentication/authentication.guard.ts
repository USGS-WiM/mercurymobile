import {CanActivate}    from '@angular/router';
import {isLoggedin}     from '../authentication/is-loggedin';

export class AuthenticationGuard implements CanActivate {
    canActivate() {
        return isLoggedin();
    }
}