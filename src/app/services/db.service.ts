import { Inject, Injectable } from '@angular/core';
import db from '../db';
import { AppStore } from '../redux/app.store';
import { Store } from 'redux';
import { AppState } from '../redux/app.reducer';
import { IProject } from '../db/project.interface';
import { setCurrentProject } from '../redux/app.actions';
import { IServer } from '../db/server.interface';
import { createServer, removeServer, updateServer } from '../redux/server/server.actions';
import { IMessage } from '../db/message.interface';
import { createMessage, deleteMessage, updateMessage } from '../redux/message/message.actions';

@Injectable()
export class DbService {

  constructor(@Inject(AppStore) private store: Store<AppState> | null) {
    this.loadCurrentProject();
  }

  async createProjectAndSetCurrent(project: IProject) {
    project.id = await db.projects.put(project);
    this.store.dispatch(setCurrentProject(<any>project));
  }

  async deleteProjectAndUnsetCurrent(id: number) {
    await db.transaction('rw', db.projects, db.servers, db.messages, async () => {
      return Promise.all([
        db.servers.where('projectId').equals(id).delete(),
        db.messages.where('projectId').equals(id).delete(),
        db.projects.delete(id),
      ]);
    });
    this.store.dispatch(setCurrentProject(null));
  }

  async loadCurrentProject(): Promise<void> {
    const project: IProject = await db.projects.toCollection().first();
    // It is possible there are no projects created
    if (project) {
      project.servers = await db.servers.where('projectId').equals(project.id).toArray() || [];
      project.messages = await db.messages.where('projectId').equals(project.id).toArray() || [];
      this.store.dispatch(setCurrentProject(<any>project));
    }
  }

  async addMessageToCurrentProject(message: IMessage) {
    const state = this.store.getState();
    if (!state.currentProject) {
      throw new Error('No current project to add message to');
    }
    message.projectId = state.currentProject.id;
    message.id = await db.messages.put(message);
    this.store.dispatch(createMessage(message));
  }

  async addServerToCurrentProject(server: IServer) {
    const state = this.store.getState();
    if (!state.currentProject) {
      throw new Error('No current project to add server to');
    }
    server.projectId = state.currentProject.id;
    server.id = await db.servers.put(server);
    this.store.dispatch(createServer(server));
  }

  async updateServer(server: IServer) {
    await db.servers.put(server);
    this.store.dispatch(updateServer(server));
  }

  async updateMessage(message: IMessage) {
    await db.messages.put(message);
    this.store.dispatch(updateMessage(message));
  }

  async deleteServer(serverId: number) {
    await db.servers.delete(serverId);
    this.store.dispatch(removeServer(serverId));
  }

  async deleteMessage(messageId: number) {
    await db.messages.delete(messageId);
    this.store.dispatch(deleteMessage(messageId));
  }
}
