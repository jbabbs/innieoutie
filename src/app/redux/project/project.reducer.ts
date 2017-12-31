import { Action } from 'redux';
import { Project } from './project.model';
import { ProjectActions, SetProjectNameAction } from './project.actions';
import { ServerReducer } from '../server/servers.reducer';
import { ClientsReducer } from '../client/clients.reducer';
import { MessagesReducer } from '../message/messages.reducer';

const initialState: Project = {
  id: null,
  name: null,
  servers: [],
  clients: [],
  messages: [],
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
      const clients = ClientsReducer(state.clients, action);
      const servers = ServerReducer(state.servers, action);
      const messages = MessagesReducer(state.messages, action);
      return Object.assign({}, state, { clients, servers, messages });
    }
  }
};
