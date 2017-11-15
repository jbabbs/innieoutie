import { Action } from 'redux';
import { Project } from './project.model';
import { AddConnectionAction, ProjectActions, RemoveConnectionAction, SetProjectNameAction } from './project.actions';

const initialState: Project = {
  id: null,
  name: null,
  connections: [],
};

export const ProjectReducer = (state: Project = initialState, action: Action): Project => {
  switch (action.type) {
    case ProjectActions.SET_PROJECT_NAME:
      const name: string = (<SetProjectNameAction>action).name;
      return Object.assign({}, state, { name });
    case ProjectActions.ADD_CONNECTION:
      const conn = (<AddConnectionAction>action).connection;
      const newConnections = [...state.connections, conn];
      return Object.assign({}, state, { connections: newConnections });
    case ProjectActions.REMOVE_CONNECTION:
      const id = (<RemoveConnectionAction>action).connectionId;
      const newConnections2 = state.connections.filter(con => con.id !== id);
      return Object.assign({}, state, { connections: newConnections2 });
    default:
      return state;
  }
};
