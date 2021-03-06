import Dexie from 'dexie';
import { IServer } from './server.interface';
import { IProject } from './project.interface';
import { IMessage } from './message.interface';

export class AppDatabase extends Dexie {
  projects: Dexie.Table<IProject, number>;
  servers: Dexie.Table<IServer, number>;
  messages: Dexie.Table<IMessage, number>;

  constructor() {
    super('IODB');
    this.version(1).stores({
      projects: '++id',
      servers: '++id,projectId',
      messages: '++id,projectId'
    });
  }
}

const db = new AppDatabase();

export default db;
