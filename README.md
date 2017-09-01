# Mercury Mobile
### Version 1
### Built on Angular 4.3.6, Ionic Framework 3.12.1, and PouchDB 6.2.0


----------

## Developer Instructions

clone this repo to a local folder

cd to the new local repo folder and run `npm install` to install other dependencies

run `npm install -g cordova ionic` to install the Ionic Framework

run `ionic serve` to run in browser with watch for debugging

---

## App Features

#### Config: Export, Import, and Empty Tables
This page is for managing data used by the app.
You can export a table of data from the app to a text file, import table data from a text file into the app, or empty (clear) a table.
The export/import files are in PouchDB (JSON) format, and examples can be found here:
[Example Lookup Tables](http://mercury.wim.usgs.gov/examples/)

#### Sites: Edit and Add
This page lists all the sites available to the user, paginated 100 sites at a time.
You can edit existing sites, or add a new site. Every site *must* belong to a project.

#### Samples: Data Collection
This page lists every sample the user collects.
Each sample page shows the details of that sample, including all the associated sample bottles.
