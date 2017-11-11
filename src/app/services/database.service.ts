import { Injectable } from '@angular/core';
// import typings
// import * as ProjectType from 'RxDB.d';


// batteries-included
// import RxDB from 'rxdb';
/**
 * custom build
 */
import RxDB from 'rxdb/plugins/core';

// import modules
import RxDBSchemaCheckModule from 'rxdb/plugins/schema-check';

if (!environment.production) {
  // schema-checks should be used in dev-mode only
  RxDB.plugin(RxDBSchemaCheckModule);
}

import RxDBValidateModule from 'rxdb/plugins/validate';
RxDB.plugin(RxDBValidateModule);
// import RxDBLeaderElectionModule from 'rxdb/plugins/leader-election';
// RxDB.plugin(RxDBLeaderElectionModule);

// import RxDBReplicationModule from 'rxdb/plugins/replication';
// RxDB.plugin(RxDBReplicationModule);
// always needed for replication with the node-server
// RxDB.plugin(require('pouchdb-adapter-http'));



RxDB.QueryChangeDetector.enable();
RxDB.QueryChangeDetector.enableDebugging();

const adapter = require('pouchdb-adapter-idb');
RxDB.plugin(adapter);

const collections = [
  {
    name: 'projects',
    schema: require('../schemas/project.schema.json'),
    methods: {
      getName() {
        return this.name;
      }
    },
    sync: false
  }
];

import { RxProjectDatabase } from '../schemas/project.type';
import { environment } from 'environments';

@Injectable()
export class DatabaseService {
  static dbPromise: Promise<RxProjectDatabase> = null;

  private async _create(): Promise<RxProjectDatabase> {
    console.log('DatabaseService: creating database..');
    const db: RxProjectDatabase = await RxDB.create({
      name: 'iodata',
      adapter: 'idb',
      // password: 'myLongAndStupidPassword' // no password needed
    });
    console.log('DatabaseService: created database');
    //window['db'] = db; // write to window for debugging
    // show leadership in title
    //await db.waitForLeadership();
      // .then(() => {
      //   console.log('isLeader now');
      //   document.title = '♛ ' + document.title;
      // });

    // create collections
    console.log('DatabaseService: create collections');
    await Promise.all(collections.map(colData => db.collection(colData)));

    // hooks
    //console.log('DatabaseService: add hooks');
    //db.collections.projects.preInsert(function(docObj) {
      // Not valid code, but you get the point?
      // const color = docObj.color;
      // return db.collections.hero.findOne({ color }).exec()
      //   .then(has => {
      //     if (has != null) {
      //       alert('another hero already has the color ' + color);
      //       throw new Error('color already there');
      //     }
      //     return db;
      //   });
    //});

    return db;
  }

  get(): Promise<RxProjectDatabase> {
    if (DatabaseService.dbPromise) {
      return DatabaseService.dbPromise;
    }

    // create database
    DatabaseService.dbPromise = this._create();
    return DatabaseService.dbPromise;
  }
}
