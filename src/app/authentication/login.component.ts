import {Component} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {NavController, NavParams} from 'ionic-angular';
import {AuthenticationService} from './authentication.service';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html'
})

export class LoginComponent {
    form: FormGroup;
    error: boolean = false;
    constructor(fb: FormBuilder, public auth: AuthenticationService,
                public navCtrl: NavController, public navParams: NavParams,) {
        this.form = fb.group({
            username:  ['', Validators.required],
            password:  ['', Validators.required]
        });
    }

    onSubmit(value: any) {
        if (sessionStorage.getItem('username')) {this.auth.logout();}
        this.auth.login(value.username, value.password)
            .subscribe(
                (user: any) => this.navCtrl.push('home'),
                () => { this.error = true; }
            );
    }
}
