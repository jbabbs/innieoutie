import { Injectable } from '@angular/core';
import RxDB from 'rxdb/plugins/core';
import RxDBSchemaCheckModule from 'rxdb/plugins/schema-check';
import RxDBValidateModule from 'rxdb/plugins/validate';
import { RxProjectDatabase } from '../../schemas/project.type';
import { environment } from 'environments';

const adapter = require('pouchdb-adapter-idb');

if (!environment.production) {
  // schema-checks should be used in dev-mode only
  RxDB.plugin(RxDBSchemaCheckModule);
}

RxDB.plugin(RxDBValidateModule);

RxDB.QueryChangeDetector.enable();
RxDB.QueryChangeDetector.enableDebugging();

RxDB.plugin(adapter);

const collections = [
  {
    name: 'projects',
    schema: require('../../schemas/project.schema.json'),
    methods: {
      getName() {
        return this.name;
      }
    },
    sync: false
  }
];

@Injectable()
export class DatabaseService {
  static dbPromise: Promise<RxProjectDatabase> = null;

  private async _create(): Promise<RxProjectDatabase> {
    const db: RxProjectDatabase = await RxDB.create({name: 'iodata', adapter: 'idb'});
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

    return await db;
  }

  async get(): Promise<RxProjectDatabase> {
    if (DatabaseService.dbPromise) {
      return DatabaseService.dbPromise;
    }

    // create database
    DatabaseService.dbPromise = this._create();
    return await DatabaseService.dbPromise;
  }
}
