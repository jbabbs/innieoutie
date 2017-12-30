import { Action } from 'redux';
import { Project } from './project.model';
import { ProjectActions, SetProjectNameAction } from './project.actions';
import { ServerReducer } from '../server/servers.reducer';
import { ClientsReducer } from '../client/clients.reducer';
import { ClientActions } from '../client/client.actions';
import { MessagesReducer } from '../message/messages.reducer';
import { ProxyReducer } from '../proxy/proxy.reducer';
import { ProxyClientsReducer } from '../proxy-client/proxy-clients.reducer';
import { ProxyClient } from '../proxy-client/proxy-client.model';

const initialState: Project = {
  id: null,
  name: null,
  servers: [],
  clients: [],
  messages: [],
  proxies: [],
};

export const ProjectReducer = (state: Project = initialState, action: Action): Project => {
  switch (action.type) {
    case ProjectActions.SET_PROJECT_NAME:
    {
      const name: string = (<SetProjectNameAction>action).name;
      return Object.assign({}, state, { name });
    }
    default:
    {
      let clients = ClientsReducer(state.clients, action);
      clients = ProxyClientsReducer(<any>clients, action);
      const servers = ServerReducer(state.servers, action);
      const messages = MessagesReducer(state.messages, action);
      const proxies = ProxyReducer(state.proxies, action);
      return Object.assign({}, state, { clients, servers, messages, proxies });
    }
  }
};
