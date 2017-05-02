import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {APP_UTILITIES}   from '../../app/app.utilities';
import {ProjectService} from '../../app/project/project.service';
import {SiteService} from '../../app/site/site.service';
import {MediumService} from "../../app/medium/medium.service";
import {SampleService} from "../../app/sample/sample.service";
import {SampleBottleService} from "../../app/samplebottle/samplebottle.service";
import {AcidService} from "../../app/acid/acid.service";
import {BottleService} from "../../app/bottle/bottle.service";


@Component({
    templateUrl: 'config.html'
})
export class ConfigPage {
    constructor(public navCtrl: NavController,
                private _sampleService: SampleService,
                private _samplebottleService: SampleBottleService,
                private _projectService: ProjectService,
                private _siteService: SiteService,
                private _mediumService: MediumService,
                private _acidService: AcidService,
                private _bottleService: BottleService) {
    }

    fileDragHover(fileInput) {
        fileInput.stopPropagation();
        fileInput.preventDefault();
    }

    loadFile(type: string, fileInput: any) {
        let self = this;
        this.fileDragHover(fileInput);
        let selectedFiles = <Array<File>> fileInput.target.files || fileInput.dataTransfer.files;
        let reader = new FileReader();
        reader.onload = function (e) {
            switch(type) {
                case 'acids':
                    self._acidService.loadDB(reader.result);
                    break;
                case 'analyses':
                    //self._analysisService.loadDB(reader.result);
                    break;
                case 'bottles':
                    self._bottleService.loadDB(reader.result);
                    break;
                case 'filters':
                    //self._filterService.loadDB(reader.result);
                    break;
                case 'mediums':
                    self._mediumService.loadDB(reader.result);
                    break;
                case 'preservations':
                    //self._preservationService.loadDB(reader.result);
                    break;
                case 'projects':
                    self._projectService.loadDB(reader.result);
                    break;
                case 'samples':
                    self._sampleService.loadDB(reader.result);
                    break;
                case 'samplebottles':
                    //self._samplebottleService.loadDB(reader.result);
                    break;
                case 'sites':
                    self._siteService.loadDB(reader.result);
                    break;
            }

        };
        reader.readAsBinaryString(selectedFiles[0]);
    }

    dumpFiles(type: string) {
        let self = this;
        let filename = type + "_" + APP_UTILITIES.TODAY + ".txt";
        switch(type) {
            case 'acids':
                if (self._acidService.getAll().total_rows > 0) {
                  self._acidService.dumpDB(filename);
                }
                break;
            case 'analyses':
                //if (self._analysisService.getAll().total_rows > 0) {
                  //self._analysisService.dumpDB(filename);
                //}
                break;
            case 'bottles':
                if (self._bottleService.getAll().total_rows > 0) {
                  self._bottleService.dumpDB(filename);
                }
                break;
            case 'filters':
                //if (self._filterService.getAll().total_rows > 0) {
                  //self._filterService.dumpDB(filename);
                //}
                break;
            case 'mediums':
                if (self._mediumService.getAll().total_rows > 0) {
                  self._mediumService.dumpDB(filename);
                }
                break;
            case 'preservations':
                //if (self._preservationService.getAll().total_rows > 0) {
                  //self._preservationService.dumpDB(filename);
                //}
                break;
            case 'projects':
                if (self._projectService.getAll().total_rows > 0) {
                  self._projectService.dumpDB(filename);
                }
                break;
            case 'samples':
                if (self._sampleService.getAll().total_rows > 0) {
                  self._sampleService.dumpDB(filename);
                }
                break;
            case 'samplebottles':
                //if (self._samplebottleService.getAll().total_rows > 0) {
                  //self._samplebottleService.dumpDB(filename);
                //}
                break;
            case 'sites':
                if (self._siteService.getAll({include_docs: false, limit: 100}).total_rows > 0) {
                  self._siteService.dumpDB(filename);
                }
                break;
        }
    }

    destroyDB(type: string) {
        let self = this;
        switch(type) {
            case 'acids':
                self._acidService.destroyDB();
                break;
            case 'analyses':
                //self._analysisService.destroyDB();
                break;
            case 'bottles':
                self._bottleService.destroyDB();
                break;
            case 'filters':
                //self._filterService.destroyDB();
                break;
            case 'mediums':
                self._mediumService.destroyDB();
                break;
            case 'preservations':
                //self._preservationService.destroyDB();
                break;
            case 'projects':
                self._projectService.destroyDB();
                break;
            case 'samples':
                self._sampleService.destroyDB();
                break;
            case 'samplebottles':
                //self._samplebottleService.destroyDB();
                break;
            case 'sites':
                self._siteService.destroyDB();
                break;
        }
    }

}
