import { Action } from 'redux';
import { Project } from './project.model';
import { ProjectActions, SetProjectNameAction } from './project.actions';
import { ConnectionsReducer } from '../connection/connections.reducer';
import { ClientsReducer } from '../client/clients.reducer';
import { ClientActions } from '../client/client.actions';

const initialState: Project = {
  id: null,
  name: null,
  connections: [],
  clients: [],
  nextClientNumber: 1,
  activeClientTabIdx: 0,
};

export const ProjectReducer = (state: Project = initialState, action: Action): Project => {
  switch (action.type) {
    case ProjectActions.SET_SELECTED_CLIENT_TAB:
    {
      const { idx } = <any>action;
      return Object.assign({}, state, { activeClientTabIdx: idx })
    }
    case ProjectActions.SET_PROJECT_NAME:
    {
      const name: string = (<SetProjectNameAction>action).name;
      return Object.assign({}, state, { name });
    }
    case ClientActions.CREATE_CLIENT:
    {
      const clients = ClientsReducer(state.clients, action);
      const nextClientNumber = state.nextClientNumber + 1;
      return Object.assign({}, state, { nextClientNumber, clients });
    }
    default:
    {
      const clients = ClientsReducer(state.clients, action);
      const connections = ConnectionsReducer(state.connections, action);
      return Object.assign({}, state, { clients, connections });
    }
  }
};
