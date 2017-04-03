import {Injectable}     from '@angular/core';

@Injectable()
export class APP_UTILITIES {
    public static get TODAY(): string {return new Date().toISOString().substr(0, 10);}

    public static get TIME(): string {return new Date().toISOString().substr(14, 22);}

    public static convertArrayOfObjectsToCSV(args: any) {
        let result, counter, keys, columnDelimiter, lineDelimiter, data, headers;

        headers = [];

        data = args.data || null;
        if (data == null || !data.length) {
            return null;
        }

        columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || '\n';

        keys = Object.keys(data[0]);

        // put the headers array in the same order as the data keys
        keys.forEach(function(item){
            let obj = args.headers.filter(function ( obj ) {
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
                if (counter > 0) result += columnDelimiter;
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
    }

    public static downloadCSV(args: any) {
        let data, filename, link;
        let csv = this.convertArrayOfObjectsToCSV({
            data: args.data,
            headers: args.headers
        });
        if (csv == null) return;

        filename = args.filename || 'export.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
    }

    public static downloadTXT(args: any) {
        let data, filename, link;
        let txt = args.data;
        if (txt == null) return;

        filename = args.filename || 'export.txt';

        data = 'data:text/json;charset=utf8,' + encodeURI(txt);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
    }

    // the following functions found here: http://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript/4760279#4760279
    public static dynamicSort(property) {
        let sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    public static dynamicSortMultiple(args) {
        function dynamicSort(property) {
            let sortOrder = 1;
            if (property[0] === "-") {
                sortOrder = -1;
                property = property.substr(1);
            }
            return function (a, b) {
                let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                return result * sortOrder;
            }
        }

        /*
         * save the arguments object as it will be overwritten
         * note that arguments object is an array-like object
         * consisting of the names of the properties to sort by
         */
        //let props = arguments;
        let props = args;
        return function (obj1, obj2) {
            let i = 0, result = 0, numberOfProperties = props.length;
            /* try getting a different result from 0 (equal)
             * as long as we have extra properties to compare
             */
            while (result === 0 && i < numberOfProperties) {
                result = dynamicSort(props[i])(obj1, obj2);
                i++;
            }
            return result;
        }
    }
}
