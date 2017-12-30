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
import { IProxy } from '../db/proxy.interface';
import { createProxy, removeProxy } from '../redux/proxy/proxy.actions';

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
      project.proxies = await db.proxies.where('projectId').equals(project.id).toArray() || [];
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

  async addProxyToCurrentProject(proxy: IProxy) {
    const state = this.store.getState();
    if (!state.currentProject) {
      throw new Error('No current project to add project to');
    }
    proxy.projectId = state.currentProject.id;
    proxy.id = await db.proxies.put(proxy);
    this.store.dispatch(createProxy(proxy));
  }

  async updateProxy(proxy: IProxy) {
    await db.proxies.put(proxy);
    this.store.dispatch(updateServer(proxy));
  }

  async deleteProxy(proxyId: number) {
    await db.proxies.delete(proxyId);
    this.store.dispatch(removeProxy(proxyId));
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

  async deleteServer(serverId: number) {
    await db.servers.delete(serverId);
    this.store.dispatch(removeServer(serverId));
  }

  async updateMessage(message: IMessage) {
    await db.messages.put(message);
    this.store.dispatch(updateMessage(message));
  }

  async deleteMessage(messageId: number) {
    await db.messages.delete(messageId);
    this.store.dispatch(deleteMessage(messageId));
  }
}
