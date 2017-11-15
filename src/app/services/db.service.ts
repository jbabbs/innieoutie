import { Inject, Injectable } from '@angular/core';
import db from '../db';
import { AppStore } from '../redux/app.store';
import { Store } from 'redux';
import { AppState } from '../redux/app.reducer';
import { IProject } from '../db/project.interface';
import { setCurrentProject } from '../redux/app.actions';
import { IConnection } from '../db/connection.interface';
import { addConnection, removeConnection } from '../redux/project/project.actions';

@Injectable()
export class DbService {

  constructor(@Inject(AppStore) private store: Store<AppState> | null) {
    this.loadCurrentProject();
  }

  async createProjectAndSetCurrent(project: IProject) {
    const id = await db.projects.put(project);
    project.id = id;
    this.store.dispatch(setCurrentProject(project));
  }

  async deleteProjectAndUnsetCurrent(id: number) {
    await db.transaction('rw', db.projects, db.connections, async () => {
      return Promise.all([
        db.connections.where('projectId').equals(id).delete(),
        db.projects.delete(id),
      ]);
    });
    this.store.dispatch(setCurrentProject(null));
  }

  async loadCurrentProject(): Promise<void> {
    const project: IProject = await db.projects.toCollection().first();
    // It is possible there are no projects created
    if (project) {
      project.connections = await db.connections.where('projectId').equals(project.id).toArray() || [];
      this.store.dispatch(setCurrentProject(project));
    }
  }

  async addConnectionToCurrentProject(connection: IConnection) {
    const state = this.store.getState();
    if (!state.currentProject) {
      throw new Error('No current project to add connection to');
    }
    await db.transaction('rw', db.projects, db.connections, async() => {
      connection.projectId = state.currentProject.id;
      const id = await db.connections.put(connection);
      connection.id = id;
    });
    this.store.dispatch(addConnection(connection));
  }

  async deleteConnection(connectionId: number) {
    console.log('delete', connectionId);
    await db.connections.delete(connectionId);
    this.store.dispatch(removeConnection(connectionId));
  }
}
