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
import {AnalysisService} from "../../app/analysis/analysis.service";
import {FilterService} from "../../app/filter/filter.service";
import {PreservationService} from "../../app/preservation/preservation.service";


@Component({
    templateUrl: 'config.html'
})
export class ConfigPage {
    notready: Boolean = false;
    myServices = {};

    constructor(public navCtrl: NavController,
                private _sampleService: SampleService,
                private _samplebottleService: SampleBottleService,
                private _projectService: ProjectService,
                private _siteService: SiteService,
                private _mediumService: MediumService,
                private _acidService: AcidService,
                private _bottleService: BottleService,
                private _analysisService: AnalysisService,
                private _filterService: FilterService,
                private _preservationService: PreservationService) {
        this.myServices["acids"] = this._acidService;
        this.myServices["analyses"] = this._analysisService;
        this.myServices["bottles"] = this._bottleService;
        this.myServices["filters"] = this._filterService;
        this.myServices["mediums"] = this._mediumService;
        this.myServices["preservations"] = this._preservationService;
        this.myServices["projects"] = this._projectService;
        this.myServices["samples"] = this._sampleService;
        this.myServices["samplebottles"] = this._samplebottleService;
        this.myServices["sites"] = this._siteService;
    }

    fileDragHover(fileInput) {
        fileInput.stopPropagation();
        fileInput.preventDefault();
    }

    loadFile(srv: string, fileInput: any) {
        let self = this;
        this.fileDragHover(fileInput);
        let selectedFiles = <Array<File>> fileInput.target.files || fileInput.dataTransfer.files;
        let reader = new FileReader();
        reader.onload = function (e) {
            self.notready = true;
            self.myServices[srv].destroyDB().then(response => {self.notready = false;});
        };
        reader.readAsBinaryString(selectedFiles[0]);
    }
    //         switch(type) {
    //             case 'acids':
    //                 self.notready = true;
    //                 self._acidService.loadDB(reader.result).then(response => {self.notready = false;});
    //                 break;
    //             case 'analyses':
    //                 self.notready = true;
    //                 self._analysisService.loadDB(reader.result).then(response => {self.notready = false;});
    //                 break;
    //             case 'bottles':
    //                 self.notready = true;
    //                 self._bottleService.loadDB(reader.result).then(response => {self.notready = false;});
    //                 break;
    //             case 'filters':
    //                 self.notready = true;
    //                 self._filterService.loadDB(reader.result).then(response => {self.notready = false;});
    //                 break;
    //             case 'mediums':
    //                 self.notready = true;
    //                 self._mediumService.loadDB(reader.result).then(response => {self.notready = false;});
    //                 break;
    //             case 'preservations':
    //                 self.notready = true;
    //                 self._preservationService.loadDB(reader.result).then(response => {console.log(response); self.notready = false;});
    //                 break;
    //             case 'projects':
    //                 self.notready = true;
    //                 self._projectService.loadDB(reader.result).then(response => {self.notready = false;});
    //                 break;
    //             case 'samples':
    //                 self.notready = true;
    //                 self._sampleService.loadDB(reader.result).then(response => {self.notready = false;});
    //                 break;
    //             case 'samplebottles':
    //                 self.notready = true;
    //                 self._samplebottleService.loadDB(reader.result).then(response => {self.notready = false;});
    //                 break;
    //             case 'sites':
    //                 self.notready = true;
    //                 self._siteService.loadDB(reader.result).then(response => {self.notready = false;});
    //                 break;
    //         }

    //     };
    //     reader.readAsBinaryString(selectedFiles[0]);
    // }

    
    dumpFile(srv: string) {
        let self = this;
        let filename = srv + "_" + APP_UTILITIES.TODAY + ".txt";
        self.notready = true;
        self.myServices[srv].getAll({include_docs: false, limit: 1}).then(response => {
            if (response.total_rows > 0) {
                self.myServices[srv].dumpDB(filename).then(response => {self.notready = false;});
            }
        });
    }
        // switch(type) {
        //     case 'acids':
        //         self.notready = true;
        //         self._acidService.getAll({include_docs: false, limit: 1}).then(response => {
        //             if (response.total_rows > 0) {
        //               self._acidService.dumpDB(filename).then(response => {self.notready = false;});
        //             }
        //         });
        //         break;
        //     case 'analyses':
        //         self.notready = true;
        //         self._analysisService.getAll({include_docs: false, limit: 1}).then(response => {
        //             if (response.total_rows > 0) {
        //               self._analysisService.dumpDB(filename).then(response => {self.notready = false;});
        //             }
        //         });
        //         break;
        //     case 'bottles':
        //         self.notready = true;
        //         self._bottleService.getAll({include_docs: false, limit: 1}).then(response => {
        //             if (response.total_rows > 0) {
        //               self._bottleService.dumpDB(filename).then(response => {self.notready = false;});
        //             }
        //         });
        //         break;
        //     case 'filters':
        //         self.notready = true;
        //         self._filterService.getAll({include_docs: false, limit: 1}).then(response => {
        //             if (response.total_rows > 0) {
        //               self._filterService.dumpDB(filename).then(response => {self.notready = false;});
        //             }
        //         });
        //         break;
        //     case 'mediums':
        //         self.notready = true;
        //         self._mediumService.getAll({include_docs: false, limit: 1}).then(response => {
        //             if (response.total_rows > 0) {
        //               self._mediumService.dumpDB(filename).then(response => {self.notready = false;});
        //             }
        //         });
        //         break;
        //     case 'preservations':
        //         self.notready = true;
        //         self._preservationService.getAll({include_docs: false, limit: 1}).then(response => {
        //             if (response.total_rows > 0) {
        //               self._preservationService.dumpDB(filename).then(response => {self.notready = false;});
        //             }
        //         });
        //         break;
        //     case 'projects':
        //         self.notready = true;
        //         self._projectService.getAll({include_docs: false, limit: 1}).then(response => {
        //             if (response.total_rows > 0) {
        //               self._projectService.dumpDB(filename).then(response => {self.notready = false;});
        //             }
        //         });
        //         break;
        //     case 'samples':
        //         self.notready = true;
        //         self._sampleService.getAll({include_docs: false, limit: 1}).then(response => {
        //             if (response.total_rows > 0) {
        //               self._sampleService.dumpDB(filename).then(response => {self.notready = false;});
        //             }
        //         });
        //         break;
        //     case 'samplebottles':
        //         self.notready = true;
        //         self._samplebottleService.getAll({include_docs: false, limit: 1}).then(response => {
        //             if (response.total_rows > 0) {
        //               self._samplebottleService.dumpDB(filename).then(response => {self.notready = false;});
        //             }
        //         });
        //         break;
        //     case 'sites':
        //         self.notready = true;
        //         self._siteService.getAll({include_docs: false, limit: 1}).then(response => {
        //             if (response.total_rows > 0) {
        //               self._siteService.dumpDB(filename).then(response => {self.notready = false;});
        //             }
        //         });
        //         break;
        // }
    // }

    destroyDB(srv: string) {
        let self = this;
        self.notready = true;
        self.myServices[srv].destroyDB().then(response => {self.notready = false;});
    }
    //     switch(type) {
    //         case 'acids':
    //             self.notready = true;
    //             self._acidService.destroyDB().then(response => {self.notready = false;});
    //             break;
    //         case 'analyses':
    //             self.notready = true;
    //             self._analysisService.destroyDB().then(response => {self.notready = false;});
    //             break;
    //         case 'bottles':
    //             self.notready = true;
    //             self._bottleService.destroyDB().then(response => {self.notready = false;});
    //             break;
    //         case 'filters':
    //             self.notready = true;
    //             self._filterService.destroyDB().then(response => {self.notready = false;});
    //             break;
    //         case 'mediums':
    //             self.notready = true;
    //             self._mediumService.destroyDB().then(response => {self.notready = false;});
    //             break;
    //         case 'preservations':
    //             self.notready = true;
    //             self._preservationService.destroyDB().then(response => {self.notready = false;});
    //             break;
    //         case 'projects':
    //             self.notready = true;
    //             self._projectService.destroyDB().then(response => {self.notready = false;});
    //             break;
    //         case 'samples':
    //             self.notready = true;
    //             self._sampleService.destroyDB().then(response => {self.notready = false;});
    //             break;
    //         case 'samplebottles':
    //             self.notready = true;
    //             self._samplebottleService.destroyDB().then(response => {self.notready = false;});
    //             break;
    //         case 'sites':
    //             self.notready = true;
    //             self._siteService.destroyDB().then(response => {self.notready = false;});
    //             break;
    //     }
    // }

}
