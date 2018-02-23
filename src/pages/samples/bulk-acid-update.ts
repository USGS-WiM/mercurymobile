import {Component} from '@angular/core';
import {NavParams, ViewController, AlertController} from 'ionic-angular';
import {AcidService} from '../../app/acid/acid.service';

@Component({
    templateUrl: 'acid-select.html',
})

export class BulkAcidUpdatePage {

    private _errorMessage: string;
    selectedacid: string = '';
    acids = [];
  
    constructor(        
        public navParams: NavParams,
        public viewCtrl: ViewController,
        private _acidService: AcidService,
        public alertCtrl: AlertController,
    ) {
      this._getAcids();
    }
  
    private _getAcids() {
      this._acidService.getAll({include_docs: true, limit: 100})
        .then(response =>
          {
            for(let i = 0; i < response.rows.length; i++) {
              this.acids.push(response.rows[i]['id']);
            }
            
          }, error => {
            this._errorMessage = <any>error;            
          });
    }
  
    filterAcids(event: any, element: any) {      
      let val = event.target.value;
      if (val && val.trim() != ''){
        this._acidService.getAcidsByName(val.toUpperCase())
          .then(response =>
          {
            this.acids.length = 0;
            for(let i = 0; i < response.rows.length; i++) {
              this.acids.push(response.rows[i]['id']);
            }
            setTimeout(() => {			
                element.setFocus();
            },50);
            
          }, error => {
            this._errorMessage = <any>error;            
          });
      }
      else {};
    }
  
    selectAcid(acid) {
        
        let confirm = this.alertCtrl.create({
            title: 'Bulk Update Acids',
            message: 'Are you sure you want to update ALL of the selected sites with ' + acid + ' acid?\n\n(This cannot be undone.)',
            buttons: [
                {
                    text: 'No',
                    handler: () => {
                        console.log('Disagree clicked');
                        this.viewCtrl.dismiss();     
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        this.viewCtrl.dismiss(acid);
                    }
                }
            ]
        });
        confirm.present();                   
    }
  
    dismiss() {
      this.viewCtrl.dismiss();
    }
}