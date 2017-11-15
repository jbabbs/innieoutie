import Dexie from 'dexie';
import { IConnection } from './connection.interface';
import { IProject } from './project.interface';
import { IPrefs } from './prefs.interface';

export class AppDatabase extends Dexie {
  projects: Dexie.Table<IProject, number>;
  prefs: Dexie.Table<IPrefs, number>;
  connections: Dexie.Table<IConnection, number>;

  constructor() {
    super('IODB');
    this.version(1).stores({
      projects: '++id',
      prefs: '++id',
      connections: '++id,projectId',
    });

  }
}

const db = new AppDatabase();

export default db;
