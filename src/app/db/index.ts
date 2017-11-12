import Dexie from 'dexie';
import { IProject } from './project.interface';
import { IPrefs } from './prefs.interface';
import { ProjectEntity } from './project.entity';

export class AppDatabase extends Dexie {
  projects: Dexie.Table<IProject, number>;
  prefs: Dexie.Table<IPrefs, number>;

  constructor() {
    super('IODB');
    this.version(1).stores({
      projects: '++id,name',
      prefs: '++id,advancedMode',
    })
    this.projects.mapToClass(ProjectEntity);
    this.prefs.mapToClass(ProjectEntity);
  }

  createProject(name: string) {

  }
}

const db = new AppDatabase();

export default db;
