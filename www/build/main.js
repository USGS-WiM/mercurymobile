webpackJsonp([0],{

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_settings__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_app_utilities__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_pouchdb__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_pouchdb___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_pouchdb__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_pouchdb_find__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_pouchdb_find___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_pouchdb_find__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_pouchdb_load__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_pouchdb_load___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_pouchdb_load__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_memorystream__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_memorystream___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_memorystream__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







//import {PROJECTS} from './projects';





var ProjectService = (function () {
    function ProjectService(http) {
        this.http = http;
        __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a.plugin(__WEBPACK_IMPORTED_MODULE_8_pouchdb_find___default.a);
        __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a.plugin(__WEBPACK_IMPORTED_MODULE_9_pouchdb_load___default.a);
        __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a.plugin(__WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream___default.a.plugin);
        __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a.adapter('writableStream', __WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream___default.a.adapters.writableStream);
        this._createDB();
    }
    ProjectService.prototype.initDB = function () {
        this._db.allDocs()
            .then(function (result) {
            if (result.total_rows === 0) {
                //this._db.bulkDocs(PROJECTS);
                /*for (let project of PROJECTS) {
                  //this._db.post(analysis);
                  this._db.put({
                    _id: project['name'],
                    id: project['id'],
                    name: project['name'],
                    sites: project['sites']
                  });
                }*/
            }
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    ProjectService.prototype._createDB = function () {
        this._db = new __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a('projects');
    };
    ProjectService.prototype.destroyDB = function () {
        var _this = this;
        return this._db.destroy()
            .then(function (res) {
            _this._createDB();
            return true;
        }).catch(function (error) {
            console.log(error);
            return false;
        });
    };
    ProjectService.prototype.loadDB = function (data) {
        return this._db.loadIt(data)
            .then(function (res) {
            return true;
        })
            .catch(function (error) {
            console.log(error);
            return false;
        });
    };
    ProjectService.prototype.dumpDB = function (filename) {
        var dumpedString = '';
        var stream = new __WEBPACK_IMPORTED_MODULE_11_memorystream___default.a();
        stream.on('data', function (chunk) {
            dumpedString += chunk.toString();
        });
        return this._db.dump(stream)
            .then(function () {
            __WEBPACK_IMPORTED_MODULE_6__app_app_utilities__["a" /* APP_UTILITIES */].downloadTXT({ filename: filename, data: dumpedString });
            return true;
        }).catch(function (err) {
            console.log('dumpDB ERROR! ', err);
            return false;
        });
    };
    ProjectService.prototype.add = function (sample) {
        return this._db.post(sample);
    };
    ProjectService.prototype.update = function (sample) {
        return this._db.put(sample);
    };
    ProjectService.prototype.delete = function (sample) {
        return this._db.remove(sample);
    };
    ProjectService.prototype.findProject = function (val) {
        this._db.find({
            selector: { _id: val },
            fields: ['id', 'name']
        }).then(function (result) {
            return result['docs'];
        }).catch(function (err) {
            console.log('project find error');
        });
    };
    ProjectService.prototype.findProjectByID = function (val) {
        return this._db.find({
            selector: { id: val },
        }).then(function (result) {
            return result['docs'];
        }).catch(function (err) {
            console.log('project find error');
        });
    };
    ProjectService.prototype.getProjectByName = function (val) {
        return this._db.allDocs({ startkey: val, endkey: val + '\uffff', include_docs: true, limit: 100 });
    };
    ProjectService.prototype.getAll = function (opts) {
        if (this._db) {
            if (!opts) {
                opts = { include_docs: true };
            }
            return this._db.allDocs(opts);
        }
        else {
            return false;
        }
    };
    ProjectService.prototype.getAllProjects = function () {
        var _this = this;
        if (!this._projects) {
            this._db.allDocs({ include_docs: true })
                .then(function (docs) {
                _this._projects = docs.rows.map(function (row) {
                    return row.doc;
                });
                Promise.resolve(_this._projects);
            });
        }
        else {
            return Promise.resolve(this._projects);
        }
    };
    ProjectService.prototype.getProject = function (id) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: __WEBPACK_IMPORTED_MODULE_5__app_settings__["a" /* APP_SETTINGS */].MIN_AUTH_JSON_HEADERS });
        return this.http.get(__WEBPACK_IMPORTED_MODULE_5__app_settings__["a" /* APP_SETTINGS */].PROJECTS_URL + id + '/', options)
            .map(function (res) { return res.json()[0]; })
            .catch(this.handleError);
    };
    ProjectService.prototype.getProjects = function (searchArgs) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: __WEBPACK_IMPORTED_MODULE_5__app_settings__["a" /* APP_SETTINGS */].MIN_AUTH_JSON_HEADERS, search: searchArgs });
        return this.http.get(__WEBPACK_IMPORTED_MODULE_5__app_settings__["a" /* APP_SETTINGS */].PROJECTS_URL, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ProjectService.prototype.handleError = function (error) {
        // TODO figure out a better error handler
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error');
    };
    return ProjectService;
}());
ProjectService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], ProjectService);

//# sourceMappingURL=project.service.js.map

/***/ }),

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BottleService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_settings__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_utilities__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_pouchdb__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_pouchdb___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_pouchdb__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_pouchdb_find__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_pouchdb_find___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_pouchdb_find__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_pouchdb_load__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_pouchdb_load___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_pouchdb_load__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_memorystream__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_memorystream___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_memorystream__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







//import {BOTTLES} from './bottles';





var BottleService = (function () {
    function BottleService(http) {
        this.http = http;
        __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a.plugin(__WEBPACK_IMPORTED_MODULE_8_pouchdb_find___default.a);
        __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a.plugin(__WEBPACK_IMPORTED_MODULE_9_pouchdb_load___default.a);
        __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a.plugin(__WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream___default.a.plugin);
        __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a.adapter('writableStream', __WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream___default.a.adapters.writableStream);
        this._createDB();
    }
    BottleService.prototype.initDB = function () {
        this._db.allDocs()
            .then(function (result) {
            //console.log(result.total_rows);
            if (result.total_rows === 0) {
                console.log("start put bottles");
                var count = 0;
                /*for (let bottle of BOTTLES) {
                  this._db.put({
                    _id: bottle['name'],
                    id: bottle['id'],
                    name: bottle['name']
                  });
                  count++;
                  if (count % 1000 == 0) {
                    console.log(count);
                  }
                }*/
                console.log("end put bottles");
            }
        })
            .catch(function (error) {
            console.log(error);
        });
        console.log("end init bottles");
    };
    BottleService.prototype._createDB = function () {
        this._db = new __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a('bottles');
    };
    BottleService.prototype.destroyDB = function () {
        var _this = this;
        return this._db.destroy()
            .then(function (res) {
            _this._createDB();
            return true;
        }).catch(function (error) {
            console.log(error);
            return false;
        });
    };
    BottleService.prototype.loadDB = function (data) {
        return this._db.loadIt(data)
            .then(function (res) {
            return true;
        })
            .catch(function (error) {
            console.log(error);
            return false;
        });
    };
    BottleService.prototype.dumpDB = function (filename) {
        var dumpedString = '';
        var stream = new __WEBPACK_IMPORTED_MODULE_11_memorystream___default.a();
        stream.on('data', function (chunk) {
            dumpedString += chunk.toString();
        });
        return this._db.dump(stream, { batch_size: 1000 })
            .then(function () {
            // console.log(dumpedString);
            __WEBPACK_IMPORTED_MODULE_6__app_utilities__["a" /* APP_UTILITIES */].downloadTXT({ filename: filename, data: dumpedString });
            return true;
        }).catch(function (err) {
            console.log('dumpDB ERROR! ', err);
            return false;
        });
    };
    BottleService.prototype.add = function (name) {
        this._db.put({
            _id: name,
            id: name,
            name: name
        });
    };
    BottleService.prototype.findBottle = function (val) {
        this._db.find({
            selector: { _id: val },
            fields: ['id', 'name']
        }).then(function (result) {
            return result['docs'];
        }).catch(function (err) {
            console.log('bottle find error');
        });
    };
    BottleService.prototype.getBottlesByName = function (val) {
        return this._db.allDocs({ startkey: val, endkey: val + '\uffff', include_docs: false, limit: 100 });
    };
    BottleService.prototype.getAll = function (opts) {
        if (this._db) {
            if (!opts) {
                opts = { include_docs: true };
            }
            return this._db.allDocs(opts);
        }
        else {
            return false;
        }
    };
    BottleService.prototype.getBottle = function (id) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: __WEBPACK_IMPORTED_MODULE_5__app_settings__["a" /* APP_SETTINGS */].MIN_AUTH_JSON_HEADERS });
        return this.http.get(__WEBPACK_IMPORTED_MODULE_5__app_settings__["a" /* APP_SETTINGS */].BOTTLES_URL + id + '/', options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BottleService.prototype.getBottles = function (searchArgs) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: __WEBPACK_IMPORTED_MODULE_5__app_settings__["a" /* APP_SETTINGS */].MIN_AUTH_JSON_HEADERS, search: searchArgs });
        return this.http.get(__WEBPACK_IMPORTED_MODULE_5__app_settings__["a" /* APP_SETTINGS */].BOTTLES_URL, options)
            .map(function (res) { return res.json().results; })
            .catch(this.handleError);
    };
    BottleService.prototype.handleError = function (error) {
        // TODO figure out a better error handler
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error');
    };
    return BottleService;
}());
BottleService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], BottleService);

var _a;
//# sourceMappingURL=bottle.service.js.map

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnalysisService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_settings__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_utilities__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_pouchdb__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_pouchdb___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_pouchdb__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_pouchdb_find__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_pouchdb_find___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_pouchdb_find__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_pouchdb_load__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_pouchdb_load___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_pouchdb_load__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_memorystream__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_memorystream___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_memorystream__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







//import {ANALYSES} from './analyses';





var AnalysisService = (function () {
    //private _analyses;
    function AnalysisService(http) {
        this.http = http;
        __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a.plugin(__WEBPACK_IMPORTED_MODULE_8_pouchdb_find___default.a);
        __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a.plugin(__WEBPACK_IMPORTED_MODULE_9_pouchdb_load___default.a);
        __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a.plugin(__WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream___default.a.plugin);
        __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a.adapter('writableStream', __WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream___default.a.adapters.writableStream);
        this._createDB();
    }
    AnalysisService.prototype.initDB = function () {
        this._db.allDocs()
            .then(function (result) {
            if (result.total_rows === 0) {
                //this._db.bulkDocs(ANALYSES);
                /*for (let analysis of ANALYSES) {
                  //this._db.post(analysis);
                  this._db.put({
                    _id: analysis['analysis'],
                    id: analysis['id'],
                    analysis: analysis['analysis'],
                    constituents: analysis['constituents']
                  });
                }*/
            }
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    AnalysisService.prototype._createDB = function () {
        this._db = new __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a('analyses');
    };
    AnalysisService.prototype.destroyDB = function () {
        var _this = this;
        return this._db.destroy()
            .then(function (res) {
            _this._createDB();
            return true;
        }).catch(function (error) {
            console.log(error);
            return false;
        });
    };
    AnalysisService.prototype.loadDB = function (data) {
        return this._db.loadIt(data)
            .then(function (res) {
            return true;
        })
            .catch(function (error) {
            console.log(error);
            return false;
        });
    };
    AnalysisService.prototype.dumpDB = function (filename) {
        var dumpedString = '';
        var stream = new __WEBPACK_IMPORTED_MODULE_11_memorystream___default.a();
        stream.on('data', function (chunk) {
            dumpedString += chunk.toString();
        });
        return this._db.dump(stream)
            .then(function () {
            __WEBPACK_IMPORTED_MODULE_6__app_utilities__["a" /* APP_UTILITIES */].downloadTXT({ filename: filename, data: dumpedString });
            return true;
        }).catch(function (err) {
            console.log('dumpDB ERROR! ', err);
            return false;
        });
    };
    AnalysisService.prototype.findAnalysis = function (val) {
        this._db.find({
            selector: { _id: val },
            fields: ['id', 'analysis']
        }).then(function (result) {
            return result['docs'];
        }).catch(function (err) {
            console.log('analysis find error');
        });
    };
    AnalysisService.prototype.getAll = function (opts) {
        if (this._db) {
            if (!opts) {
                opts = { include_docs: true };
            }
            return this._db.allDocs(opts);
        }
        else {
            return false;
        }
    };
    AnalysisService.prototype.getAnalysis = function (id) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: __WEBPACK_IMPORTED_MODULE_5__app_settings__["a" /* APP_SETTINGS */].MIN_AUTH_JSON_HEADERS });
        return this.http.get(__WEBPACK_IMPORTED_MODULE_5__app_settings__["a" /* APP_SETTINGS */].ANALYSES_URL + id + '/', options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    AnalysisService.prototype.getAnalyses = function (searchArgs) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: __WEBPACK_IMPORTED_MODULE_5__app_settings__["a" /* APP_SETTINGS */].MIN_AUTH_JSON_HEADERS, search: searchArgs });
        return this.http.get(__WEBPACK_IMPORTED_MODULE_5__app_settings__["a" /* APP_SETTINGS */].ANALYSES_URL, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    AnalysisService.prototype.handleError = function (error) {
        // TODO figure out a better error handler
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error');
    };
    return AnalysisService;
}());
AnalysisService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], AnalysisService);

//# sourceMappingURL=analysis.service.js.map

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreservationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_settings__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_utilities__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_pouchdb__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_pouchdb___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_pouchdb__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_pouchdb_find__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_pouchdb_find___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_pouchdb_find__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_pouchdb_load__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_pouchdb_load___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_pouchdb_load__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_memorystream__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_memorystream___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_memorystream__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







//import {PRESERVATIONS} from './preservations';





var PreservationService = (function () {
    //private _preservations;
    function PreservationService(http) {
        this.http = http;
        __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a.plugin(__WEBPACK_IMPORTED_MODULE_8_pouchdb_find___default.a);
        __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a.plugin(__WEBPACK_IMPORTED_MODULE_9_pouchdb_load___default.a);
        __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a.plugin(__WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream___default.a.plugin);
        __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a.adapter('writableStream', __WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream___default.a.adapters.writableStream);
        this._createDB();
    }
    PreservationService.prototype.initDB = function () {
        this._db.allDocs()
            .then(function (result) {
            if (result.total_rows === 0) {
                //this._db.bulkDocs(PRESERVATIONS);
                /*for (let preservation of PRESERVATIONS) {
                  //this._db.post(analysis);
                  this._db.put({
                    _id: preservation['preservation'],
                    id: preservation['id'],
                    preservation: preservation['preservation']
                  });
                }*/
            }
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    PreservationService.prototype._createDB = function () {
        this._db = new __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a('preservations');
    };
    PreservationService.prototype.destroyDB = function () {
        var _this = this;
        return this._db.destroy()
            .then(function (res) {
            _this._createDB();
            return true;
        }).catch(function (error) {
            console.log(error);
            return false;
        });
    };
    PreservationService.prototype.loadDB = function (data) {
        return this._db.loadIt(data)
            .then(function (res) {
            return true;
        })
            .catch(function (error) {
            console.log(error);
            return false;
        });
    };
    PreservationService.prototype.dumpDB = function (filename) {
        var dumpedString = '';
        var stream = new __WEBPACK_IMPORTED_MODULE_11_memorystream___default.a();
        stream.on('data', function (chunk) {
            dumpedString += chunk.toString();
        });
        return this._db.dump(stream)
            .then(function () {
            __WEBPACK_IMPORTED_MODULE_6__app_utilities__["a" /* APP_UTILITIES */].downloadTXT({ filename: filename, data: dumpedString });
            return true;
        }).catch(function (err) {
            console.log('dumpDB ERROR! ', err);
            return false;
        });
    };
    PreservationService.prototype.findPreservation = function (val) {
        this._db.find({
            selector: { _id: val },
            fields: ['id', 'preservation']
        }).then(function (result) {
            return result['docs'];
        }).catch(function (err) {
            console.log('preservation find error');
        });
    };
    PreservationService.prototype.getAll = function (opts) {
        if (this._db) {
            if (!opts) {
                opts = { include_docs: true };
            }
            return this._db.allDocs(opts);
        }
        else {
            return false;
        }
    };
    PreservationService.prototype.getPreservation = function (id) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: __WEBPACK_IMPORTED_MODULE_5__app_settings__["a" /* APP_SETTINGS */].MIN_AUTH_JSON_HEADERS });
        return this.http.get(__WEBPACK_IMPORTED_MODULE_5__app_settings__["a" /* APP_SETTINGS */].PRESERVATIONS_URL + id + '/', options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    PreservationService.prototype.getPreservations = function (searchArgs) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: __WEBPACK_IMPORTED_MODULE_5__app_settings__["a" /* APP_SETTINGS */].MIN_AUTH_JSON_HEADERS, search: searchArgs });
        return this.http.get(__WEBPACK_IMPORTED_MODULE_5__app_settings__["a" /* APP_SETTINGS */].PRESERVATIONS_URL, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    PreservationService.prototype.handleError = function (error) {
        // TODO figure out a better error handler
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error');
    };
    return PreservationService;
}());
PreservationService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], PreservationService);

//# sourceMappingURL=preservation.service.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SiteService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_settings__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_app_utilities__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_pouchdb__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_pouchdb___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_pouchdb__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_pouchdb_find__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_pouchdb_find___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_pouchdb_find__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_pouchdb_load__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_pouchdb_load___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_pouchdb_load__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_memorystream__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_memorystream___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_memorystream__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







//import {SITES} from './sites';





var SiteService = (function () {
    function SiteService(http) {
        this.http = http;
        __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a.plugin(__WEBPACK_IMPORTED_MODULE_8_pouchdb_find___default.a);
        __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a.plugin(__WEBPACK_IMPORTED_MODULE_9_pouchdb_load___default.a);
        __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a.plugin(__WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream___default.a.plugin);
        __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a.adapter('writableStream', __WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream___default.a.adapters.writableStream);
        this._createDB();
    }
    SiteService.prototype.initDB = function () {
        console.log("start init sites");
        this._db.allDocs()
            .then(function (result) {
            //console.log(result.total_rows);
            if (result.total_rows === 0) {
                console.log("start put sites");
                // let count = 0;
                /*for (let site of SITES) {
                    // let projects = site['projects'];
                    // let siteID;
                    // for (let project in projects) {
                    //   siteID = siteID + "_" + project;
                    // }
                    this._db.put({
                      _id: site['name'],
                      id: site['id'],
                      name: site['name'],
                      usgs_scode: site['usgs_scode'],
                      description: site['description'],
                      latitude: site['latitude'],
                      longitude: site['longitude'],
                      datum: site['datum'],
                      method: site['method'],
                      site_status: site['site_status'],
                      nwis_customer_code: site['nwis_customer_code'],
                      projects: site['projects']
                    });
                    // count++;
                    // if (count % 1000 == 0) {
                    //   console.log(count);
                    // }
                  }*/
            }
            console.log("end put sites");
        })
            .catch(function (error) {
            console.log(error);
        });
        console.log("end init sites");
    };
    SiteService.prototype._createDB = function () {
        this._db = new __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a('sites');
    };
    SiteService.prototype.destroyDB = function () {
        var _this = this;
        return this._db.destroy()
            .then(function (res) {
            _this._createDB();
            return true;
        }).catch(function (error) {
            console.log(error);
            return false;
        });
    };
    SiteService.prototype.loadDB = function (data) {
        return this._db.loadIt(data)
            .then(function (res) {
            return true;
        })
            .catch(function (error) {
            console.log(error);
            return false;
        });
    };
    SiteService.prototype.dumpDB = function (filename) {
        var dumpedString = '';
        var stream = new __WEBPACK_IMPORTED_MODULE_11_memorystream___default.a();
        stream.on('data', function (chunk) {
            dumpedString += chunk.toString();
        });
        return this._db.dump(stream)
            .then(function () {
            __WEBPACK_IMPORTED_MODULE_6__app_app_utilities__["a" /* APP_UTILITIES */].downloadTXT({ filename: filename, data: dumpedString });
            return true;
        }).catch(function (err) {
            console.log('dumpDB ERROR! ', err);
            return false;
        });
    };
    SiteService.prototype.add = function (sample) {
        return this._db.post(sample);
    };
    SiteService.prototype.update = function (sample) {
        return this._db.put(sample);
    };
    SiteService.prototype.delete = function (sample) {
        return this._db.remove(sample);
    };
    SiteService.prototype.findSite = function (val) {
        return this._db.find({
            selector: { id: val },
            fields: ['id', 'name', 'usgs_sid', 'usgs_scode',
                'description', 'latitude', 'longitude', 'datum',
                'method', 'site_status', 'nwis_customer_code', 'projects']
        }).then(function (result) {
            return result['docs'][0];
        }).catch(function (err) {
            console.log('site find error: ' + err);
        });
    };
    SiteService.prototype.findSitesByProject = function (val) {
        return this._db.find({
            selector: { projects: { $elemMatch: { $eq: val } } },
            //selector: {_id: {$elemMatch: {$regex: "^" + val}}},
            fields: ['id', 'name', 'usgs_scode']
        }).then(function (result) {
            return result['docs'];
        }).catch(function (err) {
            console.log(err);
        });
    };
    SiteService.prototype.getSiteByID = function (val) {
        return this._db.allDocs({ startkey: val, endkey: val + '\uffff', include_docs: true, limit: 1 });
    };
    SiteService.prototype.getAll = function (opts) {
        return this._db.allDocs(opts);
    };
    SiteService.prototype.getOne = function (_id) {
        return this._db.get(_id);
    };
    SiteService.prototype.getSite = function (id) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: __WEBPACK_IMPORTED_MODULE_5__app_settings__["a" /* APP_SETTINGS */].MIN_AUTH_JSON_HEADERS });
        return this.http.get(__WEBPACK_IMPORTED_MODULE_5__app_settings__["a" /* APP_SETTINGS */].SITES_URL + id + '/', options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    SiteService.prototype.getSites = function (searchArgs) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: __WEBPACK_IMPORTED_MODULE_5__app_settings__["a" /* APP_SETTINGS */].MIN_AUTH_JSON_HEADERS, search: searchArgs });
        return this.http.get(__WEBPACK_IMPORTED_MODULE_5__app_settings__["a" /* APP_SETTINGS */].SITES_URL, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    SiteService.prototype.handleError = function (error) {
        // TODO figure out a better error handler
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error');
    };
    return SiteService;
}());
SiteService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], SiteService);

//# sourceMappingURL=site.service.js.map

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SampleListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_sample_sample_service__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_samplebottle_samplebottle_service__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sample_detail__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__bulk_acid_update__ = __webpack_require__(440);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SampleListPage = (function () {
    function SampleListPage(navCtrl, navParams, alertCtrl, _sampleService, _samplebottleService, modalCtrl, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this._sampleService = _sampleService;
        this._samplebottleService = _samplebottleService;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.samples = [];
        this.sampleCount = 0;
        this.currentPage = 1;
        this.selectedAll = false;
        this.resultPages = Math.ceil(this.sampleCount / 100);
        this.notready = true;
        this._bulkSamples = Array();
    }
    SampleListPage.prototype.ngOnInit = function () {
        this._getSamples();
    };
    SampleListPage.prototype._getSamples = function () {
        var _this = this;
        this.notready = true;
        this._sampleService.getAll()
            .then(function (response) {
            _this.samples.length = 0;
            for (var i = 0; i < response.rows.length; i++) {
                _this.samples.push(response.rows[i].doc);
                _this.notready = false;
            }
        }, function (error) {
            _this._errorMessage = error;
            _this.notready = false;
        });
    };
    // update all selected samples with acid value for acidification bottles
    SampleListPage.prototype.updateBulkSampleAcids = function () {
        var _this = this;
        console.log(this._bulkSamples);
        if (!this._bulkSamples.length) {
            var alert_1 = this.alertCtrl.create({
                title: 'Bulk Update',
                subTitle: 'You need to select sites to update first!',
                buttons: ['OK']
            });
            alert_1.present();
            return;
        }
        var opts = { showBackdrop: true, enableBackdropDismiss: true };
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__bulk_acid_update__["a" /* BulkAcidUpdatePage */], this._bulkSamples, opts);
        modal.onDidDismiss(function (data) {
            if (data) {
                console.log("Bulk update acid: " + data);
                for (var i = 0, j = _this._bulkSamples.length; i < j; i++) {
                    console.log(_this._bulkSamples[i]);
                    // update the sample
                    _this._sampleService.getOne(_this._bulkSamples[i].toString()).then(function (response) {
                        response['acid'] = data;
                        _this._sampleService.update(response);
                        for (var i_1 = 0, j_1 = response['sample_bottles'].length; i_1 < j_1; i_1++) {
                            // update samplebottles with acid
                            _this._samplebottleService.getOne(response['sample_bottles'][i_1]['_id'].toString()).then(function (savedBottle) {
                                console.log("Saved bottle: ");
                                console.log(savedBottle);
                                if (savedBottle['preservation_type'] == 8) {
                                    _this._samplebottleService.update({
                                        '_id': savedBottle['_id'],
                                        '_rev': savedBottle['_rev'],
                                        'analysis_type': savedBottle['analysis_type'],
                                        'filter_type': savedBottle['filter_type'],
                                        'volume_filtered': savedBottle['volume_filtered'],
                                        'preservation_type': savedBottle['preservation_type'],
                                        'preservation_volume': savedBottle['preservation_volume'],
                                        'preservation_comment': savedBottle['preservation_comment'],
                                        'preservation_acid': data
                                    }).then(function (response) {
                                        console.log('update success');
                                        console.log(response);
                                        _this.selectedAll = false;
                                    }, function (error) {
                                        console.log(error);
                                        var alert = _this.alertCtrl.create({
                                            title: 'Bulk Update Error',
                                            subTitle: 'Error updating ' + savedBottle['_id'] + ' with error message ' + error,
                                            buttons: ['OK']
                                        });
                                        alert.present();
                                    });
                                }
                            });
                        }
                    });
                }
                var alert_2 = _this.alertCtrl.create({
                    title: 'Bulk Update',
                    subTitle: 'Update Success!',
                    buttons: ['OK']
                });
                alert_2.present();
            }
        });
        modal.present();
    };
    SampleListPage.prototype.updateBulkSamples = function (sample_id, checked) {
        var index = this._bulkSamples.indexOf(sample_id);
        if (index > -1) {
            this._bulkSamples.splice(index, 1);
        }
        else {
            this._bulkSamples.push(sample_id);
        }
    };
    SampleListPage.prototype.selectAllSamples = function (action) {
        if (action) {
            this.selectedAll = true;
        }
        else {
            this.selectedAll = false;
        }
    };
    SampleListPage.prototype.addSample = function () {
        this.openPage(null);
    };
    SampleListPage.prototype.editSample = function (sample_id) {
        this.openPage(sample_id);
    };
    SampleListPage.prototype.cloneSample = function (sample_id) {
        this.openPage(sample_id, true);
    };
    SampleListPage.prototype.deleteSample = function (sampleID) {
        var _this = this;
        this._sampleService.getOne(sampleID).then(function (response) {
            if (response['sample_bottles']) {
                var sampbottles = response['sample_bottles'];
                for (var _i = 0, sampbottles_1 = sampbottles; _i < sampbottles_1.length; _i++) {
                    var sampbottle = sampbottles_1[_i];
                    _this._samplebottleService.getOne(sampbottle['_id']).then(function (response) {
                        _this._samplebottleService.delete(response);
                    });
                }
            }
            _this._sampleService.delete(response).then(function (response) {
                _this._getSamples();
            });
        });
    };
    SampleListPage.prototype.showConfirm = function (sampleID) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Delete this sample?',
            message: 'Are you sure you want to delete this sample?\n(This will delete all sample bottles in this sample.)',
            buttons: [
                {
                    text: 'No',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.deleteSample(sampleID);
                    }
                }
            ]
        });
        confirm.present();
    };
    SampleListPage.prototype.openPage = function (sample_id, clone) {
        var _this = this;
        this.events.subscribe('custom-user-events', function () {
            console.log("refresh");
            _this._getSamples();
            _this.events.unsubscribe('custom-user-events');
        });
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__sample_detail__["a" /* SampleDetailPage */], {
            sample: sample_id,
            clone: clone ? clone : false
        });
    };
    return SampleListPage;
}());
SampleListPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Users\ehaberman\Desktop\mercurymobile\src\pages\samples\sample-list.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button large menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Sample List</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>   \n\n  <ion-grid>\n\n      <ion-row>\n\n        <ion-col col-12>\n\n            <button class="floaty-button" ion-button medium type="button" (click)="updateBulkSampleAcids()"><ion-icon name="add-circle"></ion-icon> &nbsp;Update Acids For Selected Samples</button>\n\n            <button class="floaty-button" ion-button medium type="button" (click)="addSample()"><ion-icon name="add-circle"></ion-icon> &nbsp;Add Sample</button>           \n\n        </ion-col>\n\n      </ion-row>\n\n  </ion-grid>\n\n\n\n  <ion-grid>\n\n    <ion-row>\n\n      <ion-col col-12>\n\n          <button (click)="selectAllSamples(true)" ion-button small outline color="dark">Select All</button>\n\n          <button (click)="selectAllSamples(false)" ion-button small outline color="dark">Unselect All</button>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n    \n\n  <pre id="display"></pre>\n\n  <ion-grid>\n\n    <ion-row *ngFor="let sample of samples">\n\n      <ion-col col-1>\n\n          <ion-item>              \n\n            <ion-checkbox name="bulkUpdateSamples" (ionChange)="updateBulkSamples(sample.id)" [checked]="selectedAll"></ion-checkbox>\n\n          </ion-item>\n\n      </ion-col>\n\n      <ion-col col-8>\n\n        <button ion-item large>\n\n          <ion-icon name="beaker" item-left></ion-icon>\n\n          {{sample.date}}, {{sample.projectName}}, {{sample.siteName}}\n\n        </button>\n\n      </ion-col>\n\n      <ion-col col-3>\n\n        <div style="float:right;">\n\n            <button ion-button medium (click)="editSample(sample.id)"><ion-icon name="list"></ion-icon></button>\n\n            <button ion-button medium (click)="cloneSample(sample.id)"><ion-icon name="md-copy"></ion-icon></button>\n\n            <button ion-button color="danger" medium type="button" (click)="showConfirm(sample._id)"><ion-icon name="remove-circle"></ion-icon></button>\n\n        </div>        \n\n      </ion-col>      \n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n  <ion-grid>\n\n    <ion-row>\n\n      <ion-col col-12>\n\n          <button (click)="selectAllSamples(true)" ion-button small outline color="dark">Select All</button>\n\n          <button (click)="selectAllSamples(false)" ion-button small outline color="dark">Unselect All</button>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n  <div *ngIf="selectedSample" padding>\n\n    You navigated here from <b>{{selectedSample.title}}</b>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\ehaberman\Desktop\mercurymobile\src\pages\samples\sample-list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"],
        __WEBPACK_IMPORTED_MODULE_2__app_sample_sample_service__["a" /* SampleService */],
        __WEBPACK_IMPORTED_MODULE_3__app_samplebottle_samplebottle_service__["a" /* SampleBottleService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"]])
], SampleListPage);

//# sourceMappingURL=sample-list.js.map

/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MediumService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_settings__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_app_utilities__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_pouchdb__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_pouchdb___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_pouchdb__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_pouchdb_find__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_pouchdb_find___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_pouchdb_find__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_pouchdb_load__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_pouchdb_load___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_pouchdb_load__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_memorystream__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_memorystream___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_memorystream__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







//import {MEDIUMS} from './mediums';





var MediumService = (function () {
    //private _mediums;
    function MediumService(http) {
        this.http = http;
        __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a.plugin(__WEBPACK_IMPORTED_MODULE_8_pouchdb_find___default.a);
        __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a.plugin(__WEBPACK_IMPORTED_MODULE_9_pouchdb_load___default.a);
        __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a.plugin(__WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream___default.a.plugin);
        __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a.adapter('writableStream', __WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream___default.a.adapters.writableStream);
        this._createDB();
    }
    MediumService.prototype.initDB = function () {
        this._db.allDocs()
            .then(function (result) {
            if (result.total_rows === 0) {
                //this._db.bulkDocs(MEDIUMS);
                /*for (let medium of MEDIUMS) {
                  //this._db.post(medium);
                  this._db.put({
                    _id: medium['nwis_code'],
                    id: medium['id'],
                    nwis_code: medium['nwis_code'],
                    medium: medium['medium'],
                    description: medium['description']
                  });
                }*/
            }
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    MediumService.prototype._createDB = function () {
        this._db = new __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a('mediums');
    };
    MediumService.prototype.destroyDB = function () {
        var _this = this;
        return this._db.destroy()
            .then(function (res) {
            _this._createDB();
            return true;
        }).catch(function (error) {
            console.log(error);
            return false;
        });
    };
    MediumService.prototype.loadDB = function (data) {
        return this._db.loadIt(data)
            .then(function (res) {
            return true;
        })
            .catch(function (error) {
            console.log(error);
            return false;
        });
    };
    MediumService.prototype.dumpDB = function (filename) {
        var dumpedString = '';
        var stream = new __WEBPACK_IMPORTED_MODULE_11_memorystream___default.a();
        stream.on('data', function (chunk) {
            dumpedString += chunk.toString();
        });
        return this._db.dump(stream)
            .then(function () {
            __WEBPACK_IMPORTED_MODULE_6__app_app_utilities__["a" /* APP_UTILITIES */].downloadTXT({ filename: filename, data: dumpedString });
            return true;
        }).catch(function (err) {
            console.log('dumpDB ERROR! ', err);
            return false;
        });
    };
    MediumService.prototype.findMedium = function (val) {
        this._db.find({
            selector: { _id: val },
            fields: ['id', 'medium']
        }).then(function (result) {
            return result['docs'];
        }).catch(function (err) {
            console.log('medium find error');
        });
    };
    MediumService.prototype.getMediumsByName = function (val) {
        return this._db.allDocs({ startkey: val, endkey: val + '\uffff', include_docs: false, limit: 100 });
    };
    MediumService.prototype.getAll = function (opts) {
        if (this._db) {
            if (!opts) {
                opts = { include_docs: true };
            }
            return this._db.allDocs(opts);
        }
        else {
            return false;
        }
    };
    MediumService.prototype.getMedium = function (id) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: __WEBPACK_IMPORTED_MODULE_5__app_settings__["a" /* APP_SETTINGS */].MIN_AUTH_JSON_HEADERS });
        return this.http.get(__WEBPACK_IMPORTED_MODULE_5__app_settings__["a" /* APP_SETTINGS */].MEDIUMS_URL + id + '/', options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    MediumService.prototype.getMediums = function (searchArgs) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: __WEBPACK_IMPORTED_MODULE_5__app_settings__["a" /* APP_SETTINGS */].MIN_AUTH_JSON_HEADERS, search: searchArgs });
        return this.http.get(__WEBPACK_IMPORTED_MODULE_5__app_settings__["a" /* APP_SETTINGS */].MEDIUMS_URL, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    MediumService.prototype.handleError = function (error) {
        // TODO figure out a better error handler
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error');
    };
    return MediumService;
}());
MediumService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], MediumService);

//# sourceMappingURL=medium.service.js.map

/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SiteListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_site_site_service__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__site_detail__ = __webpack_require__(441);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SiteListPage = (function () {
    function SiteListPage(navCtrl, navParams, modalCtrl, _siteService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this._siteService = _siteService;
        this.sites = [];
        this._firstSites = [];
        this._pageSize = 100;
        this.siteCount = 0;
        this.currentPage = 1;
        this.resultPages = Math.ceil(this.siteCount / this._pageSize);
        this.notready = true;
        this.showPageButtons = true;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedSite = navParams.get('site');
        this._getSites();
    }
    SiteListPage.prototype._getSites = function (opts) {
        var _this = this;
        this.notready = true;
        if (!opts) {
            opts = { include_docs: true, limit: this._pageSize };
        }
        this._siteService.getAll(opts)
            .then(function (response) {
            _this.sites.length = 0;
            _this.siteCount = response.total_rows;
            _this.resultPages = Math.ceil(_this.siteCount / _this._pageSize);
            for (var i = 0, j = response.rows.length; i < j; i++) {
                _this.sites.push(response.rows[i].doc);
            }
            if (_this.siteCount > 100) {
                _this.showPageButtons = true;
                _this._firstSite = response.rows[0].doc['_id'];
                _this._lastSite = response.rows[_this._pageSize - 1].doc['_id'];
            }
            else {
                _this.showPageButtons = false;
            }
            _this.notready = false;
        }, function (error) {
            _this._errorMessage = error;
            _this.notready = false;
        });
        // .subscribe(
        //   res => {
        //     this.sites = res.results;
        //     this.siteCount = res.count;
        //     this.resultPages = Math.ceil(this.siteCount / 100);
        //     this.notready = false;
        //   },
        //   error => {
        //     this._errorMessage = <any>error;
        //     this.notready = false;
        //   });
    };
    SiteListPage.prototype.nextPage = function () {
        if (this.currentPage != this.resultPages) {
            //this._getSites('page='+(this.currentPage + 1));
            this.currentPage++;
            this._firstSites.push(this._firstSite);
            var opts = { include_docs: true, limit: this._pageSize, startkey: this._lastSite, skip: 1 };
            this._getSites(opts);
        }
        else {
            alert("End of results, there are no pages after Page " + this.resultPages + ".");
        }
    };
    SiteListPage.prototype.prevPage = function () {
        if (this.currentPage != 1) {
            //this._getSites('page='+(this.currentPage - 1));
            this.currentPage--;
            var opts = { include_docs: true, limit: this._pageSize, startkey: this._firstSites.pop() };
            this._getSites(opts);
        }
        else {
            alert("There are no pages before Page 1.");
        }
    };
    SiteListPage.prototype.addSite = function () {
        this.openModal(null);
    };
    SiteListPage.prototype.editSite = function (site_name) {
        this.openModal(site_name);
    };
    SiteListPage.prototype.openModal = function (site_name) {
        var opts = { showBackdrop: false, enableBackdropDismiss: false };
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__site_detail__["a" /* SiteDetailPage */], { name: site_name }, opts);
        modal.present();
    };
    return SiteListPage;
}());
SiteListPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Users\ehaberman\Desktop\mercurymobile\src\pages\sites\site-list.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button large menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Site List</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <button style="float:right;margin-top:10px;margin-right:10px;" ion-button medium type="button" (click)="addSite()"><ion-icon name="add-circle"></ion-icon> &nbsp;Add Site</button>\n\n  <h3 style="margin-left:10px;">{{siteCount}} Sites</h3>\n\n\n\n  <div *ngIf="showPageButtons" style="padding:8px;width:100%;margin-top:30px;text-align:center;">\n\n      <a (click)="prevPage()" class="sites-nav sites-nav-left">Prev Page</a>\n\n      {{currentPage}} / {{resultPages}}\n\n      <a (click)="nextPage()" class="sites-nav sites-nav-right">Next Page</a>      \n\n  </div>\n\n\n\n  <div [hidden]="!notready" align="left" id="loading-spinner"><ion-spinner></ion-spinner></div>\n\n  <div [hidden]="notready">\n\n    <ion-list>\n\n      <button ion-item large *ngFor="let site of sites" (click)="editSite(site.name)">\n\n        <ion-icon name="pin" item-left></ion-icon>\n\n        {{site.name}} <span *ngIf="site.usgs_scode">{{site.usgs_scode}}</span>\n\n        <div class="item-note" item-right>\n\n          {{site.description}}\n\n        </div>\n\n      </button>\n\n    </ion-list>\n\n    <div *ngIf="selectedSite" padding>\n\n      You navigated here from <b>{{selectedSite.name}}</b>\n\n    </div>\n\n  </div>\n\n\n\n  <div *ngIf="showPageButtons" style="padding:8px; width:100%;margin-top:30px;text-align:center;">\n\n      <a (click)="prevPage()" class="sites-nav sites-nav-left">Prev Page</a>\n\n      {{currentPage}} / {{resultPages}}\n\n      <a (click)="nextPage()" class="sites-nav sites-nav-right">Next Page</a>      \n\n  </div>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\ehaberman\Desktop\mercurymobile\src\pages\sites\site-list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"],
        __WEBPACK_IMPORTED_MODULE_2__app_site_site_service__["a" /* SiteService */]])
], SiteListPage);

//# sourceMappingURL=site-list.js.map

/***/ }),

/***/ 186:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 186;

/***/ }),

/***/ 229:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 229;

/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__samples_sample_list__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sites_site_list__ = __webpack_require__(175);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = (function () {
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    HomePage.prototype.goToOtherPage = function (page) {
        switch (page) {
            case "sites":
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__sites_site_list__["a" /* SiteListPage */]);
                break;
            case "samples":
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__samples_sample_list__["a" /* SampleListPage */]);
                break;
        }
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Users\ehaberman\Desktop\mercurymobile\src\pages\home\home.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button large menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Home</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding class="home">\n\n  \n\n    <ion-grid>\n\n      <ion-row>                 \n\n        <ion-col col-12>   \n\n          <h2 text-center>Welcome to Merlin Mobile!</h2>         \n\n          <div class="quick-links"> \n\n            <button ion-button block large (click)="goToOtherPage(\'sites\')">Go To Sites</button>\n\n            <button ion-button block large (click)="goToOtherPage(\'samples\')">Go To Samples</button>\n\n          </div> \n\n        </ion-col>       \n\n      </ion-row>      \n\n    </ion-grid>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\ehaberman\Desktop\mercurymobile\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SampleDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_site_site__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_sample_sample__ = __webpack_require__(526);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_samplebottle_samplebottle__ = __webpack_require__(527);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_project_project_service__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_medium_medium_service__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_sample_sample_service__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_samplebottle_samplebottle_service__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_acid_acid_service__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_bottle_bottle_service__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__bottle_select__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__acid_select__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__sample_bottle__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__app_app_utilities__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_ionic2_date_picker__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_ionic2_date_picker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_ionic2_date_picker__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__filter_select__ = __webpack_require__(439);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__app_analysis_analysis_service__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__app_filter_filter_service__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__app_preservation_preservation_service__ = __webpack_require__(111);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





















var SampleDetailPage = (function () {
    function SampleDetailPage(navCtrl, navParams, alertCtrl, modalCtrl, viewCtrl, fb, _sampleService, _samplebottleService, _projectService, 
        // private _siteService: SiteService,
        _mediumService, _acidService, _bottleService, datePicker, _analysisService, _filterService, _preservationService, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.fb = fb;
        this._sampleService = _sampleService;
        this._samplebottleService = _samplebottleService;
        this._projectService = _projectService;
        this._mediumService = _mediumService;
        this._acidService = _acidService;
        this._bottleService = _bottleService;
        this.datePicker = datePicker;
        this._analysisService = _analysisService;
        this._filterService = _filterService;
        this._preservationService = _preservationService;
        this.events = events;
        this.clone = false;
        this.active = true;
        this.notready = true;
        this.useWidgets = true;
        this.lookupContainers = false;
        this._defaultRowCount = 8;
        this._numRowsAdded = 0;
        this._numSampleBottles = 0;
        this.mySample = new __WEBPACK_IMPORTED_MODULE_4__app_sample_sample__["a" /* Sample */](null, null, null, null, null, null, null, null, null, null, null, null, null);
        this.mySampleBottles = [];
        this.myProjects = [];
        this.mySites = [];
        this.myMediums = [];
        this.sampleBottleControls = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormArray */]([]);
        this.projectName = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](null);
        this.projectNumber = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](null);
        this.siteName = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](null);
        this.siteNumber = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](null);
        this.sampleDate = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](null);
        this.sampleTime = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](null);
        this.sampleDepth = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](null);
        this.sampleRep = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](null);
        this.sampleMedium = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](null);
        this.sampleAcid = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](null);
        this.sampleComment = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](null);
        this.sampleFilter = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](null);
        // bottles
        this.myAnalyses = [];
        this.myFilters = [];
        this.myPreservations = [];
        this.sampleHeaderControls = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormGroup */]({
            projectName: this.projectName,
            projectNumber: this.projectNumber,
            siteName: this.siteName,
            siteNumber: this.siteNumber,
            sampleDate: this.sampleDate,
            sampleTime: this.sampleTime,
            sampleDepth: this.sampleDepth,
            sampleRep: this.sampleRep,
            sampleMedium: this.sampleMedium,
            sampleAcid: this.sampleAcid,
            sampleFilter: this.sampleFilter
        });
        this.sampleCommentControls = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormGroup */]({
            sampleComment: this.sampleComment
        });
        this.sampleForm = fb.group({
            sampleHeaderControls: this.sampleHeaderControls,
            sampleBottleControls: this.sampleBottleControls,
            sampleCommentControls: this.sampleCommentControls
        });
        // If we navigated to this page, we will have an item available as a nav param
        this.sample_ID = this.navParams.get('sample');
        this.clone = this.navParams.get('clone');
        // if the sample exists retrieve its data, otherwise set up a new empty sample
        if (this.sample_ID) {
            this._getSample(this.sample_ID, this.clone);
        }
        else {
            this._getProjects();
            this._getMediums();
            // this a new sample, so set all values to empty of equivalent
            this.mySample = new __WEBPACK_IMPORTED_MODULE_4__app_sample_sample__["a" /* Sample */]('', 0, '', 0, null, null, 0, 0, 0, '', '', [], '');
            // force setting of date to today
            this.sampleDate.setValue(__WEBPACK_IMPORTED_MODULE_15__app_app_utilities__["a" /* APP_UTILITIES */].TODAY);
            this.mySample['sampleDate'] = __WEBPACK_IMPORTED_MODULE_15__app_app_utilities__["a" /* APP_UTILITIES */].TODAY;
            // force setting of depth and rep input fields to zero
            this.sampleDepth.setValue('0');
            this.sampleRep.setValue('0');
            // set sample id to some random unique number
            var id = Date.now() % 10000000000;
            this.mySample['id'] = id;
            this.mySample['_id'] = id.toString();
            this.sample_ID = id;
            // save this new sample, and add empty sample bottle slots
            this._sampleService.update(this.mySample).then(function (response) {
                for (var i = 0, j = _this._defaultRowCount; i < j; i++) {
                    _this.addRow();
                }
                _this.notready = false;
            });
        }
        this._getPreservations();
        this._getAnalyses();
        this._getFilters();
    }
    SampleDetailPage.prototype.showCalendar = function () {
        var _this = this;
        var dateSelected = this.datePicker.showCalendar(this.modalCtrl);
        dateSelected.subscribe(function (date) {
            var theFormattedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            console.log(theFormattedDate);
            _this.sampleDate.setValue(theFormattedDate);
            _this.sampleHeaderControls.controls['sampleDate'].setValue(theFormattedDate);
            _this.mySample['sampleDate'] = theFormattedDate;
        });
    };
    SampleDetailPage.prototype.toggleUseWidgets = function () {
        this.useWidgets = !this.useWidgets;
        var myDate = this.sampleDate.value;
        if (myDate.includes('/')) {
            this.mySample['date'] = myDate.slice(6, 10) + '-' + myDate.slice(0, 2) + '-' + myDate.slice(3, 5);
            this.sampleDate.setValue(this.mySample['date']);
        }
    };
    SampleDetailPage.prototype.toggleLookupContainers = function () {
        this.lookupContainers = !this.lookupContainers;
    };
    SampleDetailPage.prototype._getSample = function (sampleID, clone) {
        var _this = this;
        this._sampleService.getSampleByID(sampleID.toString())
            .then(function (response) {
            var sample = response.rows[0].doc;
            _this._getMediums();
            // if this is a clone, set common values and empty remaining values and assign new ID
            if (clone) {
                // if the source sample used acid, grab that acid value
                if (sample['sample_bottles'] && sample['sample_bottles'].length > 0) {
                    _this._getSampleBottles(sample['sample_bottles']);
                }
                // create a new new sample with cloned values from source sample            // this.mySample = new Sample(sample['projectName'], sample['projectNumber'], sample['siteName'], sample['siteNumber'], sample['date'], null, 0, 0, sample['medium'], [], '');
                _this.mySample['projectName'] = sample['projectName'];
                _this.mySample['projectNumber'] = sample['projectNumber'];
                _this.mySample['siteName'] = sample['siteName'];
                _this.mySample['siteNumber'] = sample['siteNumber'];
                _this.mySample['date'] = sample['date'];
                _this.mySample['mediumName'] = sample['mediumName'];
                _this.mySample['mediumNumber'] = sample['mediumNumber'];
                _this.mySample['filter'] = sample['filter'];
                _this.mySample['acid'] = sample['acid'];
                // set new sample id to some random unique number
                var id = Date.now() % 10000000000;
                _this.mySample['id'] = id;
                _this.mySample['_id'] = id.toString();
                _this.sample_ID = id;
                // save this new cloned sample, and add empty sample bottle slots
                _this._sampleService.update(_this.mySample).then(function (response) { console.log('Clone success'); console.log(response); }, function (error) { return console.log(error); });
            }
            else {
                console.log(sample);
                _this.mySample = sample;
            }
            if (_this.mySample['projectName']) {
                _this._getProjects(_this.mySample['projectName']);
                _this._getSites(_this.mySample['projectName']);
            }
            else {
                _this._getProjects();
            }
            _this.sampleDate.setValue(_this.mySample['date']);
            _this.sampleMedium.setValue(_this.mySample['medium']);
            _this.sampleComment.setValue(_this.mySample['comment']);
            _this.sampleTime.setValue(_this._timeToText(_this.mySample['time']));
            _this.sampleDepth.setValue(_this.mySample['depth']);
            _this.sampleRep.setValue(_this.mySample['replicate']);
            _this.sampleFilter.setValue(_this.mySample['filter']);
            _this.sampleAcid.setValue(_this.mySample['acid']);
            if (_this.mySample['sample_bottles'] && _this.mySample['sample_bottles'].length > 0) {
                _this._numSampleBottles = _this.mySample['sample_bottles'].length;
                _this._getSampleBottles(_this.mySample['sample_bottles']);
                _this.notready = false;
            }
            else {
                _this.mySample['sample_bottles'] = [];
                for (var i = 0, j = _this._defaultRowCount; i < j; i++) {
                    console.log("empty bottles, adding rows");
                    _this.addRow();
                }
                _this.notready = false;
            }
        }, function (error) { return _this._errorMessage = error; })
            .catch(function (err) { return console.log(err); });
    };
    SampleDetailPage.prototype._getProjects = function (projectName) {
        var _this = this;
        this._projectService.getAll()
            .then(function (response) {
            for (var i = 0; i < response.rows.length; i++) {
                _this.myProjects.push(response.rows[i].doc);
            }
            // if there is only one project, automatically select it and filter the sites
            if (_this.myProjects.length == 1) {
                var proj = _this.myProjects[0];
                _this.projectName.setValue(proj['id']);
                _this.projectNumber.setValue(proj['id']);
                _this.mySample['projectName'] = proj['name'];
                _this.mySample['projectNumber'] = proj['id'];
                _this.mySites = proj['sites'];
            }
        }, function (error) {
            _this._errorMessage = error;
        });
    };
    SampleDetailPage.prototype._getSampleBottles = function (sampBottles) {
        var _this = this;
        for (var i = 0, j = sampBottles.length; i < j; i++) {
            console.log("Retrieving sample bottle ID: " + sampBottles[i]['_id']);
            this._samplebottleService.getOne(sampBottles[i]['_id']).then(function (response) {
                var samplebottle = response;
                console.log(samplebottle);
                // if this sample is not a clone, populate the sample bottle list
                if (!_this.clone) {
                    _this.mySampleBottles.push(samplebottle);
                    _this.addRow(samplebottle);
                }
                // populate the sample's acid field if any of the sample bottles have used an acid
                var acid = samplebottle['preservation_acid'];
                if (acid && !_this._selectedAcid) {
                    _this._selectedAcid = acid;
                    _this._getAcidName(_this._selectedAcid);
                }
            });
        }
        this.notready = false;
    };
    SampleDetailPage.prototype._getAnalyses = function () {
        var _this = this;
        this._analysisService.getAll()
            .then(function (response) {
            for (var i = 0; i < response.rows.length; i++) {
                _this.myAnalyses.push(response.rows[i].doc);
            }
        }, function (error) {
            _this._errorMessage = error;
        });
    };
    SampleDetailPage.prototype._getFilters = function () {
        var _this = this;
        this._filterService.getAll()
            .then(function (response) {
            for (var i = 0; i < response.rows.length; i++) {
                _this.myFilters.push(response.rows[i].doc);
            }
        }, function (error) {
            _this._errorMessage = error;
        });
    };
    SampleDetailPage.prototype._getPreservations = function () {
        var _this = this;
        this._preservationService.getAll()
            .then(function (response) {
            for (var i = 0; i < response.rows.length; i++) {
                _this.myPreservations.push(response.rows[i].doc);
            }
        }, function (error) {
            _this._errorMessage = error;
        });
    };
    SampleDetailPage.prototype.addNewBottle = function (ev) {
        var _this = this;
        console.log(ev);
        var result = this._samplebottleService.findSampleBottle(ev.value);
        console.log(result);
        if (!result) {
            var confirm = this.alertCtrl.create({
                title: 'Add New Container',
                message: ev.value + ' was not found in the database, add a new Container with this value?',
                buttons: [
                    {
                        text: 'Cancel',
                        handler: function () {
                            console.log('Disagree clicked');
                        }
                    },
                    {
                        text: 'Add New Container',
                        handler: function () {
                            console.log('Agree clicked, adding new bottle: ' + ev.value + " for sample ID: " + _this.sample_ID);
                            _this._samplebottleService.add({ '_id': ev.value, 'name': ev.value, 'id': ev.value });
                            _this._bottleService.add(ev.value);
                            //let bottle = new SampleBottle(this.sample_ID, ev.value, null, null, null, null, null, null, null, ev.value, ev.value);
                            //this.mySampleBottles.push(bottle);
                            _this._addSampleBottle(ev.value);
                        }
                    }
                ]
            });
            confirm.present();
        }
    };
    SampleDetailPage.prototype._addSampleBottle = function (bottleName) {
        var _this = this;
        this._bottleService.getBottlesByName(bottleName).then(function (response) {
            console.log("New bottle added: " + bottleName + " with ID: " + response.rows[0]['id']);
            var bottleID = response.rows[0]['id'];
            var bottle = new __WEBPACK_IMPORTED_MODULE_5__app_samplebottle_samplebottle__["a" /* SampleBottle */](_this.sample_ID, bottleID, null, null, null, null, null, null, null, bottleName, bottleID);
            _this.mySampleBottles.push(bottle);
            // include the PouchDB internal ID for quick retrieval
            bottle['_id'] = bottleID;
            _this._samplebottleService.update(bottle);
        });
    };
    SampleDetailPage.prototype._getSites = function (projectName) {
        var _this = this;
        this._projectService.getProjectByName(projectName)
            .then(function (response) {
            var sites = response.rows[0].doc['sites'];
            for (var i = 0; i < sites.length; i++) {
                var sitedata = sites[i];
                var newsite = new __WEBPACK_IMPORTED_MODULE_3__app_site_site__["a" /* Site */]("temp");
                newsite['name'] = sitedata.name;
                newsite['usgs_scode'] = sitedata.usgs_scode;
                newsite['id'] = sitedata.id;
                _this.mySites.push(newsite);
            }
        }, function (error) {
            _this._errorMessage = error;
        });
    };
    SampleDetailPage.prototype._getMediums = function () {
        var _this = this;
        this._mediumService.getAll()
            .then(function (response) {
            for (var i = 0; i < response.rows.length; i++) {
                _this.myMediums.push(response.rows[i].doc);
            }
        }, function (error) {
            _this._errorMessage = error;
        });
    };
    SampleDetailPage.prototype._getAcidName = function (acidID) {
        var _this = this;
        this._acidService.findAcid(acidID)
            .then(function (response) {
            console.log("get acid response: ");
            console.log(response);
            //this.sampleAcid.setValue(response[0].code);
        }, function (error) {
            _this._errorMessage = error;
        });
    };
    SampleDetailPage.prototype._timeToText = function (time) {
        return time ? time.substring(0, 5) : '';
    };
    SampleDetailPage.prototype._textToTime = function (text) {
        if (text && text.length === 4) {
            return text.slice(0, 1) + ':' + text.slice(1, 3) + ':00';
        }
        else if (text && text.length === 5) {
            return text.slice(0, 2) + ':' + text.slice(3, 5) + ':00';
        }
        else {
            return '00:00:00';
        }
    };
    SampleDetailPage.prototype.openDateSelect = function () {
        this.showCalendar();
    };
    SampleDetailPage.prototype.openBottleSelect = function (rowIndex) {
        var _this = this;
        var opts = { showBackdrop: false, enableBackdropDismiss: false };
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_12__bottle_select__["a" /* BottleSelectPage */], {}, opts);
        modal.onDidDismiss(function (data) {
            if (data) {
                _this.sampleBottleControls.controls[rowIndex].controls['bottle'].setValue(data);
                _this._addSampleBottle(data);
            }
        });
        modal.present();
    };
    SampleDetailPage.prototype.openAcidSelect = function () {
        var _this = this;
        var opts = { showBackdrop: false, enableBackdropDismiss: false };
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_13__acid_select__["a" /* AcidSelectPage */], {}, opts);
        modal.onDidDismiss(function (acidName) {
            if (acidName) {
                _this.acidNameChange(acidName);
            }
        });
        modal.present();
    };
    SampleDetailPage.prototype.acidNameChange = function (acidName) {
        var _this = this;
        this._acidService.getAcidsByName(acidName)
            .then(function (response) {
            _this._selectedAcid = response.rows[0].doc.id;
            _this.sampleHeaderControls.controls['sampleAcid'].setValue(acidName);
        })
            .catch(function (error) {
            _this.showAlert('Acid not found!', acidName, 'was not found in the database. Please enter a valid acid.');
        });
    };
    SampleDetailPage.prototype.openFilterSelect = function () {
        var _this = this;
        var opts = { showBackdrop: false, enableBackdropDismiss: false };
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_17__filter_select__["a" /* FilterSelectPage */], {}, opts);
        modal.onDidDismiss(function (acidName) {
            if (acidName) {
                _this.acidNameChange(acidName);
            }
        });
        modal.present();
    };
    SampleDetailPage.prototype.editSampleBottle = function (rowIndex) {
        var _this = this;
        var sbName = this.sampleBottleControls.controls[rowIndex].controls['bottle'].value;
        console.log("sample bottle name: " + sbName + " row index " + rowIndex);
        if (sbName == null) {
            alert("Please select a bottle first!");
        }
        else {
            this._bottleService.getBottlesByName(sbName).then(function (response) {
                _this.openPage(response.rows[0]['id']);
            });
        }
    };
    SampleDetailPage.prototype.openPage = function (sample_bottle_id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_14__sample_bottle__["a" /* SampleBottlePage */], {
            samplebottle: sample_bottle_id
        });
    };
    SampleDetailPage.prototype.projectNameChange = function (projectName) {
        var projects = this.myProjects.filter(function (project) { return project['name'] == projectName; });
        if (projects.length < 1) {
            this.showAlert('Project not found!', projectName, 'was not found in the database. Please enter a valid project name.');
        }
        else {
            this.projectNumber.setValue(projects[0]['id']);
            this.mySample['projectName'] = projects[0]['name'];
            this.mySample['projectNumber'] = projects[0]['id'];
            this.mySites = projects[0]['sites'];
        }
    };
    SampleDetailPage.prototype.projectNumberChange = function (projectNumber) {
        var projects = this.myProjects.filter(function (project) { return project['id'] == projectNumber; });
        if (projects.length < 1) {
            this.showAlert('Project not found!', projectNumber.toString(), 'was not found in the database. Please enter a valid project number.');
        }
        else {
            this.projectName.setValue(projects[0]['id']);
            this.mySample['projectName'] = projects[0]['name'];
            this.mySample['projectNumber'] = projects[0]['id'];
            this.mySites = projects[0]['sites'];
        }
    };
    SampleDetailPage.prototype.siteNameChange = function (siteName) {
        var sites = this.mySites.filter(function (site) { return site['name'] == siteName; });
        if (sites.length < 1) {
            this.showAlert('Site not found!', siteName, 'was not found in the database. Please enter a valid site name.');
        }
        else {
            this.siteNumber.setValue(sites[0]['id']);
            this.mySample['siteName'] = sites[0]['name'];
            this.mySample['siteNumber'] = sites[0]['id'];
        }
    };
    SampleDetailPage.prototype.siteNumberChange = function (siteNumber) {
        var sites = this.mySites.filter(function (site) { return site['id'] == siteNumber; });
        if (sites.length < 1) {
            this.showAlert('Site not found!', siteNumber.toString(), 'was not found in the database. Please enter a valid site number.');
        }
        else {
            this.siteName.setValue(sites[0]['id']);
            this.mySample['siteName'] = sites[0]['name'];
            this.mySample['siteNumber'] = sites[0]['id'];
        }
    };
    SampleDetailPage.prototype.mediumChange = function (mName) {
        var mediums = this.myMediums.filter(function (medium) { return medium['nwis_code'] == mName; });
        if (mediums.length < 1) {
            this.showAlert('Medium not found!', mName.toString(), 'was not found in the database. Please enter a valid medium.');
        }
        else {
            this.mySample['mediumNumber'] = mediums[0]['id'];
            this.mySample['mediumName'] = mediums[0]['nwis_code'];
        }
    };
    SampleDetailPage.prototype.addRow = function (samplebottle) {
        if (samplebottle) {
            console.log("Non-null bottle");
            this.sampleBottleControls.push(new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormGroup */]({
                bottle: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](samplebottle['_id'] ? samplebottle['_id'] : null),
                medium: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](this.mySample['medium'] ? this.mySample['medium'] : null),
                analysis: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](samplebottle['analysis_type'] ? samplebottle['analysis_type'] : null),
                filterType: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](samplebottle['filter_type'] ? samplebottle['filter_type'] : null),
                filterVolume: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](samplebottle['volume_filtered'] ? samplebottle['volume_filtered'] : null),
                preservationType: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](samplebottle['preservation_type'] ? samplebottle['preservation_type'] : null),
                preservationAcid: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](samplebottle['preservation_acid'] ? samplebottle['preservation_acid'] : null),
                preservationVolume: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](samplebottle['preservation_volume'] ? samplebottle['preservation_volume'] : null)
            }));
            this._numRowsAdded++;
            if (this._numRowsAdded == this._numSampleBottles) {
                this.notready = false;
            }
        }
        else {
            this.sampleBottleControls.push(new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormGroup */]({
                bottle: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](null),
                medium: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](null),
                analysis: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](null),
                filterType: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](null),
                filterVolume: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](null),
                preservationType: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](null),
                preservationAcid: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](null),
                preservationVolume: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](null)
            }));
        }
    };
    SampleDetailPage.prototype.removeRow = function (sampleBottleControlsRow) {
        var _this = this;
        var sampleBottleControlRows = this.sampleBottleControls.controls;
        var _loop_1 = function (i, j) {
            if (sampleBottleControlRows[i] == sampleBottleControlsRow) {
                var sampleBottleID = this_1.sampleBottleControls.controls[i].controls['bottle'].value;
                console.log("remove sampleid: " + sampleBottleID);
                if (sampleBottleID == null) {
                    sampleBottleControlRows.splice(i, 1);
                }
                else {
                    this_1._samplebottleService.getOne(sampleBottleID).then(function (response) {
                        _this._samplebottleService.delete(response).then(function (response) {
                            sampleBottleControlRows.splice(i, 1);
                            _this.mySampleBottles.splice(i, 1);
                        });
                    });
                }
                return "break";
            }
        };
        var this_1 = this;
        for (var i = 0, j = sampleBottleControlRows.length; i < j; i++) {
            var state_1 = _loop_1(i, j);
            if (state_1 === "break")
                break;
        }
    };
    SampleDetailPage.prototype.onSubmit = function (formValue) {
        var _this = this;
        var self = this;
        // TODO: build proper onSubmit function, including validations (especially assigning acid to samplebottles)
        var myDate = formValue.sampleHeaderControls.sampleDate;
        this.mySample['date'] = myDate;
        this.mySample['time'] = this._textToTime(formValue.sampleHeaderControls.sampleTime);
        this.mySample['depth'] = formValue.sampleHeaderControls.sampleDepth;
        this.mySample['replicate'] = formValue.sampleHeaderControls.sampleRep;
        this.mySample['sample_bottles'] = this.mySampleBottles;
        this.mySample['comment'] = formValue.sampleCommentControls.sampleComment;
        this.mySample['filter'] = formValue.sampleHeaderControls.sampleFilter;
        this.mySample['acid'] = formValue.sampleHeaderControls.sampleAcid;
        // update the sample
        this._sampleService.getOne(this.mySample['_id']).then(function (response) {
            _this.mySample['_rev'] = response['_rev'];
            _this._sampleService.update(_this.mySample).then(function (result) {
                var _loop_2 = function (i, j) {
                    console.log(_this.sampleBottleControls.controls[i]);
                    console.log(_this.sampleBottleControls.controls[i].controls['bottle'].value);
                    if (_this.sampleBottleControls.controls[i].controls['bottle'].value !== null) {
                        console.log("saving bottle to sample: " + _this.sampleBottleControls.controls[i].controls['bottle'].value);
                        _this._samplebottleService.getOne(_this.sampleBottleControls.controls[i].controls['bottle'].value).then(function (response) {
                            console.log("Bottle response update:");
                            console.log(response);
                            var pType = _this.sampleBottleControls.controls[i].controls['preservationType'].value;
                            return _this._samplebottleService.update({
                                '_id': response['_id'],
                                '_rev': response['_rev'],
                                'analysis_type': _this.sampleBottleControls.controls[i].controls['analysis'].value,
                                'filter_type': formValue.sampleHeaderControls.sampleFilter,
                                'volume_filtered': parseInt(_this.sampleBottleControls.controls[i].controls['filterVolume'].value),
                                'preservation_type': pType,
                                'preservation_volume': parseInt(_this.sampleBottleControls.controls[i].controls['preservationVolume'].value),
                                'preservation_comment': response['preservation_comment'],
                                'preservation_acid': (pType == 8) ? self._selectedAcid : null
                            });
                        });
                    }
                };
                for (var i = 0, j = _this.sampleBottleControls.length; i < j; i++) {
                    _loop_2(i, j);
                }
                _this.navCtrl.pop().then(function () {
                    _this.events.publish('custom-user-events');
                });
            }, function (error) {
                console.log(error);
            });
        });
    };
    SampleDetailPage.prototype.deleteSample = function () {
        var _this = this;
        for (var _i = 0, _a = this.mySampleBottles; _i < _a.length; _i++) {
            var sampbottle = _a[_i];
            this._samplebottleService.getOne(sampbottle['_id']).then(function (response) {
                _this._samplebottleService.delete(response);
            });
        }
        this._sampleService.delete(this.mySample['id']).then(function (response) {
            _this.navCtrl.pop();
        });
    };
    SampleDetailPage.prototype.showAlert = function (ttl, subttl, msg) {
        var alrt = this.alertCtrl.create({
            title: ttl ? ttl : 'Alert',
            subTitle: subttl ? subttl : 'Subtitle',
            message: msg ? msg : 'Message',
            buttons: ['OK']
        });
        alrt.present();
    };
    SampleDetailPage.prototype.showConfirm = function (ttl, msg) {
        var _this = this;
        if (ttl == 'deleteSampleRow') {
            ttl = 'Delete this sample?';
            msg = 'Are you sure you want to delete this sample?\n(This will delete all sample bottles in this sample.)';
        }
        var confirm = this.alertCtrl.create({
            title: ttl ? ttl : 'Confirm',
            message: msg ? msg : 'Message',
            buttons: [
                {
                    text: 'No',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.deleteSample();
                    }
                }
            ]
        });
        confirm.present();
    };
    return SampleDetailPage;
}());
SampleDetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Users\ehaberman\Desktop\mercurymobile\src\pages\samples\sample-detail.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button large menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Sample {{sample_ID}}</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <div [hidden]="!notready" align="left" id="loading-spinner">\n\n    <ion-spinner></ion-spinner>\n\n  </div>\n\n  <div [hidden]="notready">\n\n    <form (keydown.enter)="$event.preventDefault()" [formGroup]="sampleForm" *ngIf="active" (ngSubmit)="onSubmit(sampleForm.value)">\n\n      <ion-grid id="header" formGroupName="sampleHeaderControls">\n\n        <ion-row>\n\n          <ion-col col-12>\n\n            <ion-item>\n\n              <ion-label> Use data entry widgets</ion-label>\n\n              <ion-toggle (ionChange)="toggleUseWidgets()" [checked]=useWidgets></ion-toggle>\n\n            </ion-item>\n\n          </ion-col>\n\n        </ion-row>\n\n        <ion-row class="sampleFormRow">\n\n          <ion-col col-6>\n\n            <ion-label>Project Name</ion-label>\n\n            <ion-item *ngIf="useWidgets">\n\n              <ion-select class="full-width-select" formControlName="projectName" (ionChange)="projectNameChange(pName.text)" #pName>\n\n                <ion-option *ngFor="let project of myProjects" [value]="project.name" [selected]="project.id == mySample.projectNumber">{{project.name}}</ion-option>\n\n              </ion-select>\n\n            </ion-item>\n\n            <ion-item *ngIf="!useWidgets">\n\n              <ion-input type="text" formControlName="projectName" [value]="mySample.projectName" (blur)="projectNameChange(pName.value)"\n\n                #pName></ion-input>\n\n            </ion-item>\n\n          </ion-col>\n\n          <ion-col col-6>\n\n            <ion-label>Project Number</ion-label>\n\n            <ion-item *ngIf="useWidgets">\n\n              <ion-select  class="full-width-select" formControlName="projectNumber" (ionChange)="projectNumberChange(pNumber.text)" #pNumber>\n\n                <ion-option *ngFor="let project of myProjects" [value]="project.id" [selected]="project.id == mySample.projectNumber">{{project.id}}</ion-option>\n\n              </ion-select>\n\n            </ion-item>\n\n            <ion-item *ngIf="!useWidgets">\n\n              <ion-input type="text" formControlName="projectNumber" [value]="mySample.projectNumber" (ionChange)="projectNumberChange(pNumber.value)"\n\n                #pNumber></ion-input>\n\n            </ion-item>\n\n          </ion-col>\n\n        </ion-row>\n\n        <ion-row class="sampleFormRow">\n\n          <ion-col col-6>\n\n            <ion-label>Site Name</ion-label>\n\n            <ion-item *ngIf="useWidgets">\n\n              <ion-select class="full-width-select" formControlName="siteName" (ionChange)="siteNameChange(sName.text)" #sName>\n\n                <ion-option *ngFor="let site of mySites" [value]="site.name" [selected]="site.id == mySample.siteNumber">{{site.name}}</ion-option>\n\n              </ion-select>\n\n            </ion-item>\n\n            <ion-item *ngIf="!useWidgets">\n\n              <ion-input type="text" formControlName="siteName" [value]="mySample.siteName" (ionChange)="siteNameChange(sName.value)" #sName></ion-input>\n\n            </ion-item>\n\n          </ion-col>\n\n          <ion-col col-6>\n\n            <ion-label>Site Number</ion-label>\n\n            <ion-item *ngIf="useWidgets">\n\n              <ion-select class="full-width-select" formControlName="siteNumber" (ionChange)="siteNumberChange(sName.text)" #sNumber>\n\n                <ion-option *ngFor="let site of mySites" [value]="site.id" [selected]="site.id == mySample.siteNumber">{{site.id}}</ion-option>\n\n              </ion-select>\n\n            </ion-item>\n\n            <ion-item *ngIf="!useWidgets">\n\n              <ion-input type="text" formControlName="siteNumber" [value]="mySample.siteNumber" (ionChange)="siteNumberChange(sNumber.value)"\n\n                #sNumber></ion-input>\n\n            </ion-item>\n\n          </ion-col>\n\n        </ion-row>\n\n        <ion-row class="sampleFormRow">\n\n          <ion-col col-6>\n\n            <ion-label>Date</ion-label>\n\n            <ion-item *ngIf="useWidgets">\n\n              <ion-input type="string" formControlName="sampleDate" (click)="openDateSelect()"></ion-input>\n\n            </ion-item>\n\n            <!-- <ion-item *ngIf="useWidgets"><ion-input type="text" [value]="mySample.date | date:\'MM/dd/y\'" formControlName="sampleDate"></ion-input></ion-item> -->\n\n            <ion-item *ngIf="!useWidgets">\n\n              <ion-input type="text" [value]="mySample.date | date:\'MM/dd/y\'" formControlName="sampleDate"></ion-input>\n\n            </ion-item>\n\n            <!-- <ion-item *ngIf="!useWidgets"><ion-input type="text" pattern="^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/\d\d\d\d$" formControlName="sampleDate"></ion-input></ion-item> -->\n\n          </ion-col>\n\n          <ion-col col-6>\n\n            <ion-label>Time</ion-label>\n\n            <ion-item>\n\n              <ion-input type="text" pattern="^(00|0[0-9]|1[0-9]|2[0-3])([0-5][0-9])$" formControlName="sampleTime"></ion-input>\n\n            </ion-item>\n\n          </ion-col>\n\n        </ion-row>\n\n        <ion-row class="sampleFormRow">\n\n          <ion-col col-6>\n\n            <ion-label>Depth</ion-label>\n\n            <ion-item>\n\n              <ion-input type="text" pattern="^[0-9]*\.?[0-9]+$" formControlName="sampleDepth"></ion-input>\n\n            </ion-item>\n\n          </ion-col>\n\n          <ion-col col-6>\n\n            <ion-label>Rep</ion-label>\n\n            <ion-item>\n\n              <ion-input type="text" pattern="^[0-9]*$" formControlName="sampleRep"></ion-input>\n\n            </ion-item>\n\n          </ion-col>\n\n        </ion-row>\n\n        <ion-row class="sampleFormRow">\n\n          <ion-col col-4>\n\n            <ion-label>Medium</ion-label>\n\n            <ion-item *ngIf="useWidgets">\n\n              <ion-select class="full-width-select" formControlName="sampleMedium" (ionChange)="mediumChange(mName.text.split(\' - \')[0])" #mName>\n\n                <ion-option *ngFor="let medium of myMediums" [value]="medium.nwis_code" [selected]="medium.id == mySample.mediumNumber">{{medium.nwis_code}} - {{medium.description}}</ion-option>\n\n              </ion-select>\n\n            </ion-item>\n\n            <ion-item *ngIf="!useWidgets">\n\n              <ion-input type="text" formControlName="sampleMedium" [value]="mySample.mediumName" (ionChange)="mediumChange(mName.value)"\n\n                #mName></ion-input>\n\n            </ion-item>\n\n          </ion-col>\n\n          <ion-col col-4>\n\n            <ion-label>Acid</ion-label>\n\n            <ion-item *ngIf="useWidgets">\n\n              <ion-input type="string" formControlName="sampleAcid" (click)="openAcidSelect()"></ion-input>\n\n            </ion-item>\n\n            <ion-item *ngIf="!useWidgets">\n\n              <ion-input type="text" formControlName="sampleAcid" (blur)="acidNameChange(aName.value)" #aName></ion-input>\n\n            </ion-item>\n\n          </ion-col>\n\n          <ion-col col-4>\n\n              <ion-label>Filter</ion-label>\n\n              <ion-item *ngIf="useWidgets">                  \n\n                <ion-select formControlName="sampleFilter" class="full-width-select">\n\n                  <ion-option *ngFor="let filter of myFilters" [value]="filter.id" [selected]="false">{{filter.filter}}</ion-option>\n\n                </ion-select>                    \n\n              </ion-item>\n\n              <ion-item *ngIf="!useWidgets">\n\n                <ion-input type="text" formControlName="sampleFilter" (blur)="filterNameChange(aName.value)" #aName></ion-input>\n\n              </ion-item>\n\n            </ion-col>\n\n        </ion-row>\n\n      </ion-grid>\n\n\n\n      <!-- start Bottles -->\n\n      <ion-grid id="body" formGroupName="sampleBottleControls">\n\n        <ion-row>\n\n          <ion-col col-8>\n\n            <h3>Containers</h3>\n\n          </ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n          <ion-col col-7>\n\n            <ion-item class="option-box">\n\n              <ion-label>Lookup Container IDs</ion-label>\n\n              <ion-toggle (ionChange)="toggleLookupContainers()"></ion-toggle>\n\n            </ion-item>\n\n          </ion-col>\n\n          <ion-col col-5>\n\n            <button style="float:right;" ion-button medium type="button" (click)="addRow()">\n\n              <ion-icon name="add-circle"></ion-icon> &nbsp;Add Container</button>\n\n          </ion-col>\n\n        </ion-row>\n\n\n\n        <ion-row style="margin-top:10px;">\n\n          <ion-col col-2 class="text-center" text-center>Container</ion-col>          \n\n          <ion-col col-2 class="text-center" text-center>Analysis</ion-col>          \n\n          <ion-col col-2 class="text-center" text-center>Filter Volume</ion-col>\n\n          <ion-col col-3 class="text-center" text-center>Preservation</ion-col>          \n\n          <ion-col col-2 class="text-center" text-center>Acid Volume</ion-col>\n\n          <ion-col col-1></ion-col>          \n\n        </ion-row>\n\n        \n\n        <!--\n\n        <ion-row *ngFor="let sampleBottleControlsRow of sampleBottleControls.controls; let ndx = index" [formGroup]="sampleBottleControlsRow"\n\n          class="sampleFormRow">{{ndx + 1}}\n\n          <ion-col col-7>\n\n            <ion-item *ngIf="lookupContainers">\n\n              <ion-input type="string" formControlName="bottle" (click)="openBottleSelect(ndx)"></ion-input>\n\n            </ion-item>\n\n            <ion-item *ngIf="!lookupContainers">\n\n              <ion-input type="string" formControlName="bottle" [value]="sampleBottleControls.controls[ndx].controls[\'bottle\'].value"></ion-input>\n\n            </ion-item>\n\n          </ion-col>\n\n          <ion-col col-2>\n\n            <div style="float:right;">\n\n              <button ion-button large type="button" (click)="editSampleBottle(ndx)">\n\n                <ion-icon name="list"></ion-icon>\n\n              </button>\n\n              <button ion-button large type="button" (click)="removeRow(sampleBottleControlsRow)">\n\n                <ion-icon name="remove-circle"></ion-icon>\n\n              </button>\n\n            </div>\n\n          </ion-col>\n\n        </ion-row>-->\n\n\n\n        <!-- bottle integration {{ndx + 1}} -->\n\n        <ion-row *ngFor="let sampleBottleControlsRow of sampleBottleControls.controls; let ndx = index" [formGroup]="sampleBottleControlsRow">\n\n          \n\n          <ion-col col-2>\n\n            <ion-item *ngIf="lookupContainers">\n\n                <ion-input type="string" formControlName="bottle" (click)="openBottleSelect(ndx)" class="full-width-select"></ion-input>\n\n              </ion-item>\n\n              <ion-item *ngIf="!lookupContainers">\n\n                <ion-input type="string" (ionBlur)="addNewBottle($event);" formControlName="bottle" [value]="sampleBottleControls.controls[ndx].controls[\'bottle\'].value" class="full-width-select"></ion-input>\n\n              </ion-item>\n\n          </ion-col>          \n\n          <ion-col col-2>\n\n            <ion-item>\n\n              <ion-select formControlName="analysis" class="full-width-select">\n\n                <ion-option *ngFor="let analysis of myAnalyses" [value]="analysis.id" [selected]="false">{{analysis.analysis}}</ion-option>\n\n              </ion-select>\n\n            </ion-item>\n\n          </ion-col>          \n\n          <ion-col col-2>\n\n            <ion-item>\n\n              <ion-input type="number" formControlName="filterVolume" class="full-width-select"></ion-input>\n\n            </ion-item>\n\n          </ion-col>\n\n          <ion-col col-3>\n\n            <ion-item>\n\n              <ion-select formControlName="preservationType" class="full-width-select">\n\n                <ion-option *ngFor="let preservation of myPreservations" [value]="preservation.id" [selected]="false">{{preservation.preservation}}</ion-option>\n\n              </ion-select>\n\n            </ion-item>\n\n          </ion-col>          \n\n          <ion-col col-2>\n\n            <ion-item>\n\n              <ion-input type="number" formControlName="preservationVolume" class="full-width-select"></ion-input>\n\n            </ion-item>\n\n          </ion-col>\n\n          <ion-col col-1>\n\n              <button ion-button color="danger" small type="button" (click)="removeRow(sampleBottleControlsRow)" style="float:right">\n\n                <ion-icon name="remove-circle"></ion-icon>\n\n              </button>\n\n          </ion-col>          \n\n        </ion-row>\n\n      </ion-grid>\n\n      <!-- end Bottles -->\n\n\n\n      <ion-grid id="comments" formGroupName="sampleCommentControls">\n\n        <ion-row>\n\n          <ion-col>\n\n            <ion-label>Comments</ion-label>\n\n            <ion-item>\n\n              <ion-input type="text" formControlName="sampleComment"></ion-input>\n\n            </ion-item>\n\n          </ion-col>\n\n        </ion-row>\n\n      </ion-grid>\n\n      <div>\n\n        <!-- <p>Form value: {{ sampleForm.value | json }}</p> -->\n\n        <!-- <p>Form status: {{ sampleForm.status | json }}</p> -->\n\n        <button ion-button block large color="secondary" type="submit">Save</button>\n\n        <!--<button ion-button large type="submit" [disabled]="!sampleForm.valid">Save</button>-->\n\n        <!--<button ion-button large type="button" (click)="showConfirm(\'deleteSampleRow\')">Delete</button> just do this from the sample list -->\n\n      </div>\n\n    </form>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\ehaberman\Desktop\mercurymobile\src\pages\samples\sample-detail.html"*/,
        styles: ['.select-wide {max-width: 100%;}'],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["NavController"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["NavController"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["NavParams"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["NavParams"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["AlertController"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["AlertController"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["ModalController"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["ModalController"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["ViewController"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["ViewController"]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormBuilder */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_8__app_sample_sample_service__["a" /* SampleService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__app_sample_sample_service__["a" /* SampleService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_9__app_samplebottle_samplebottle_service__["a" /* SampleBottleService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__app_samplebottle_samplebottle_service__["a" /* SampleBottleService */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_6__app_project_project_service__["a" /* ProjectService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__app_project_project_service__["a" /* ProjectService */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_7__app_medium_medium_service__["a" /* MediumService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__app_medium_medium_service__["a" /* MediumService */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_10__app_acid_acid_service__["a" /* AcidService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__app_acid_acid_service__["a" /* AcidService */]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_11__app_bottle_bottle_service__["a" /* BottleService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11__app_bottle_bottle_service__["a" /* BottleService */]) === "function" && _m || Object, typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_16_ionic2_date_picker__["DatePickerProvider"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_16_ionic2_date_picker__["DatePickerProvider"]) === "function" && _o || Object, typeof (_p = typeof __WEBPACK_IMPORTED_MODULE_18__app_analysis_analysis_service__["a" /* AnalysisService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_18__app_analysis_analysis_service__["a" /* AnalysisService */]) === "function" && _p || Object, typeof (_q = typeof __WEBPACK_IMPORTED_MODULE_19__app_filter_filter_service__["a" /* FilterService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_19__app_filter_filter_service__["a" /* FilterService */]) === "function" && _q || Object, typeof (_r = typeof __WEBPACK_IMPORTED_MODULE_20__app_preservation_preservation_service__["a" /* PreservationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_20__app_preservation_preservation_service__["a" /* PreservationService */]) === "function" && _r || Object, typeof (_s = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["Events"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["Events"]) === "function" && _s || Object])
], SampleDetailPage);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
//# sourceMappingURL=sample-detail.js.map

/***/ }),

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Site; });
var Site = (function () {
    function Site(name, usgs_sid, usgs_scode, description, latitude, longitude, datum, method, site_status, nwis_customer_code, projects, id) {
        this.name = name;
        this.usgs_sid = usgs_sid;
        this.usgs_scode = usgs_scode;
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
        this.datum = datum;
        this.method = method;
        this.site_status = site_status;
        this.nwis_customer_code = nwis_customer_code;
        this.projects = projects;
        this.id = id;
    }
    return Site;
}());

//# sourceMappingURL=site.js.map

/***/ }),

/***/ 30:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APP_UTILITIES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var APP_UTILITIES = (function () {
    function APP_UTILITIES() {
    }
    Object.defineProperty(APP_UTILITIES, "TODAY", {
        get: function () { return new Date().toISOString().substr(0, 10); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_UTILITIES, "TIME", {
        get: function () { return new Date().toISOString().substr(14, 22); },
        enumerable: true,
        configurable: true
    });
    APP_UTILITIES.convertArrayOfObjectsToCSV = function (args) {
        var result, counter, keys, columnDelimiter, lineDelimiter, data, headers;
        headers = [];
        data = args.data || null;
        if (data == null || !data.length) {
            return null;
        }
        columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || '\n';
        keys = Object.keys(data[0]);
        // put the headers array in the same order as the data keys
        keys.forEach(function (item) {
            var obj = args.headers.filter(function (obj) {
                return obj.name == item;
            })[0];
            headers.push(obj.descr);
        });
        // remove keys that aren't in the headers array, ensuring those data columns won't be exported
        // keys.forEach(function(item){
        //     if (headers.indexOf(item) < 0) {
        //         let ndx = keys.indexOf(item);
        //         keys.splice(ndx, 1);
        //     }
        // });
        result = '';
        result += (args.headers) ? headers.join(columnDelimiter) : keys.join(columnDelimiter);
        result += lineDelimiter;
        data.forEach(function (item) {
            counter = 0;
            keys.forEach(function (key) {
                if (counter > 0)
                    result += columnDelimiter;
                if (item[key] == null) {
                    result += '';
                }
                else if (typeof item[key] === 'string' && item[key].includes(",")) {
                    result += '"' + item[key] + '"';
                }
                else {
                    result += item[key];
                }
                counter++;
            });
            result += lineDelimiter;
        });
        return result;
    };
    APP_UTILITIES.downloadCSV = function (args) {
        var data, filename, link;
        var csv = this.convertArrayOfObjectsToCSV({
            data: args.data,
            headers: args.headers
        });
        if (csv == null)
            return;
        filename = args.filename || 'export.csv';
        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);
        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
    };
    APP_UTILITIES.downloadTXT = function (args) {
        var data, filename, link;
        var txt = args.data;
        if (txt == null)
            return;
        filename = args.filename || 'export.txt';
        data = 'data:text/json;charset=utf8,' + encodeURI(txt);
        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
    };
    // the following functions found here: http://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript/4760279#4760279
    APP_UTILITIES.dynamicSort = function (property) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        };
    };
    APP_UTILITIES.dynamicSortMultiple = function (args) {
        function dynamicSort(property) {
            var sortOrder = 1;
            if (property[0] === "-") {
                sortOrder = -1;
                property = property.substr(1);
            }
            return function (a, b) {
                var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                return result * sortOrder;
            };
        }
        /*
         * save the arguments object as it will be overwritten
         * note that arguments object is an array-like object
         * consisting of the names of the properties to sort by
         */
        //let props = arguments;
        var props = args;
        return function (obj1, obj2) {
            var i = 0, result = 0, numberOfProperties = props.length;
            /* try getting a different result from 0 (equal)
             * as long as we have extra properties to compare
             */
            while (result === 0 && i < numberOfProperties) {
                result = dynamicSort(props[i])(obj1, obj2);
                i++;
            }
            return result;
        };
    };
    return APP_UTILITIES;
}());
APP_UTILITIES = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], APP_UTILITIES);

//# sourceMappingURL=app.utilities.js.map

/***/ }),

/***/ 314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BottleSelectPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_bottle_bottle_service__ = __webpack_require__(109);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var BottleSelectPage = (function () {
    function BottleSelectPage(platform, navParams, viewCtrl, _bottleService) {
        this.platform = platform;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this._bottleService = _bottleService;
        this.active = true;
        this.isReadOnly = true;
        this.notready = true;
        this.selectedbottle = '';
        this.bottles = [];
        this._getBottles();
    }
    BottleSelectPage.prototype._getBottles = function () {
        var _this = this;
        this._bottleService.getAll({ include_docs: true, limit: 100 })
            .then(function (response) {
            for (var i = 0; i < response.rows.length; i++) {
                _this.bottles.push(response.rows[i]['id']);
            }
            _this.notready = false;
        }, function (error) {
            _this._errorMessage = error;
            _this.notready = false;
        });
    };
    BottleSelectPage.prototype.filterBottles = function (event, element) {
        var _this = this;
        this.notready = true;
        var val = event.target.value;
        if (val && val.trim() != '') {
            this._bottleService.getBottlesByName(val.toUpperCase())
                .then(function (response) {
                _this.bottles.length = 0;
                for (var i = 0; i < response.rows.length; i++) {
                    _this.bottles.push(response.rows[i]['id']);
                }
                setTimeout(function () {
                    element.setFocus();
                }, 50);
                _this.notready = false;
            }, function (error) {
                _this._errorMessage = error;
                _this.notready = false;
            });
        }
        else {
            this.notready = false;
        }
        ;
    };
    BottleSelectPage.prototype.selectBottle = function (bottle) {
        this.viewCtrl.dismiss(bottle);
    };
    BottleSelectPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return BottleSelectPage;
}());
BottleSelectPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Users\ehaberman\Desktop\mercurymobile\src\pages\samples\bottle-select.html"*/'<ion-header>\n\n  <ion-toolbar>\n\n    <ion-title>\n\n      Select Bottle\n\n    </ion-title>\n\n    <ion-buttons start>\n\n      <button ion-button large (click)="dismiss()">\n\n        <ion-icon name="md-close"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <div [hidden]="!notready" align="center" id="loading-spinner"><ion-spinner></ion-spinner></div>\n\n  <div [hidden]="notready">\n\n    <ion-searchbar (input)="filterBottles($event, searchbar)" placeholder="Filter by text" #searchbar></ion-searchbar>\n\n    <ion-list>\n\n      <ion-item *ngFor="let bottle of bottles">\n\n        <ion-label>{{bottle}}</ion-label>\n\n        <ion-radio [checked]="bottle === selectedBottle" (click)="selectBottle(bottle)"></ion-radio>\n\n      </ion-item>\n\n    </ion-list>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\ehaberman\Desktop\mercurymobile\src\pages\samples\bottle-select.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"],
        __WEBPACK_IMPORTED_MODULE_2__app_bottle_bottle_service__["a" /* BottleService */]])
], BottleSelectPage);

//# sourceMappingURL=bottle-select.js.map

/***/ }),

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AcidSelectPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_acid_acid_service__ = __webpack_require__(78);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AcidSelectPage = (function () {
    function AcidSelectPage(platform, navParams, viewCtrl, _acidService) {
        this.platform = platform;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this._acidService = _acidService;
        this.active = true;
        this.isReadOnly = true;
        this.notready = true;
        this.selectedacid = '';
        this.acids = [];
        this._getAcids();
    }
    AcidSelectPage.prototype._getAcids = function () {
        var _this = this;
        this._acidService.getAll({ include_docs: true, limit: 100 })
            .then(function (response) {
            for (var i = 0; i < response.rows.length; i++) {
                _this.acids.push(response.rows[i]['id']);
            }
            _this.notready = false;
        }, function (error) {
            _this._errorMessage = error;
            _this.notready = false;
        });
    };
    AcidSelectPage.prototype.filterAcids = function (event, element) {
        var _this = this;
        this.notready = true;
        var val = event.target.value;
        if (val && val.trim() != '') {
            this._acidService.getAcidsByName(val.toUpperCase())
                .then(function (response) {
                _this.acids.length = 0;
                for (var i = 0; i < response.rows.length; i++) {
                    _this.acids.push(response.rows[i]['id']);
                }
                setTimeout(function () {
                    element.setFocus();
                }, 50);
                _this.notready = false;
            }, function (error) {
                _this._errorMessage = error;
                _this.notready = false;
            });
        }
        else {
            this.notready = false;
        }
        ;
    };
    AcidSelectPage.prototype.selectAcid = function (acid) {
        this.viewCtrl.dismiss(acid);
    };
    AcidSelectPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return AcidSelectPage;
}());
AcidSelectPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Users\ehaberman\Desktop\mercurymobile\src\pages\samples\acid-select.html"*/'<ion-header>\n\n  <ion-toolbar>\n\n    <ion-title>\n\n      Select Acid\n\n    </ion-title>\n\n    <ion-buttons start>\n\n      <button ion-button large (click)="dismiss()">\n\n        <ion-icon name="md-close"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <div [hidden]="!notready" align="center" id="loading-spinner"><ion-spinner></ion-spinner></div>\n\n  <div [hidden]="notready">\n\n    <ion-searchbar (input)="filterAcids($event, searchbar)" placeholder="Filter by text" #searchbar></ion-searchbar>\n\n    <ion-list>\n\n      <ion-item *ngFor="let acid of acids">\n\n        <ion-label>{{acid}}</ion-label>\n\n        <ion-radio [checked]="acid === selectedAcid" (click)="selectAcid(acid)"></ion-radio>\n\n      </ion-item>\n\n    </ion-list>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\ehaberman\Desktop\mercurymobile\src\pages\samples\acid-select.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"],
        __WEBPACK_IMPORTED_MODULE_2__app_acid_acid_service__["a" /* AcidService */]])
], AcidSelectPage);

//# sourceMappingURL=acid-select.js.map

/***/ }),

/***/ 316:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SampleBottlePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_analysis_analysis_service__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_filter_filter_service__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_preservation_preservation_service__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_samplebottle_samplebottle_service__ = __webpack_require__(73);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SampleBottlePage = (function () {
    function SampleBottlePage(navCtrl, navParams, modalCtrl, fb, _samplebottleService, _analysisService, _filterService, _preservationService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.fb = fb;
        this._samplebottleService = _samplebottleService;
        this._analysisService = _analysisService;
        this._filterService = _filterService;
        this._preservationService = _preservationService;
        this.active = true;
        this.notready = true;
        this.myAnalyses = [];
        this.myFilters = [];
        this.myPreservations = [];
        this.sampleBottleControls = {
            "analysis": new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](null),
            "filterType": new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](null),
            "filterVolume": new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](null),
            "preservationType": new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](null),
            "preservationAcid": new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](null),
            "preservationVolume": new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](null),
            "preservationComment": new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](null)
        };
        this.sampleBottleControlsGroup = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormGroup */](this.sampleBottleControls);
        this.sampleBottleForm = fb.group({ sampleBottleControlsGroup: this.sampleBottleControlsGroup });
        //this._getBottles();
        this._getAnalyses();
        this._getFilters();
        this._getPreservations();
        // If we navigated to this page, we will have an item available as a nav param
        this.sample_bottle_ID = this.navParams.get('samplebottle');
        if (this.sample_bottle_ID) {
            this._getSampleBottle(this.sample_bottle_ID.toString());
        }
        else {
            this.notready = false;
        }
    }
    SampleBottlePage.prototype._updateControls = function () {
        this.sampleBottleControls['filterVolume'].setValue(this.mySampleBottle['volume_filtered']);
        this.sampleBottleControls['preservationVolume'].setValue(this.mySampleBottle['preservation_volume']);
        this.sampleBottleControls['preservationComment'].setValue(this.mySampleBottle['preservation_comment']);
    };
    SampleBottlePage.prototype._getSampleBottle = function (sampleBottleID) {
        var _this = this;
        this._samplebottleService.getOne(sampleBottleID)
            .then(function (response) {
            if (typeof response == "undefined") {
                alert("undefined");
                _this.notready = false;
            }
            else {
                _this.mySampleBottle = response;
                _this.sample_bottle_name = _this.mySampleBottle['bottle_string'] || response['_id'];
                _this._updateControls();
                // (<FormGroup>this.sampleBottleControls).controls['filterVolume'].setValue(this.mySampleBottle['volume_filtered']);
                // (<FormGroup>this.sampleBottleControls).controls['preservationAcid'].setValue(this.mySampleBottle['preservation_acid']);
                // (<FormGroup>this.sampleBottleControls).controls['preservationVolume'].setValue(this.mySampleBottle['preservation_volume']);
                _this.notready = false;
            }
        }, function (error) { return _this._errorMessage = error; });
    };
    SampleBottlePage.prototype._getAnalyses = function () {
        var _this = this;
        this._analysisService.getAll()
            .then(function (response) {
            for (var i = 0; i < response.rows.length; i++) {
                _this.myAnalyses.push(response.rows[i].doc);
            }
        }, function (error) {
            _this._errorMessage = error;
        });
    };
    SampleBottlePage.prototype._getFilters = function () {
        var _this = this;
        this._filterService.getAll()
            .then(function (response) {
            for (var i = 0; i < response.rows.length; i++) {
                _this.myFilters.push(response.rows[i].doc);
            }
        }, function (error) {
            _this._errorMessage = error;
        });
    };
    SampleBottlePage.prototype._getPreservations = function () {
        var _this = this;
        this._preservationService.getAll()
            .then(function (response) {
            for (var i = 0; i < response.rows.length; i++) {
                _this.myPreservations.push(response.rows[i].doc);
            }
        }, function (error) {
            _this._errorMessage = error;
        });
    };
    SampleBottlePage.prototype.onSubmit = function (formValue) {
        var _this = this;
        // TODO: build proper onSubmit function, including validations
        this.mySampleBottle['analysis_type'] = formValue.sampleBottleControlsGroup.analysis;
        this.mySampleBottle['filter_type'] = formValue.sampleBottleControlsGroup.filterType;
        this.mySampleBottle['volume_filtered'] = formValue.sampleBottleControlsGroup.filterVolume;
        this.mySampleBottle['preservation_type'] = formValue.sampleBottleControlsGroup.preservationType;
        this.mySampleBottle['preservation_volume'] = formValue.sampleBottleControlsGroup.preservationVolume;
        this.mySampleBottle['preservation_comment'] = formValue.sampleBottleControlsGroup.preservationComment;
        this._samplebottleService.update(this.mySampleBottle).then(function (response) {
            _this.navCtrl.pop();
        });
    };
    return SampleBottlePage;
}());
SampleBottlePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Users\ehaberman\Desktop\mercurymobile\src\pages\samples\sample-bottle.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button large menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Sample Bottle {{sample_bottle_name}}</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <div [hidden]="!notready" align="left" id="loading-spinner"><ion-spinner></ion-spinner></div>\n\n  <div [hidden]="notready">\n\n    <form (keydown.enter)="$event.preventDefault()" [formGroup]="sampleBottleForm" *ngIf="active" (ngSubmit)="onSubmit(sampleBottleForm.value)">\n\n      <ion-grid id="body" formGroupName="sampleBottleControls">\n\n        <ion-row>\n\n          <ion-col width-10>Analysis</ion-col>\n\n          <ion-col width-90>\n\n            <ion-item>\n\n              <ion-select class="select-wide" formControlName="analysis">\n\n                <ion-option *ngFor="let analysis of myAnalyses" [value]="analysis.id" [selected]="analysis.id == mySampleBottle.analysis_type">{{analysis.analysis}}</ion-option>\n\n              </ion-select>\n\n            </ion-item>\n\n          </ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n          <ion-col width-10>Filter</ion-col>\n\n          <ion-col width-90>\n\n            <ion-item>\n\n              <ion-select class="select-wide" formControlName="filterType">\n\n                <ion-option *ngFor="let filter of myFilters" [value]="filter.id" [selected]="filter.id == mySampleBottle.filter_type">{{filter.filter}}</ion-option>\n\n              </ion-select>\n\n            </ion-item>\n\n          </ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n          <ion-col width-10>Filter Volume</ion-col>\n\n          <ion-col width-90>\n\n            <ion-item>\n\n              <ion-input type="number" formControlName="filterVolume"></ion-input>\n\n            </ion-item>\n\n          </ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n          <ion-col width-10>Preservation</ion-col>\n\n          <ion-col width-90>\n\n            <ion-item>\n\n              <ion-select class="select-wide" formControlName="preservationType">\n\n                <ion-option *ngFor="let preservation of myPreservations" [value]="preservation.id"  [selected]="preservation.id == mySampleBottle.preservation_type">{{preservation.preservation}}</ion-option>\n\n              </ion-select>\n\n            </ion-item>\n\n          </ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n          <ion-col width-10>Acid Volume</ion-col>\n\n          <ion-col width-90>\n\n            <ion-item>\n\n              <ion-input type="number" formControlName="preservationVolume"></ion-input>\n\n            </ion-item>\n\n          </ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n          <ion-col width-10>Preservation Comment</ion-col>\n\n          <ion-col width-90>\n\n            <ion-item>\n\n              <ion-input type="text" formControlName="preservationComment"></ion-input>\n\n            </ion-item>\n\n          </ion-col>\n\n        </ion-row>\n\n      </ion-grid>\n\n      <div><button ion-button large type="submit">Save</button></div>\n\n    </form>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\ehaberman\Desktop\mercurymobile\src\pages\samples\sample-bottle.html"*/,
        styles: ['.select-wide {max-width: 100%;}']
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["NavController"],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["NavParams"],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["ModalController"],
        __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_6__app_samplebottle_samplebottle_service__["a" /* SampleBottleService */],
        __WEBPACK_IMPORTED_MODULE_3__app_analysis_analysis_service__["a" /* AnalysisService */],
        __WEBPACK_IMPORTED_MODULE_4__app_filter_filter_service__["a" /* FilterService */],
        __WEBPACK_IMPORTED_MODULE_5__app_preservation_preservation_service__["a" /* PreservationService */]])
], SampleBottlePage);

//# sourceMappingURL=sample-bottle.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APP_SETTINGS; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var APP_SETTINGS = APP_SETTINGS_1 = (function () {
    function APP_SETTINGS() {
    }
    Object.defineProperty(APP_SETTINGS, "environment", {
        set: function (env) { this._environment = env; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(APP_SETTINGS, "AUTH_URL", {
        get: function () { return this._API_ENDPOINT + 'auth/'; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(APP_SETTINGS, "ACIDS_URL", {
        get: function () { return this._API_ENDPOINT + 'acids/'; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(APP_SETTINGS, "ANALYSES_URL", {
        get: function () { return this._API_ENDPOINT + 'analyses/'; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(APP_SETTINGS, "BOTTLES_URL", {
        get: function () { return this._API_ENDPOINT + 'bottles/'; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(APP_SETTINGS, "FILTERS_URL", {
        get: function () { return this._API_ENDPOINT + 'filters/'; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(APP_SETTINGS, "MEDIUMS_URL", {
        get: function () { return this._API_ENDPOINT + 'mediums/'; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(APP_SETTINGS, "PRESERVATIONS_URL", {
        get: function () { return this._API_ENDPOINT + 'preservations/'; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(APP_SETTINGS, "PROJECTS_URL", {
        get: function () { return this._API_ENDPOINT + 'projects/'; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(APP_SETTINGS, "SAMPLES_URL", {
        get: function () { return this._API_ENDPOINT + 'samples/'; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(APP_SETTINGS, "SAMPLEBOTTLES_URL", {
        get: function () { return this._API_ENDPOINT + 'samplebottles/'; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(APP_SETTINGS, "SITES_URL", {
        get: function () { return this._API_ENDPOINT + 'sites/'; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(APP_SETTINGS, "USERS_URL", {
        get: function () { return this._API_ENDPOINT + 'users/'; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(APP_SETTINGS, "MIN_JSON_HEADERS", {
        get: function () { return new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Accept': 'application/json' }); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(APP_SETTINGS, "JSON_HEADERS", {
        get: function () { return new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' }); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(APP_SETTINGS, "AUTH_HEADERS", {
        get: function () { return new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) }); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(APP_SETTINGS, "MIN_AUTH_JSON_HEADERS", {
        get: function () {
            return new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
                'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')),
                'Accept': 'application/json'
            });
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(APP_SETTINGS, "AUTH_JSON_HEADERS", {
        get: function () {
            return new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
                'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')),
                'Accept': 'application/json', 'Content-Type': 'application/json'
            });
        },
        enumerable: true,
        configurable: true
    });
    ;
    return APP_SETTINGS;
}());
APP_SETTINGS._environment = 'development';
APP_SETTINGS._API_ENDPOINT = APP_SETTINGS_1._environment == 'production' ? 'http://' + window.location.hostname + '/mercuryservices/' : 'http://localhost:8000/mercuryservices/';
APP_SETTINGS = APP_SETTINGS_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], APP_SETTINGS);

var APP_SETTINGS_1;
//# sourceMappingURL=app.settings.js.map

/***/ }),

/***/ 439:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterSelectPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_filter_filter_service__ = __webpack_require__(79);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FilterSelectPage = (function () {
    function FilterSelectPage(platform, navParams, viewCtrl, _filterService) {
        this.platform = platform;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this._filterService = _filterService;
        this.active = true;
        this.isReadOnly = true;
        this.notready = true;
        this.selectedfilter = '';
        this.filters = [];
        this._getFilters();
    }
    FilterSelectPage.prototype._getFilters = function () {
        var _this = this;
        this._filterService.getAll({ include_docs: true, limit: 100 })
            .then(function (response) {
            for (var i = 0; i < response.rows.length; i++) {
                _this.filters.push(response.rows[i]['id']);
            }
            _this.notready = false;
        }, function (error) {
            _this._errorMessage = error;
            _this.notready = false;
        });
    };
    FilterSelectPage.prototype.selectAcid = function (filter) {
        this.viewCtrl.dismiss(filter);
    };
    FilterSelectPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return FilterSelectPage;
}());
FilterSelectPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Users\ehaberman\Desktop\mercurymobile\src\pages\samples\filter-select.html"*/'<ion-header>\n\n    <ion-toolbar>\n\n        <ion-title>\n\n            Select Filter\n\n        </ion-title>\n\n        <ion-buttons start>\n\n            <button ion-button large (click)="dismiss()">\n\n                <ion-icon name="md-close"></ion-icon>\n\n            </button>\n\n        </ion-buttons>\n\n    </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <div [hidden]="!notready" align="center" id="loading-spinner">\n\n        <ion-spinner></ion-spinner>\n\n    </div>\n\n    <div [hidden]="notready">\n\n        <ion-list>\n\n            <ion-item *ngFor="let filter of filteres">\n\n                <ion-label>{{filter}}</ion-label>\n\n                <ion-radio [checked]="filter === selectedFilter" (click)="selectFilter(acid)"></ion-radio>\n\n            </ion-item>\n\n        </ion-list>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\ehaberman\Desktop\mercurymobile\src\pages\samples\filter-select.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"],
        __WEBPACK_IMPORTED_MODULE_2__app_filter_filter_service__["a" /* FilterService */]])
], FilterSelectPage);

//# sourceMappingURL=filter-select.js.map

/***/ }),

/***/ 440:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BulkAcidUpdatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_acid_acid_service__ = __webpack_require__(78);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var BulkAcidUpdatePage = (function () {
    function BulkAcidUpdatePage(navParams, viewCtrl, _acidService, alertCtrl) {
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this._acidService = _acidService;
        this.alertCtrl = alertCtrl;
        this.selectedacid = '';
        this.acids = [];
        this._getAcids();
    }
    BulkAcidUpdatePage.prototype._getAcids = function () {
        var _this = this;
        this._acidService.getAll({ include_docs: true, limit: 100 })
            .then(function (response) {
            for (var i = 0; i < response.rows.length; i++) {
                _this.acids.push(response.rows[i]['id']);
            }
        }, function (error) {
            _this._errorMessage = error;
        });
    };
    BulkAcidUpdatePage.prototype.filterAcids = function (event, element) {
        var _this = this;
        var val = event.target.value;
        if (val && val.trim() != '') {
            this._acidService.getAcidsByName(val.toUpperCase())
                .then(function (response) {
                _this.acids.length = 0;
                for (var i = 0; i < response.rows.length; i++) {
                    _this.acids.push(response.rows[i]['id']);
                }
                setTimeout(function () {
                    element.setFocus();
                }, 50);
            }, function (error) {
                _this._errorMessage = error;
            });
        }
        else { }
        ;
    };
    BulkAcidUpdatePage.prototype.selectAcid = function (acid) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Bulk Update Acids',
            message: 'Are you sure you want to update ALL of the selected sites with ' + acid + ' acid?\n\n(This cannot be undone.)',
            buttons: [
                {
                    text: 'No',
                    handler: function () {
                        console.log('Disagree clicked');
                        _this.viewCtrl.dismiss();
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.viewCtrl.dismiss(acid);
                    }
                }
            ]
        });
        confirm.present();
    };
    BulkAcidUpdatePage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return BulkAcidUpdatePage;
}());
BulkAcidUpdatePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Users\ehaberman\Desktop\mercurymobile\src\pages\samples\acid-select.html"*/'<ion-header>\n\n  <ion-toolbar>\n\n    <ion-title>\n\n      Select Acid\n\n    </ion-title>\n\n    <ion-buttons start>\n\n      <button ion-button large (click)="dismiss()">\n\n        <ion-icon name="md-close"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <div [hidden]="!notready" align="center" id="loading-spinner"><ion-spinner></ion-spinner></div>\n\n  <div [hidden]="notready">\n\n    <ion-searchbar (input)="filterAcids($event, searchbar)" placeholder="Filter by text" #searchbar></ion-searchbar>\n\n    <ion-list>\n\n      <ion-item *ngFor="let acid of acids">\n\n        <ion-label>{{acid}}</ion-label>\n\n        <ion-radio [checked]="acid === selectedAcid" (click)="selectAcid(acid)"></ion-radio>\n\n      </ion-item>\n\n    </ion-list>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\ehaberman\Desktop\mercurymobile\src\pages\samples\acid-select.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"],
        __WEBPACK_IMPORTED_MODULE_2__app_acid_acid_service__["a" /* AcidService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"]])
], BulkAcidUpdatePage);

//# sourceMappingURL=bulk-acid-update.js.map

/***/ }),

/***/ 441:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SiteDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_site_site__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_site_site_service__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_project_project_service__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SiteDetailPage = (function () {
    function SiteDetailPage(fb, platform, navParams, viewCtrl, _siteService, _projectService) {
        this.platform = platform;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this._siteService = _siteService;
        this._projectService = _projectService;
        this.active = true;
        this.isReadOnly = true;
        this.notready = true;
        this.mySite = new __WEBPACK_IMPORTED_MODULE_3__app_site_site__["a" /* Site */]();
        this.myProjects = [];
        this._myOriginalProjects = [];
        this._getProjects();
        // get the fields for the object type
        this._mySite_fields = Object.keys(this.mySite);
        // make the controls for the control group
        this._siteControls = this._makeControls(this._mySite_fields);
        // populate the control groups with the controls
        this.sitegroup = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormGroup */](this._siteControls);
        // build the form
        this.siteForm = fb.group({
            sitegroup: this.sitegroup
        });
        // get the Site name from the route; if we navigated to this page, we will have an item available as a nav param
        this.site_name = this.navParams.get('name');
        // if the Site name exists, get the site details
        if (this.site_name) {
            this.isReadOnly = true;
            this._getSite(this.site_name);
        }
        else {
            this.isReadOnly = false;
            this.notready = false;
        }
    }
    SiteDetailPage.prototype._makeControls = function (fields) {
        var controls = {};
        for (var i = 0, j = fields.length; i < j; i++) {
            if (fields[i] == 'name') {
                controls[fields[i]] = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */]({ value: "", disabled: false }, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["i" /* Validators */].required);
            }
            else {
                controls[fields[i]] = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */]({ value: "", disabled: false });
            }
        }
        return controls;
    };
    SiteDetailPage.prototype._updateControls = function (fields, controls, values) {
        for (var i = 0, j = fields.length; i < j; i++) {
            var field = fields[i];
            controls[field].setValue(values[field]);
        }
    };
    SiteDetailPage.prototype._getSite = function (site_name) {
        var _this = this;
        this._siteService.getOne(site_name)
            .then(function (response) {
            _this.mySite = response;
            _this._myOriginalProjects = response['projects'];
            _this._updateControls(_this._mySite_fields, _this._siteControls, _this.mySite);
            _this.mySite = response;
            _this.notready = false;
        }, function (error) { return console.log(error); }); //this._errorMessage = <any>error);
    };
    SiteDetailPage.prototype._getProjects = function () {
        var _this = this;
        this._projectService.getAll()
            .then(function (response) {
            for (var i = 0; i < response.rows.length; i++) {
                _this.myProjects.push(response.rows[i].doc);
            }
        }, function (error) {
            _this._errorMessage = error;
        });
    };
    SiteDetailPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    SiteDetailPage.prototype.onSubmit = function (formValue) {
        var _this = this;
        // TODO: build proper onSubmit function, including validations
        this.mySite['name'] = formValue.sitegroup.name;
        this.mySite['usgs_sid'] = formValue.sitegroup.usgs_sid;
        this.mySite['usgs_scode'] = formValue.sitegroup.usgs_scode;
        this.mySite['description'] = formValue.sitegroup.description;
        this.mySite['latitude'] = formValue.sitegroup.latitude;
        this.mySite['longitude'] = formValue.sitegroup.longitude;
        this.mySite['datum'] = formValue.sitegroup.datum;
        this.mySite['method'] = formValue.sitegroup.method;
        this.mySite['site_status'] = formValue.sitegroup.site_status;
        this.mySite['nwis_customer_code'] = formValue.sitegroup.nwis_customer_code;
        this.mySite['projects'] = formValue.sitegroup.projects;
        this.mySite['id'] = formValue.sitegroup.id;
        this.mySite['_id'] = formValue.sitegroup.name;
        this._siteService.update(this.mySite).then(function (response) {
            if (_this.mySite['projects'] != _this._myOriginalProjects) {
                var newSite_1 = { "id": _this.mySite['id'], "name": _this.mySite['name'], "usgs_scode": _this.mySite['usgs_scode'] };
                for (var _i = 0, _a = _this.mySite['projects']; _i < _a.length; _i++) {
                    var projectID = _a[_i];
                    if (_this._myOriginalProjects.indexOf(projectID) < 0) {
                        _this._projectService.findProjectByID(projectID).then(function (response) {
                            var project = response[0];
                            project['sites'].push(newSite_1);
                            _this._projectService.update(project).then(function (response) {
                                _this.dismiss();
                            });
                        });
                    }
                }
            }
            else {
                _this.dismiss();
            }
        });
    };
    return SiteDetailPage;
}());
SiteDetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Users\ehaberman\Desktop\mercurymobile\src\pages\sites\site-detail.html"*/'<ion-header>\n\n  <ion-toolbar>\n\n    <ion-title *ngIf="site_name">\n\n      Edit Site {{site_name}}\n\n    </ion-title>\n\n    <ion-title *ngIf="!site_name">\n\n      Add Site\n\n    </ion-title>\n\n    <ion-buttons start>\n\n      <button ion-button large (click)="dismiss()">\n\n        <ion-icon name="md-close"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <div [hidden]="!notready" align="left" id="loading-spinner"><ion-spinner></ion-spinner></div>\n\n  <div [hidden]="notready">\n\n    <form (keydown.enter)="$event.preventDefault()" [formGroup]="siteForm" *ngIf="active" (ngSubmit)="onSubmit(siteForm.value)">\n\n      <ion-grid id="sitegroup" formGroupName="sitegroup">\n\n        <ion-row>\n\n          <ion-input type="number" [hidden]="true" formControlName="id"></ion-input>\n\n        </ion-row>\n\n        <ion-row>\n\n          <ion-col col-4><ion-label>Site Name</ion-label></ion-col>\n\n          <ion-col col-8><ion-item><ion-input type="text" formControlName="name"></ion-input></ion-item></ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n          <ion-col col-4><ion-label>USGS SID</ion-label></ion-col>\n\n          <ion-col col-8><ion-item><ion-input type="text" formControlName="usgs_sid"></ion-input></ion-item></ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n          <ion-col col-4><ion-label>USGS SCode</ion-label></ion-col>\n\n          <ion-col col-8><ion-item><ion-input type="text" formControlName="usgs_scode"></ion-input></ion-item></ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n          <ion-col col-4><ion-label>Description</ion-label></ion-col>\n\n          <ion-col col-8><ion-item><ion-input type="text" formControlName="description"></ion-input></ion-item></ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n          <ion-col col-4><ion-label>Latitude</ion-label></ion-col>\n\n          <ion-col col-8><ion-item><ion-input type="text" formControlName="latitude"></ion-input></ion-item></ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n          <ion-col col-4><ion-label>Longitude</ion-label></ion-col>\n\n          <ion-col col-8><ion-item><ion-input type="text" formControlName="longitude"></ion-input></ion-item></ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n          <ion-col col-4><ion-label>Datum</ion-label></ion-col>\n\n          <ion-col col-8><ion-item><ion-input type="text" formControlName="datum"></ion-input></ion-item></ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n          <ion-col col-4><ion-label>Method</ion-label></ion-col>\n\n          <ion-col col-8><ion-item><ion-input type="text" formControlName="method"></ion-input></ion-item></ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n          <ion-col col-4><ion-label>Site Status</ion-label></ion-col>\n\n          <ion-col col-8><ion-item><ion-input type="text" formControlName="site_status"></ion-input></ion-item></ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n          <ion-col col-4><ion-label>NWIS Customer Code</ion-label></ion-col>\n\n          <ion-col col-8><ion-item><ion-input type="text" formControlName="nwis_customer_code"></ion-input></ion-item></ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n          <ion-col col-4><ion-label>Project(s)</ion-label></ion-col>\n\n          <ion-col col-8><ion-item><ion-select [multiple]="true" formControlName="projects">\n\n            <ion-option *ngFor="let project of myProjects" [value]="project.id" [selected]="false">{{project.name}}</ion-option>\n\n          </ion-select></ion-item></ion-col>\n\n        </ion-row>\n\n      </ion-grid>\n\n      <div><button ion-button large type="submit">Save</button></div>\n\n    </form>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\ehaberman\Desktop\mercurymobile\src\pages\sites\site-detail.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["Platform"],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["NavParams"],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["ViewController"],
        __WEBPACK_IMPORTED_MODULE_4__app_site_site_service__["a" /* SiteService */],
        __WEBPACK_IMPORTED_MODULE_5__app_project_project_service__["a" /* ProjectService */]])
], SiteDetailPage);

//# sourceMappingURL=site-detail.js.map

/***/ }),

/***/ 442:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_utilities__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_project_project_service__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_site_site_service__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_medium_medium_service__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_sample_sample_service__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_samplebottle_samplebottle_service__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_acid_acid_service__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_bottle_bottle_service__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_analysis_analysis_service__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_filter_filter_service__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_preservation_preservation_service__ = __webpack_require__(111);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var ConfigPage = (function () {
    function ConfigPage(navCtrl, _sampleService, _samplebottleService, _projectService, _siteService, _mediumService, _acidService, _bottleService, _analysisService, _filterService, _preservationService) {
        this.navCtrl = navCtrl;
        this._sampleService = _sampleService;
        this._samplebottleService = _samplebottleService;
        this._projectService = _projectService;
        this._siteService = _siteService;
        this._mediumService = _mediumService;
        this._acidService = _acidService;
        this._bottleService = _bottleService;
        this._analysisService = _analysisService;
        this._filterService = _filterService;
        this._preservationService = _preservationService;
        this.notready = false;
        this.myServices = {};
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
        // this._acidService.initDB();
        // this._bottleService.initDB();
        // this._projectService.initDB();
        // this._siteService.initDB();
    }
    ConfigPage.prototype.fileDragHover = function (fileInput) {
        fileInput.stopPropagation();
        fileInput.preventDefault();
    };
    ConfigPage.prototype.loadFile = function (srv, fileInput) {
        var self = this;
        this.fileDragHover(fileInput);
        var selectedFiles = fileInput.target.files || fileInput.dataTransfer.files;
        var reader = new FileReader();
        reader.onload = function (e) {
            self.notready = true;
            self.myServices[srv].destroyDB().then(function (response) {
                self.myServices[srv].loadDB(reader.result).then(function (response) { self.notready = false; });
            });
        };
        reader.readAsBinaryString(selectedFiles[0]);
    };
    ConfigPage.prototype.dumpFile = function (service) {
        var self = this;
        self.notready = true;
        if (service == "all") {
            var services = Object.keys(self.myServices);
            for (var _i = 0, services_1 = services; _i < services_1.length; _i++) {
                var service_1 = services_1[_i];
                this._callDump(service_1);
            }
        }
        else {
            this._callDump(service);
        }
    };
    ConfigPage.prototype._callDump = function (service) {
        var _this = this;
        var filename = service + "_" + __WEBPACK_IMPORTED_MODULE_2__app_app_utilities__["a" /* APP_UTILITIES */].TODAY + ".txt";
        this.myServices[service].getAll({ include_docs: false, limit: 1 }).then(function (response) {
            if (response.total_rows > 0) {
                _this.myServices[service].dumpDB(filename).then(function (response) { _this.notready = false; });
            }
        });
    };
    ConfigPage.prototype.destroyDB = function (service) {
        var self = this;
        self.notready = true;
        if (service == "all") {
            var services = Object.keys(self.myServices);
            for (var _i = 0, services_2 = services; _i < services_2.length; _i++) {
                var service_2 = services_2[_i];
                this._callDestroy(service_2);
            }
        }
        else {
            this._callDestroy(service);
        }
    };
    ConfigPage.prototype._callDestroy = function (service) {
        var _this = this;
        this.myServices[service].destroyDB().then(function (response) { _this.notready = false; });
    };
    return ConfigPage;
}());
ConfigPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Users\ehaberman\Desktop\mercurymobile\src\pages\config\config.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button large menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Config</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding class="home">\n\n  <h2>Config</h2>\n\n  <div [hidden]="!notready" align="left" id="loading-spinner"><ion-spinner></ion-spinner></div>\n\n  <div [hidden]="notready">\n\n  <ion-grid>\n\n    <ion-row>\n\n      <ion-col col-4><button ion-button large type="button" (click)="dumpFile(\'acids\')">Export Acids</button></ion-col>\n\n      <ion-col col-4><label ion-button large for="fileSelectAcids">Import Acids</label><input id="fileSelectAcids" type="file" multiple (change)="loadFile(\'acids\', $event)" style="display: none;" /></ion-col>\n\n      <ion-col col-4><button ion-button large type="button" (click)="destroyDB(\'acids\')">Empty Acids</button></ion-col>\n\n    </ion-row>\n\n    <ion-row>\n\n      <ion-col col-4><button ion-button large type="button" (click)="dumpFile(\'analyses\')">Export Analyses</button></ion-col>\n\n      <ion-col col-4><label ion-button large for="fileSelectAnalyses">Import Analyses</label><input id="fileSelectAnalyses" type="file" multiple (change)="loadFile(\'analyses\', $event)" style="display: none;" /></ion-col>\n\n      <ion-col col-4><button ion-button large type="button" (click)="destroyDB(\'analyses\')">Empty Analyses</button></ion-col>\n\n    </ion-row>\n\n    <ion-row>\n\n      <ion-col col-4><button ion-button large type="button" (click)="dumpFile(\'bottles\')">Export Bottles</button></ion-col>\n\n      <ion-col col-4><label ion-button large for="fileSelectBottles">Import Bottles</label><input id="fileSelectBottles" type="file" multiple (change)="loadFile(\'bottles\', $event)" style="display: none;" /></ion-col>\n\n      <ion-col col-4><button ion-button large type="button" (click)="destroyDB(\'bottles\')">Empty Bottles</button></ion-col>\n\n    </ion-row>\n\n    <ion-row>\n\n      <ion-col col-4><button ion-button large type="button" (click)="dumpFile(\'filters\')">Export Filters</button></ion-col>\n\n      <ion-col col-4><label ion-button large for="fileSelectFilters">Import Filters</label><input id="fileSelectFilters" type="file" multiple (change)="loadFile(\'filters\', $event)" style="display: none;" /></ion-col>\n\n      <ion-col col-4><button ion-button large type="button" (click)="destroyDB(\'filters\')">Empty Filters</button></ion-col>\n\n    </ion-row>\n\n    <ion-row>\n\n      <ion-col col-4><button ion-button large type="button" (click)="dumpFile(\'mediums\')">Export Mediums</button></ion-col>\n\n      <ion-col col-4><label ion-button large for="fileSelectMediums">Import Mediums</label><input id="fileSelectMediums" type="file" multiple (change)="loadFile(\'mediums\', $event)" style="display: none;" /></ion-col>\n\n      <ion-col col-4><button ion-button large type="button" (click)="destroyDB(\'mediums\')">Empty Mediums</button></ion-col>\n\n    </ion-row>\n\n    <ion-row>\n\n      <ion-col col-4><button ion-button large type="button" (click)="dumpFile(\'preservations\')">Export Preservations</button></ion-col>\n\n      <ion-col col-4><label ion-button large for="fileSelectPreservations">Import Preservations</label><input id="fileSelectPreservations" type="file" multiple (change)="loadFile(\'preservations\', $event)" style="display: none;" /></ion-col>\n\n      <ion-col col-4><button ion-button large type="button" (click)="destroyDB(\'preservations\')">Empty Preservations</button></ion-col>\n\n    </ion-row>\n\n    <ion-row>\n\n      <ion-col col-4><button ion-button large type="button" (click)="dumpFile(\'projects\')">Export Projects</button></ion-col>\n\n      <ion-col col-4><label ion-button large for="fileSelectProjects">Import Projects</label><input id="fileSelectProjects" type="file" multiple (change)="loadFile(\'projects\', $event)" style="display: none;" /></ion-col>\n\n      <ion-col col-4><button ion-button large type="button" (click)="destroyDB(\'projects\')">Empty Projects</button></ion-col>\n\n    </ion-row>\n\n    <ion-row>\n\n      <ion-col col-4><button ion-button large type="button" (click)="dumpFile(\'samples\')">Export Samples</button></ion-col>\n\n      <ion-col col-4><label ion-button large for="fileSelectSamples">Import Samples</label><input id="fileSelectSamples" type="file" multiple (change)="loadFile(\'samples\', $event)" style="display: none;" /></ion-col>\n\n      <ion-col col-4><button ion-button large type="button" (click)="destroyDB(\'samples\')">Empty Samples</button></ion-col>\n\n    </ion-row>\n\n    <ion-row>\n\n      <ion-col col-4><button ion-button large type="button" (click)="dumpFile(\'samplebottles\')">Export SampleBottles</button></ion-col>\n\n      <ion-col col-4><label ion-button large for="fileSelectSampleBottles">Import SampleBottles</label><input id="fileSelectSampleBottles" type="file" multiple (change)="loadFile(\'samplebottles\', $event)" style="display: none;" /></ion-col>\n\n      <ion-col col-4><button ion-button large type="button" (click)="destroyDB(\'samplebottles\')">Empty SampleBottles</button></ion-col>\n\n    </ion-row>\n\n    <ion-row>\n\n      <ion-col col-4><button ion-button large type="button" (click)="dumpFile(\'sites\')">Export Sites</button></ion-col>\n\n      <ion-col col-4><label ion-button large for="fileSelectSites">Import Sites</label><input id="fileSelectSites" type="file" multiple (change)="loadFile(\'sites\', $event)" style="display: none;" /></ion-col>\n\n      <ion-col col-4><button ion-button large type="button" (click)="destroyDB(\'sites\')">Empty Sites</button></ion-col>\n\n    </ion-row>\n\n    <ion-row>\n\n      <ion-col col-4><button ion-button large color="secondary" type="button" (click)="dumpFile(\'all\')"><strong>Export ALL</strong></button></ion-col>\n\n      <ion-col col-4><!--<label ion-button large for="fileSelectAll"><strong>Import ALL</strong></label><input id="fileSelectAll" type="file" multiple (change)="loadFile(\'all\', $event)" style="display: none;" />--></ion-col>\n\n      <ion-col col-4><button ion-button large color="secondary" type="button" (click)="destroyDB(\'all\')"><strong>Empty ALL</strong></button></ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\ehaberman\Desktop\mercurymobile\src\pages\config\config.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
        __WEBPACK_IMPORTED_MODULE_6__app_sample_sample_service__["a" /* SampleService */],
        __WEBPACK_IMPORTED_MODULE_7__app_samplebottle_samplebottle_service__["a" /* SampleBottleService */],
        __WEBPACK_IMPORTED_MODULE_3__app_project_project_service__["a" /* ProjectService */],
        __WEBPACK_IMPORTED_MODULE_4__app_site_site_service__["a" /* SiteService */],
        __WEBPACK_IMPORTED_MODULE_5__app_medium_medium_service__["a" /* MediumService */],
        __WEBPACK_IMPORTED_MODULE_8__app_acid_acid_service__["a" /* AcidService */],
        __WEBPACK_IMPORTED_MODULE_9__app_bottle_bottle_service__["a" /* BottleService */],
        __WEBPACK_IMPORTED_MODULE_10__app_analysis_analysis_service__["a" /* AnalysisService */],
        __WEBPACK_IMPORTED_MODULE_11__app_filter_filter_service__["a" /* FilterService */],
        __WEBPACK_IMPORTED_MODULE_12__app_preservation_preservation_service__["a" /* PreservationService */]])
], ConfigPage);

//# sourceMappingURL=config.js.map

/***/ }),

/***/ 443:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(444);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(448);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 448:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(492);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__acid_acid_service__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__analysis_analysis_service__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__authentication_authentication_service__ = __webpack_require__(806);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__bottle_bottle_service__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__filter_filter_service__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__medium_medium_service__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__preservation_preservation_service__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__project_project_service__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__sample_sample_service__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__samplebottle_samplebottle_service__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__site_site_service__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__users_user_service__ = __webpack_require__(807);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_home_home__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_samples_sample_list__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_samples_sample_detail__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_samples_sample_bottle__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_samples_acid_select__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_samples_bottle_select__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_sites_site_list__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_sites_site_detail__ = __webpack_require__(441);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_config_config__ = __webpack_require__(442);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_ionic2_date_picker__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_ionic2_date_picker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_28_ionic2_date_picker__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_samples_bulk_acid_update__ = __webpack_require__(440);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_samples_filter_select__ = __webpack_require__(439);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




























//import {ReversePipe} from './reverse.pipe';



var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */], __WEBPACK_IMPORTED_MODULE_19__pages_home_home__["a" /* HomePage */], __WEBPACK_IMPORTED_MODULE_20__pages_samples_sample_list__["a" /* SampleListPage */], __WEBPACK_IMPORTED_MODULE_21__pages_samples_sample_detail__["a" /* SampleDetailPage */], __WEBPACK_IMPORTED_MODULE_23__pages_samples_acid_select__["a" /* AcidSelectPage */], __WEBPACK_IMPORTED_MODULE_24__pages_samples_bottle_select__["a" /* BottleSelectPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_sites_site_list__["a" /* SiteListPage */], __WEBPACK_IMPORTED_MODULE_26__pages_sites_site_detail__["a" /* SiteDetailPage */], __WEBPACK_IMPORTED_MODULE_22__pages_samples_sample_bottle__["a" /* SampleBottlePage */], __WEBPACK_IMPORTED_MODULE_27__pages_config_config__["a" /* ConfigPage */], __WEBPACK_IMPORTED_MODULE_29__pages_samples_bulk_acid_update__["a" /* BulkAcidUpdatePage */], __WEBPACK_IMPORTED_MODULE_30__pages_samples_filter_select__["a" /* FilterSelectPage */]
        ],
        /*declarations: [
          AppComponent, HomePage, SampleListPage, SampleDetailPage, AcidSelectPage, BottleSelectPage,
          SiteListPage, SiteDetailPage, SampleBottlePage, ConfigPage, ReversePipe, DatePicker
        ],*/
        imports: [
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["IonicModule"].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* ReactiveFormsModule */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* HttpModule */], __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_28_ionic2_date_picker__["DatePickerModule"]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["IonicApp"]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */], __WEBPACK_IMPORTED_MODULE_19__pages_home_home__["a" /* HomePage */], __WEBPACK_IMPORTED_MODULE_20__pages_samples_sample_list__["a" /* SampleListPage */], __WEBPACK_IMPORTED_MODULE_21__pages_samples_sample_detail__["a" /* SampleDetailPage */], __WEBPACK_IMPORTED_MODULE_23__pages_samples_acid_select__["a" /* AcidSelectPage */], __WEBPACK_IMPORTED_MODULE_24__pages_samples_bottle_select__["a" /* BottleSelectPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_sites_site_list__["a" /* SiteListPage */], __WEBPACK_IMPORTED_MODULE_26__pages_sites_site_detail__["a" /* SiteDetailPage */], __WEBPACK_IMPORTED_MODULE_22__pages_samples_sample_bottle__["a" /* SampleBottlePage */], __WEBPACK_IMPORTED_MODULE_27__pages_config_config__["a" /* ConfigPage */], __WEBPACK_IMPORTED_MODULE_29__pages_samples_bulk_acid_update__["a" /* BulkAcidUpdatePage */], __WEBPACK_IMPORTED_MODULE_30__pages_samples_filter_select__["a" /* FilterSelectPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_7__acid_acid_service__["a" /* AcidService */], __WEBPACK_IMPORTED_MODULE_8__analysis_analysis_service__["a" /* AnalysisService */], __WEBPACK_IMPORTED_MODULE_9__authentication_authentication_service__["a" /* AuthenticationService */], __WEBPACK_IMPORTED_MODULE_10__bottle_bottle_service__["a" /* BottleService */], __WEBPACK_IMPORTED_MODULE_11__filter_filter_service__["a" /* FilterService */], __WEBPACK_IMPORTED_MODULE_12__medium_medium_service__["a" /* MediumService */],
            __WEBPACK_IMPORTED_MODULE_13__preservation_preservation_service__["a" /* PreservationService */], __WEBPACK_IMPORTED_MODULE_14__project_project_service__["a" /* ProjectService */], __WEBPACK_IMPORTED_MODULE_15__sample_sample_service__["a" /* SampleService */], __WEBPACK_IMPORTED_MODULE_16__samplebottle_samplebottle_service__["a" /* SampleBottleService */], __WEBPACK_IMPORTED_MODULE_17__site_site_service__["a" /* SiteService */], __WEBPACK_IMPORTED_MODULE_18__users_user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 492:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_home_home__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_samples_sample_list__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_sites_site_list__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_config_config__ = __webpack_require__(442);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AppComponent = (function () {
    function AppComponent(platform, menu, statusBar) {
        this.platform = platform;
        this.menu = menu;
        this.statusBar = statusBar;
        // make HelloIonicPage the root (or first) page
        this.rootPage = __WEBPACK_IMPORTED_MODULE_3__pages_home_home__["a" /* HomePage */];
        sessionStorage.setItem('username', 'admin');
        sessionStorage.setItem('password', 'm3rcury@dm1n');
        this.initializeApp();
        // set our app's pages
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_3__pages_home_home__["a" /* HomePage */] },
            { title: 'Samples', component: __WEBPACK_IMPORTED_MODULE_4__pages_samples_sample_list__["a" /* SampleListPage */] },
            { title: 'Sites', component: __WEBPACK_IMPORTED_MODULE_5__pages_sites_site_list__["a" /* SiteListPage */] },
            { title: 'Config', component: __WEBPACK_IMPORTED_MODULE_6__pages_config_config__["a" /* ConfigPage */] }
        ];
    }
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
        });
    };
    AppComponent.prototype.openPage = function (page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        this.nav.setRoot(page.component);
    };
    return AppComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Nav"]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Nav"])
], AppComponent.prototype, "nav", void 0);
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Users\ehaberman\Desktop\mercurymobile\src\app\app.html"*/'<ion-menu [content]="content">\n\n\n\n  <ion-header>\n\n    <ion-toolbar>\n\n      <ion-title>Pages</ion-title>\n\n    </ion-toolbar>\n\n  </ion-header>\n\n\n\n  <ion-content>\n\n    <ion-list>\n\n      <button ion-item *ngFor="let p of pages" (click)="openPage(p)">\n\n        {{p.title}}\n\n      </button>\n\n      <!-- <button ion-item type="button" (click)="exitApp()"><ion-icon name="exit"></ion-icon>    Exit</button> -->\n\n    </ion-list>\n\n  </ion-content>\n\n\n\n</ion-menu>\n\n\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n\n'/*ion-inline-end:"C:\Users\ehaberman\Desktop\mercurymobile\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["MenuController"],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */]])
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 494:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SAMPLES; });
var SAMPLES = [
    { id: 1,
        projectName: 'SEWRPC',
        projectNumber: 919,
        siteName: 'MILWAUKEE @ WAUBEKA',
        siteNumber: 47965,
        date: '2016-09-01',
        time: '12:34:00',
        depth: 1,
        replicate: 1,
        medium: 37,
        sample_bottles: [1, 2, 3],
        comment: 'First Test',
        length: null },
    { id: 2,
        projectName: 'SEWRPC',
        projectNumber: 919,
        siteName: 'ROOT RIVER @ RACINE',
        siteNumber: 47971,
        date: '2016-09-02',
        time: '10:45:00',
        depth: 2,
        replicate: 1,
        medium: 37,
        sample_bottles: [4, 5],
        comment: 'Second Test',
        length: null },
];
//# sourceMappingURL=mock-samples.js.map

/***/ }),

/***/ 525:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SAMPLEBOTTLES; });
var SAMPLEBOTTLES = [
    { id: 1,
        sample: 1,
        bottle: 20008029,
        bottle_string: 'WIT287CHJ',
        analysis_type: 41,
        filter_type: 26,
        volume_filtered: 3,
        preservation_type: 8,
        preservation_volume: 4,
        preservation_acid: 8064,
        preservation_comment: 'Test 1' },
    { id: 2,
        sample: 1,
        bottle: 20008028,
        bottle_string: 'WIT343CHJ',
        analysis_type: 42,
        filter_type: 26,
        volume_filtered: 5,
        preservation_type: 8,
        preservation_volume: 6,
        preservation_acid: 8064,
        preservation_comment: 'Test 2' },
    { id: 3,
        sample: 1,
        bottle: 20008027,
        bottle_string: 'WIT193CHJ',
        analysis_type: 23,
        filter_type: 26,
        volume_filtered: 7,
        preservation_type: 8,
        preservation_volume: 8,
        preservation_acid: 8064,
        preservation_comment: 'Test 3' },
    { id: 4,
        sample: 2,
        bottle: 20008026,
        bottle_string: 'GLR525CHJ',
        analysis_type: 36,
        filter_type: 26,
        volume_filtered: 9,
        preservation_type: 8,
        preservation_volume: 10,
        preservation_acid: 8064,
        preservation_comment: 'Test 4' },
    { id: 5,
        sample: 2,
        bottle: 20008025,
        bottle_string: 'WIT061CHJ',
        analysis_type: 41,
        filter_type: 26,
        volume_filtered: 11,
        preservation_type: 8,
        preservation_volume: 12,
        preservation_acid: 8064,
        preservation_comment: 'Test 5' }
];
//# sourceMappingURL=mock-samplebottles.js.map

/***/ }),

/***/ 526:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Sample; });
var Sample = (function () {
    function Sample(projectName, projectNumber, siteName, siteNumber, date, time, depth, replicate, medium, filter, acid, sample_bottles, comment, length, id) {
    }
    return Sample;
}());

//# sourceMappingURL=sample.js.map

/***/ }),

/***/ 527:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SampleBottle; });
var SampleBottle = (function () {
    function SampleBottle(sample, bottle, analysis_type, filter_type, volume_filtered, preservation_type, preservation_volume, preservation_acid, preservation_comment, bottle_string, id) {
    }
    return SampleBottle;
}());

//# sourceMappingURL=samplebottle.js.map

/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SampleBottleService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_utilities__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mock_samplebottles__ = __webpack_require__(525);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_pouchdb__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_pouchdb___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_pouchdb__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_pouchdb_load__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_pouchdb_load___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_pouchdb_load__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_pouchdb_replication_stream__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_pouchdb_replication_stream___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_pouchdb_replication_stream__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_memorystream__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_memorystream___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_memorystream__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var SampleBottleService = (function () {
    //private _samplebottles;
    function SampleBottleService() {
        __WEBPACK_IMPORTED_MODULE_5_pouchdb___default.a.plugin(__WEBPACK_IMPORTED_MODULE_7_pouchdb_replication_stream___default.a.plugin);
        __WEBPACK_IMPORTED_MODULE_5_pouchdb___default.a.adapter('writableStream', __WEBPACK_IMPORTED_MODULE_7_pouchdb_replication_stream___default.a.adapters.writableStream);
        __WEBPACK_IMPORTED_MODULE_5_pouchdb___default.a.plugin({ loadIt: __WEBPACK_IMPORTED_MODULE_6_pouchdb_load___default.a.load });
        this._createDB();
    }
    SampleBottleService.prototype.initDB = function () {
        var _this = this;
        this._db.allDocs()
            .then(function (result) {
            if (result.total_rows === 0) {
                for (var _i = 0, SAMPLEBOTTLES_1 = __WEBPACK_IMPORTED_MODULE_4__mock_samplebottles__["a" /* SAMPLEBOTTLES */]; _i < SAMPLEBOTTLES_1.length; _i++) {
                    var samplebottle = SAMPLEBOTTLES_1[_i];
                    _this._db.post(samplebottle);
                }
            }
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    SampleBottleService.prototype._createDB = function () {
        this._db = new __WEBPACK_IMPORTED_MODULE_5_pouchdb___default.a('samplebottles');
    };
    SampleBottleService.prototype.destroyDB = function () {
        var _this = this;
        return this._db.destroy()
            .then(function (res) {
            _this._createDB();
            return true;
        }).catch(function (error) {
            console.log(error);
            return false;
        });
    };
    SampleBottleService.prototype.loadDB = function (data) {
        return this._db.loadIt(data)
            .then(function (res) {
            return true;
        })
            .catch(function (error) {
            console.log(error);
            return false;
        });
    };
    SampleBottleService.prototype.dumpDB = function (filename) {
        var dumpedString = '';
        var stream = new __WEBPACK_IMPORTED_MODULE_8_memorystream___default.a();
        stream.on('data', function (chunk) {
            dumpedString += chunk.toString();
        });
        return this._db.dump(stream)
            .then(function () {
            __WEBPACK_IMPORTED_MODULE_3__app_utilities__["a" /* APP_UTILITIES */].downloadTXT({ filename: filename, data: dumpedString });
            return true;
        }).catch(function (err) {
            console.log('dumpDB ERROR! ', err);
            return false;
        });
    };
    SampleBottleService.prototype.add = function (obj) {
        return this._db.post(obj);
    };
    SampleBottleService.prototype.update = function (obj) {
        return this._db.put(obj);
    };
    SampleBottleService.prototype.delete = function (obj) {
        return this._db.remove(obj);
    };
    SampleBottleService.prototype.findSampleBottle = function (val) {
        this._db.find({
            selector: { name: val },
            fields: ['id', 'name']
        }).then(function (result) {
            if (!result) {
                return false;
            }
            return result['docs'];
        }).catch(function (err) {
            console.log('bottle find error');
        });
    };
    SampleBottleService.prototype.getSampleBottlesBySample = function (val) {
        return this._db.allDocs({ startkey: val, endkey: val + '\uffff', include_docs: true, limit: 100 });
    };
    SampleBottleService.prototype.getAll = function (opts) {
        if (this._db) {
            if (!opts) {
                opts = { include_docs: true };
            }
            return this._db.allDocs(opts);
        }
        else {
            return false;
        }
    };
    SampleBottleService.prototype.getOne = function (_id) {
        return this._db.get(_id);
    };
    SampleBottleService.prototype.getSampleBottle = function (id) {
        var samplebottle = __WEBPACK_IMPORTED_MODULE_4__mock_samplebottles__["a" /* SAMPLEBOTTLES */].filter(function (sb) { return sb['bottle'] == id; })[0];
        return Promise.resolve(samplebottle);
    };
    SampleBottleService.prototype.getSampleBottles = function (searchArgs) {
        return Promise.resolve(__WEBPACK_IMPORTED_MODULE_4__mock_samplebottles__["a" /* SAMPLEBOTTLES */]);
    };
    return SampleBottleService;
}());
SampleBottleService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], SampleBottleService);

//# sourceMappingURL=samplebottle.service.js.map

/***/ }),

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AcidService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_settings__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_app_utilities__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_pouchdb__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_pouchdb___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_pouchdb__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_pouchdb_find__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_pouchdb_find___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_pouchdb_find__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_pouchdb_load__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_pouchdb_load___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_pouchdb_load__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_memorystream__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_memorystream___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_memorystream__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var AcidService = (function () {
    function AcidService(http) {
        this.http = http;
        __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a.plugin(__WEBPACK_IMPORTED_MODULE_8_pouchdb_find___default.a);
        __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a.plugin(__WEBPACK_IMPORTED_MODULE_9_pouchdb_load___default.a);
        __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a.plugin(__WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream___default.a.plugin);
        __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a.adapter('writableStream', __WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream___default.a.adapters.writableStream);
        this._createDB();
    }
    AcidService.prototype.initDB = function () {
        this._db.allDocs()
            .then(function (result) {
            if (result.total_rows === 0) {
                /*for (let acid of ACIDS) {
                  this._db.put({
                    _id: acid['code'],
                    id: acid['id'],
                    code: acid['code']
                  });
                }I*/
            }
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    AcidService.prototype._createDB = function () {
        this._db = new __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a('acids');
    };
    AcidService.prototype.destroyDB = function () {
        var _this = this;
        return this._db.destroy()
            .then(function (res) {
            _this._createDB();
            return true;
        }).catch(function (error) {
            console.log(error);
            return false;
        });
    };
    AcidService.prototype.loadDB = function (data) {
        return this._db.loadIt(data)
            .then(function (res) {
            return true;
        })
            .catch(function (error) {
            console.log(error);
            return false;
        });
    };
    AcidService.prototype.dumpDB = function (filename) {
        var dumpedString = '';
        var stream = new __WEBPACK_IMPORTED_MODULE_11_memorystream___default.a();
        stream.on('data', function (chunk) {
            dumpedString += chunk.toString();
        });
        return this._db.dump(stream)
            .then(function () {
            __WEBPACK_IMPORTED_MODULE_6__app_app_utilities__["a" /* APP_UTILITIES */].downloadTXT({ filename: filename, data: dumpedString });
            return true;
        }).catch(function (err) {
            console.log('dumpDB ERROR! ', err);
            return false;
        });
    };
    AcidService.prototype.findAcid = function (val) {
        return this._db.find({
            selector: { id: val },
            fields: ['id', 'code'],
        }).then(function (result) {
            return result['docs'];
        }).catch(function (err) {
            console.log('acid find error');
        });
    };
    AcidService.prototype.getAcidsByName = function (val) {
        return this._db.allDocs({ startkey: val, endkey: val + '\uffff', include_docs: true, limit: 100 });
    };
    AcidService.prototype.getAll = function (opts) {
        if (this._db) {
            if (!opts) {
                opts = { include_docs: true };
            }
            return this._db.allDocs(opts);
        }
        else {
            return false;
        }
    };
    AcidService.prototype.getAcid = function (id) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: __WEBPACK_IMPORTED_MODULE_5__app_settings__["a" /* APP_SETTINGS */].MIN_AUTH_JSON_HEADERS });
        return this.http.get(__WEBPACK_IMPORTED_MODULE_5__app_settings__["a" /* APP_SETTINGS */].ACIDS_URL + id + '/', options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    AcidService.prototype.getAcids = function (searchArgs) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: __WEBPACK_IMPORTED_MODULE_5__app_settings__["a" /* APP_SETTINGS */].MIN_AUTH_JSON_HEADERS, search: searchArgs });
        return this.http.get(__WEBPACK_IMPORTED_MODULE_5__app_settings__["a" /* APP_SETTINGS */].ACIDS_URL, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    AcidService.prototype.handleError = function (error) {
        // TODO figure out a better error handler
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error');
    };
    return AcidService;
}());
AcidService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], AcidService);

//# sourceMappingURL=acid.service.js.map

/***/ }),

/***/ 788:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 79:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_settings__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_utilities__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_pouchdb__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_pouchdb___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_pouchdb__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_pouchdb_find__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_pouchdb_find___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_pouchdb_find__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_pouchdb_load__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_pouchdb_load___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_pouchdb_load__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_memorystream__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_memorystream___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_memorystream__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







//import {FILTERS} from './filters';





var FilterService = (function () {
    //private _filters;
    function FilterService(http) {
        this.http = http;
        __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a.plugin(__WEBPACK_IMPORTED_MODULE_8_pouchdb_find___default.a);
        __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a.plugin(__WEBPACK_IMPORTED_MODULE_9_pouchdb_load___default.a);
        __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a.plugin(__WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream___default.a.plugin);
        __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a.adapter('writableStream', __WEBPACK_IMPORTED_MODULE_10_pouchdb_replication_stream___default.a.adapters.writableStream);
        this._createDB();
    }
    FilterService.prototype.initDB = function () {
        this._db.allDocs()
            .then(function (result) {
            if (result.total_rows === 0) {
                //this._db.bulkDocs(FILTERS);
                /*for (let filter of FILTERS) {
                  //this._db.post(analysis);
                  this._db.put({
                    _id: filter['filter'],
                    id: filter['id'],
                    filter: filter['filter']
                  });
                }*/
            }
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    FilterService.prototype._createDB = function () {
        this._db = new __WEBPACK_IMPORTED_MODULE_7_pouchdb___default.a('filters');
    };
    FilterService.prototype.destroyDB = function () {
        var _this = this;
        return this._db.destroy()
            .then(function (res) {
            _this._createDB();
            return true;
        }).catch(function (error) {
            console.log(error);
            return false;
        });
    };
    FilterService.prototype.loadDB = function (data) {
        return this._db.loadIt(data)
            .then(function (res) {
            return true;
        })
            .catch(function (error) {
            console.log(error);
            return false;
        });
    };
    FilterService.prototype.dumpDB = function (filename) {
        var dumpedString = '';
        var stream = new __WEBPACK_IMPORTED_MODULE_11_memorystream___default.a();
        stream.on('data', function (chunk) {
            dumpedString += chunk.toString();
        });
        return this._db.dump(stream)
            .then(function () {
            __WEBPACK_IMPORTED_MODULE_6__app_utilities__["a" /* APP_UTILITIES */].downloadTXT({ filename: filename, data: dumpedString });
            return true;
        }).catch(function (err) {
            console.log('dumpDB ERROR! ', err);
            return false;
        });
    };
    FilterService.prototype.findFilter = function (val) {
        this._db.find({
            selector: { _id: val },
            fields: ['id', 'filter']
        }).then(function (result) {
            return result['docs'];
        }).catch(function (err) {
            console.log('filter find error');
        });
    };
    FilterService.prototype.getAll = function (opts) {
        if (this._db) {
            if (!opts) {
                opts = { include_docs: true };
            }
            return this._db.allDocs(opts);
        }
        else {
            return false;
        }
    };
    FilterService.prototype.getFilter = function (id) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: __WEBPACK_IMPORTED_MODULE_5__app_settings__["a" /* APP_SETTINGS */].MIN_AUTH_JSON_HEADERS });
        return this.http.get(__WEBPACK_IMPORTED_MODULE_5__app_settings__["a" /* APP_SETTINGS */].FILTERS_URL + id + '/', options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    FilterService.prototype.getFilters = function (searchArgs) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: __WEBPACK_IMPORTED_MODULE_5__app_settings__["a" /* APP_SETTINGS */].MIN_AUTH_JSON_HEADERS, search: searchArgs });
        return this.http.get(__WEBPACK_IMPORTED_MODULE_5__app_settings__["a" /* APP_SETTINGS */].FILTERS_URL, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    FilterService.prototype.handleError = function (error) {
        // TODO figure out a better error handler
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error');
    };
    return FilterService;
}());
FilterService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], FilterService);

//# sourceMappingURL=filter.service.js.map

/***/ }),

/***/ 794:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 802:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 320,
	"./af.js": 320,
	"./ar": 321,
	"./ar-dz": 322,
	"./ar-dz.js": 322,
	"./ar-kw": 323,
	"./ar-kw.js": 323,
	"./ar-ly": 324,
	"./ar-ly.js": 324,
	"./ar-ma": 325,
	"./ar-ma.js": 325,
	"./ar-sa": 326,
	"./ar-sa.js": 326,
	"./ar-tn": 327,
	"./ar-tn.js": 327,
	"./ar.js": 321,
	"./az": 328,
	"./az.js": 328,
	"./be": 329,
	"./be.js": 329,
	"./bg": 330,
	"./bg.js": 330,
	"./bm": 331,
	"./bm.js": 331,
	"./bn": 332,
	"./bn.js": 332,
	"./bo": 333,
	"./bo.js": 333,
	"./br": 334,
	"./br.js": 334,
	"./bs": 335,
	"./bs.js": 335,
	"./ca": 336,
	"./ca.js": 336,
	"./cs": 337,
	"./cs.js": 337,
	"./cv": 338,
	"./cv.js": 338,
	"./cy": 339,
	"./cy.js": 339,
	"./da": 340,
	"./da.js": 340,
	"./de": 341,
	"./de-at": 342,
	"./de-at.js": 342,
	"./de-ch": 343,
	"./de-ch.js": 343,
	"./de.js": 341,
	"./dv": 344,
	"./dv.js": 344,
	"./el": 345,
	"./el.js": 345,
	"./en-au": 346,
	"./en-au.js": 346,
	"./en-ca": 347,
	"./en-ca.js": 347,
	"./en-gb": 348,
	"./en-gb.js": 348,
	"./en-ie": 349,
	"./en-ie.js": 349,
	"./en-nz": 350,
	"./en-nz.js": 350,
	"./eo": 351,
	"./eo.js": 351,
	"./es": 352,
	"./es-do": 353,
	"./es-do.js": 353,
	"./es-us": 354,
	"./es-us.js": 354,
	"./es.js": 352,
	"./et": 355,
	"./et.js": 355,
	"./eu": 356,
	"./eu.js": 356,
	"./fa": 357,
	"./fa.js": 357,
	"./fi": 358,
	"./fi.js": 358,
	"./fo": 359,
	"./fo.js": 359,
	"./fr": 360,
	"./fr-ca": 361,
	"./fr-ca.js": 361,
	"./fr-ch": 362,
	"./fr-ch.js": 362,
	"./fr.js": 360,
	"./fy": 363,
	"./fy.js": 363,
	"./gd": 364,
	"./gd.js": 364,
	"./gl": 365,
	"./gl.js": 365,
	"./gom-latn": 366,
	"./gom-latn.js": 366,
	"./gu": 367,
	"./gu.js": 367,
	"./he": 368,
	"./he.js": 368,
	"./hi": 369,
	"./hi.js": 369,
	"./hr": 370,
	"./hr.js": 370,
	"./hu": 371,
	"./hu.js": 371,
	"./hy-am": 372,
	"./hy-am.js": 372,
	"./id": 373,
	"./id.js": 373,
	"./is": 374,
	"./is.js": 374,
	"./it": 375,
	"./it.js": 375,
	"./ja": 376,
	"./ja.js": 376,
	"./jv": 377,
	"./jv.js": 377,
	"./ka": 378,
	"./ka.js": 378,
	"./kk": 379,
	"./kk.js": 379,
	"./km": 380,
	"./km.js": 380,
	"./kn": 381,
	"./kn.js": 381,
	"./ko": 382,
	"./ko.js": 382,
	"./ky": 383,
	"./ky.js": 383,
	"./lb": 384,
	"./lb.js": 384,
	"./lo": 385,
	"./lo.js": 385,
	"./lt": 386,
	"./lt.js": 386,
	"./lv": 387,
	"./lv.js": 387,
	"./me": 388,
	"./me.js": 388,
	"./mi": 389,
	"./mi.js": 389,
	"./mk": 390,
	"./mk.js": 390,
	"./ml": 391,
	"./ml.js": 391,
	"./mr": 392,
	"./mr.js": 392,
	"./ms": 393,
	"./ms-my": 394,
	"./ms-my.js": 394,
	"./ms.js": 393,
	"./mt": 395,
	"./mt.js": 395,
	"./my": 396,
	"./my.js": 396,
	"./nb": 397,
	"./nb.js": 397,
	"./ne": 398,
	"./ne.js": 398,
	"./nl": 399,
	"./nl-be": 400,
	"./nl-be.js": 400,
	"./nl.js": 399,
	"./nn": 401,
	"./nn.js": 401,
	"./pa-in": 402,
	"./pa-in.js": 402,
	"./pl": 403,
	"./pl.js": 403,
	"./pt": 404,
	"./pt-br": 405,
	"./pt-br.js": 405,
	"./pt.js": 404,
	"./ro": 406,
	"./ro.js": 406,
	"./ru": 407,
	"./ru.js": 407,
	"./sd": 408,
	"./sd.js": 408,
	"./se": 409,
	"./se.js": 409,
	"./si": 410,
	"./si.js": 410,
	"./sk": 411,
	"./sk.js": 411,
	"./sl": 412,
	"./sl.js": 412,
	"./sq": 413,
	"./sq.js": 413,
	"./sr": 414,
	"./sr-cyrl": 415,
	"./sr-cyrl.js": 415,
	"./sr.js": 414,
	"./ss": 416,
	"./ss.js": 416,
	"./sv": 417,
	"./sv.js": 417,
	"./sw": 418,
	"./sw.js": 418,
	"./ta": 419,
	"./ta.js": 419,
	"./te": 420,
	"./te.js": 420,
	"./tet": 421,
	"./tet.js": 421,
	"./th": 422,
	"./th.js": 422,
	"./tl-ph": 423,
	"./tl-ph.js": 423,
	"./tlh": 424,
	"./tlh.js": 424,
	"./tr": 425,
	"./tr.js": 425,
	"./tzl": 426,
	"./tzl.js": 426,
	"./tzm": 427,
	"./tzm-latn": 428,
	"./tzm-latn.js": 428,
	"./tzm.js": 427,
	"./uk": 429,
	"./uk.js": 429,
	"./ur": 430,
	"./ur.js": 430,
	"./uz": 431,
	"./uz-latn": 432,
	"./uz-latn.js": 432,
	"./uz.js": 431,
	"./vi": 433,
	"./vi.js": 433,
	"./x-pseudo": 434,
	"./x-pseudo.js": 434,
	"./yo": 435,
	"./yo.js": 435,
	"./zh-cn": 436,
	"./zh-cn.js": 436,
	"./zh-hk": 437,
	"./zh-hk.js": 437,
	"./zh-tw": 438,
	"./zh-tw.js": 438
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 802;

/***/ }),

/***/ 806:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_settings__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AuthenticationService = (function () {
    function AuthenticationService(_http) {
        this._http = _http;
    }
    AuthenticationService.prototype.login = function (username, password) {
        var _this = this;
        var options = new __WEBPACK_IMPORTED_MODULE_4__angular_http__["d" /* RequestOptions */]({ headers: new __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Headers */]({ "Authorization": "Basic " + btoa(username + ":" + password) }) });
        return this._http.post(__WEBPACK_IMPORTED_MODULE_5__app_settings__["a" /* APP_SETTINGS */].AUTH_URL, null, options)
            .map(function (res) {
            _this.user = res.json();
            if (_this.user.is_staff) {
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('password', password);
                sessionStorage.setItem('first_name', _this.user.first_name);
                sessionStorage.setItem('last_name', _this.user.last_name);
                sessionStorage.setItem('email', _this.user.email);
                sessionStorage.setItem('is_staff', _this.user.is_staff.toString());
            }
            else {
                // TODO: do something more professional here
                alert('This user is not authorized!');
            }
        });
    };
    AuthenticationService.prototype.logout = function () {
        //this._router.navigate(['/login']);
        this.user = undefined;
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('password');
        sessionStorage.removeItem('first_name');
        sessionStorage.removeItem('last_name');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('is_staff');
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].of(true);
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */]])
], AuthenticationService);

//# sourceMappingURL=authentication.service.js.map

/***/ }),

/***/ 807:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_settings__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var UserService = (function () {
    function UserService(http) {
        this.http = http;
    }
    UserService.prototype.getUser = function (id) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: __WEBPACK_IMPORTED_MODULE_5__app_settings__["a" /* APP_SETTINGS */].MIN_AUTH_JSON_HEADERS });
        return this.http.get(__WEBPACK_IMPORTED_MODULE_5__app_settings__["a" /* APP_SETTINGS */].USERS_URL + id + '/', options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.getUsers = function (searchArgs) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: __WEBPACK_IMPORTED_MODULE_5__app_settings__["a" /* APP_SETTINGS */].MIN_AUTH_JSON_HEADERS, search: searchArgs });
        return this.http.get(__WEBPACK_IMPORTED_MODULE_5__app_settings__["a" /* APP_SETTINGS */].USERS_URL, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.handleError = function (error) {
        // TODO figure out a better error handler
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error');
    };
    return UserService;
}());
UserService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], UserService);

//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ 96:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SampleService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_utilities__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mock_samples__ = __webpack_require__(494);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_pouchdb__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_pouchdb___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_pouchdb__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_pouchdb_load__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_pouchdb_load___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_pouchdb_load__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_pouchdb_replication_stream__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_pouchdb_replication_stream___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_pouchdb_replication_stream__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_memorystream__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_memorystream___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_memorystream__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var SampleService = (function () {
    //private _samples;
    function SampleService() {
        __WEBPACK_IMPORTED_MODULE_5_pouchdb___default.a.plugin(__WEBPACK_IMPORTED_MODULE_7_pouchdb_replication_stream___default.a.plugin);
        __WEBPACK_IMPORTED_MODULE_5_pouchdb___default.a.adapter('writableStream', __WEBPACK_IMPORTED_MODULE_7_pouchdb_replication_stream___default.a.adapters.writableStream);
        __WEBPACK_IMPORTED_MODULE_5_pouchdb___default.a.plugin({ loadIt: __WEBPACK_IMPORTED_MODULE_6_pouchdb_load___default.a.load });
        this._createDB();
    }
    SampleService.prototype.initDB = function () {
        var _this = this;
        this._db.allDocs()
            .then(function (result) {
            if (result.total_rows === 0) {
                for (var _i = 0, SAMPLES_1 = __WEBPACK_IMPORTED_MODULE_4__mock_samples__["a" /* SAMPLES */]; _i < SAMPLES_1.length; _i++) {
                    var sample = SAMPLES_1[_i];
                    _this._db.post(sample);
                }
            }
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    SampleService.prototype._createDB = function () {
        this._db = new __WEBPACK_IMPORTED_MODULE_5_pouchdb___default.a('samples');
    };
    SampleService.prototype.destroyDB = function () {
        var _this = this;
        return this._db.destroy()
            .then(function (res) {
            _this._createDB();
            return true;
        }).catch(function (error) {
            console.log(error);
            return false;
        });
    };
    SampleService.prototype.loadDB = function (data) {
        return this._db.loadIt(data)
            .then(function (res) {
            return true;
        })
            .catch(function (error) {
            console.log(error);
            return false;
        });
    };
    SampleService.prototype.dumpDB = function (filename) {
        var dumpedString = '';
        var stream = new __WEBPACK_IMPORTED_MODULE_8_memorystream___default.a();
        stream.on('data', function (chunk) {
            dumpedString += chunk.toString();
        });
        return this._db.dump(stream)
            .then(function () {
            __WEBPACK_IMPORTED_MODULE_3__app_app_utilities__["a" /* APP_UTILITIES */].downloadTXT({ filename: filename, data: dumpedString });
            return true;
        }).catch(function (err) {
            console.log('dumpDB ERROR! ', err);
            return false;
        });
    };
    SampleService.prototype.add = function (sample) {
        return this._db.post(sample);
    };
    SampleService.prototype.update = function (sample) {
        return this._db.put(sample);
    };
    SampleService.prototype.delete = function (sample) {
        return this._db.remove(sample);
    };
    SampleService.prototype.getSampleByID = function (val) {
        return this._db.allDocs({ startkey: val, endkey: val + '\uffff', include_docs: true, limit: 1 });
    };
    SampleService.prototype.getAll = function (opts) {
        if (this._db) {
            if (!opts) {
                opts = { include_docs: true };
            }
            return this._db.allDocs(opts);
        }
        else {
            return false;
        }
    };
    SampleService.prototype.getOne = function (_id) {
        return this._db.get(_id);
    };
    return SampleService;
}());
SampleService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], SampleService);

//# sourceMappingURL=sample.service.js.map

/***/ })

},[443]);
//# sourceMappingURL=main.js.map