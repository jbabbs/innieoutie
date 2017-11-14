import Dexie from 'dexie';
import { IConnection } from './connection.interface';
import { ConnectionEntity } from './connection.entity';
import { IProject } from './project.interface';
import { IPrefs } from './prefs.interface';
import { ProjectEntity } from './project.entity';
import { PrefsEntity } from './prefs.entity';

export class AppDatabase extends Dexie {
  projects: Dexie.Table<IProject, number>;
  prefs: Dexie.Table<IPrefs, number>;
  connections: Dexie.Table<IConnection, number>;

  constructor() {
    super('IODB');
    this.version(1).stores({
      projects: '++id',
      prefs: '++id',
      connections: '++id',
    });
    this.prefs.mapToClass(PrefsEntity);
    this.connections.mapToClass(ConnectionEntity);
    this.projects.mapToClass(ProjectEntity);

  }
}

const db = new AppDatabase();

export default db;
