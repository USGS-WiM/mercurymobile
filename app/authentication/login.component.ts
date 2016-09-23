import {Component} from '@angular/core';
import {REACTIVE_FORM_DIRECTIVES, FormBuilder, Validators, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Component({
    selector: 'login',
    directives: [ REACTIVE_FORM_DIRECTIVES ],
    templateUrl: 'login.component.html'
})

export class LoginComponent {
    form: FormGroup;
    error: boolean = false;
    constructor(fb: FormBuilder, public auth: AuthenticationService, public router: Router) {
        this.form = fb.group({
            username:  ['', Validators.required],
            password:  ['', Validators.required]
        });
    }

    onSubmit(value: any) {
        if (sessionStorage.getItem('username')) {this.auth.logout();}
        this.auth.login(value.username, value.password)
            .subscribe(
                (user: any) => this.router.navigateByUrl('home'),
                () => { this.error = true; }
            );
    }
}
