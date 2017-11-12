import { Inject, Injectable } from '@angular/core';
import db from '../db';
import { ProjectEntity } from '../db/project.entity';
import { AppStore } from '../redux/app.store';
import { Store } from 'redux';
import { AppState } from '../redux/app.reducer';
import { IProject } from '../db/project.interface';
import { setCurrentProject } from '../redux/app.actions';

@Injectable()
export class DbService {

  constructor(@Inject(AppStore) private store: Store<AppState>) {
    this.loadCurrentProject();
  }

  async createProjectAndSetActive(name: string) {
    const project = new ProjectEntity(name);
    await project.save();
    this.store.dispatch(setCurrentProject(project));
  }

  async deleteProject(id: number) {
    await db.projects.delete(id);
    this.store.dispatch(setCurrentProject(null));
  }

  async loadCurrentProject(): Promise<void> {
    const project: IProject = await db.projects.toCollection().first();
    if (project) {
      this.store.dispatch(setCurrentProject(project));
    }
  }
}
