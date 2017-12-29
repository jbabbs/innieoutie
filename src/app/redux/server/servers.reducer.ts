import { IServer } from '../../db/server.interface';
import { AddServerAction, ServerActions, RemoveServerAction } from './server.actions';
import { Action } from 'redux';

export const ServerReducer = (state: Array<IServer> = [], action: Action): Array<IServer> => {
  switch (action.type) {
    case ServerActions.CREATE_SERVER:
    {
      const conn = (<AddServerAction>action).server;
      return [...state, conn];
    }
    case ServerActions.REMOVE_SERVER:
    {
      const id = (<RemoveServerAction>action).id;
      return state.filter(con => con.id !== id);
    }
    case ServerActions.UPDATE_SERVER:
    {
      const server = (<AddServerAction>action).server;
      return state.map(con => {
        if (con.id === server.id) {
          return Object.assign({}, con, server);
        } else {
          return con;
        }
      });
    }
    default:
    {
      return state;
    }
  }
};
