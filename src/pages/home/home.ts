import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {BottleService} from "../../app/bottle/bottle.service";


@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController, private _bottleService: BottleService) {}
}