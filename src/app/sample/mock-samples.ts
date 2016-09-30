import {Sample} from './sample';

export const SAMPLES: Sample[] = [
  {id: 1,
    projectName: 'SEWRPC',
    projectNumber: 919,
    siteName: 'MILWAUKEE @ WAUBEKA',
    siteNumber: 47965,
    date: '2016-09-01',
    time: '12:34:00',
    depth: 1,
    length: null,
    replicate: 1,
    sample_bottles: [1, 2, 3],
    comment: 'First Test'},
  {id: 2,
    projectName: 'SEWRPC',
    projectNumber: 919,
    siteName: 'ROOT RIVER @ RACINE',
    siteNumber: 47971,
    date: '2016-09-02',
    time: '10:45:00',
    depth: 2,
    length: null,
    replicate: 1,
    sample_bottles: [4, 5],
    comment: 'Second Test'}
];
