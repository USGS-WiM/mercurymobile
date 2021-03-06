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
import { ObjectUnsubscribedError } from 'rxjs';


@Component({
    templateUrl: 'config.html'
})
export class ConfigPage {
    notready: Boolean = false;
    myServices = {};
    myServicesKeys = [];

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

        this.myServicesKeys = Object.keys(this.myServices);

        // this._acidService.initDB();
        // this._bottleService.initDB();
        // this._projectService.initDB();
        // this._siteService.initDB();
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
            self.myServices[srv].destroyDB().then(response => {
                self.myServices[srv].loadDB(reader.result).then(response => {self.notready = false;});
            });
            
        };
        reader.readAsBinaryString(selectedFiles[0]);
    }

    // loadFile(mySrv: string, fileInput: any) {
    //     console.log(mySrv);
    //     let srv = '';
    //     let self = this;
    //     this.fileDragHover(fileInput);
    //     let selectedFiles = <Array<File>> fileInput.target.files || fileInput.dataTransfer.files;
    //     let reader = new FileReader();
    //     reader.onload = function (e) {
    //         self.notready = true;
    //         self.myServices[srv].destroyDB().then(response => {
    //             self.myServices[srv].loadDB(reader.result).then(response => {self.notready = false;});
    //         });
            
    //     };
    //     const numFilesSelected = selectedFiles.length;
    //     let numFilesRead = 0;
    //     function readFiles() {
    //         if (numFilesSelected > numFilesRead) {
    //             const file = selectedFiles[numFilesRead];
    //             console.log(file);
    //             const fileName = file.name;
    //             console.log(fileName);
    //             if (mySrv != '' && mySrv != null && mySrv != 'all') {
    //                 srv = mySrv;
    //             } else {
    //                 srv = fileName.split('.')[0];
    //             }
    //             console.log(srv);
    //             if (self.myServicesKeys.indexOf(srv) > -1) {
    //                 console.log("Reading " + fileName + ".");
    //                 reader.onloadend = function (loadEvent) {
    //                     readFiles();
    //                 }
    //                 reader.readAsBinaryString(file);
    //             } else {
    //                 console.log("Skipping " + fileName + ", no matching database found.");
    //             }
    //             numFilesRead++;
    //         }
    //     }
    //     readFiles();
    // }

    // loadAllFiles(srv: string, fileInput: any) {
    //     let self = this;
        
    //     let selectedFiles = <Array<File>> fileInput.target.files || fileInput.dataTransfer.files;
    //     let reader = new FileReader();
    //     reader.onload = function (e) {
    //         self.notready = true;
    //         self.myServices[srv].destroyDB().then(response => {
    //             self.myServices[srv].loadDB(reader.result).then(response => {self.notready = false;});
    //         });
    //     };
    //     const numFilesSelected = selectedFiles.length;
    //     let numFilesRead = 0;
    //     function readFiles() {
    //         if (numFilesSelected > numFilesRead) {
    //             const file = selectedFiles[numFilesRead];
    //             const fileName = file.name;
    //             srv = fileName.split('.')[0];
    //             if (self.myServicesKeys.indexOf(srv) > -1) {
    //                 reader.onloadend = function (loadEvent) {
    //                     readFiles();
    //                 }
    //                 reader.readAsBinaryString(file);
    //             } else {
    //                 console.log("Skipping " + fileName + ", no matching database found.");
    //             }
    //             numFilesRead++;
    //         }
    //     }
    //     readFiles();
    // }

    
    
    dumpFile(service: string) {
        let self = this;
        self.notready = true;
        if (service == "all") {
            let services = Object.keys(self.myServices);
            for (let service of services) {
                this._callDump(service);
            }
        }
        else {
            this._callDump(service);
        }
    }

    private _callDump(service: string) {
        let filename = service + "_" + APP_UTILITIES.TODAY + ".txt";
        this.myServices[service].getAll({include_docs: false, limit: 1}).then(response => {
            if (response.total_rows > 0) {
                this.myServices[service].dumpDB(filename).then(response => {this.notready = false;});
            }
        });
    }

    destroyDB(service: string) {
        let self = this;
        self.notready = true;
        if (service == "all") {
            let services = Object.keys(self.myServices);
            for (let service of services) {
                this._callDestroy(service);
            }
        }
        else {
            this._callDestroy(service);
        }
    }

    private _callDestroy(service: string) {
        this.myServices[service].destroyDB().then(response => {this.notready = false;});
    }

}
