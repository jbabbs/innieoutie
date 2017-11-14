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

  constructor(@Inject(AppStore) private store: Store<AppState> | null) {
    this.loadCurrentProject();
  }

  async createProjectAndSetCurrent(project: IProject) {
    const projectEntity = new ProjectEntity(project);
    await projectEntity.save();
    this.store.dispatch(setCurrentProject(projectEntity));
  }

  async deleteProjectAndUnsetCurrent(id: number) {
    const project = await ProjectEntity.fetch(id);
    await project.delete();
    this.store.dispatch(setCurrentProject(null));
  }

  async loadCurrentProject(): Promise<void> {
    const project: ProjectEntity = await ProjectEntity.fetchCurrent();
    if (project) {
      this.store.dispatch(setCurrentProject(project));
    }
  }

  async addConnectionToCurrentProject() {

  }
}
