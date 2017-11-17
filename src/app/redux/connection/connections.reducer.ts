import { IConnection } from '../../db/connection.interface';
import { AddConnectionAction, ConnectionActions, RemoveConnectionAction } from './connection.actions';
import { Action } from 'redux';

export const ConnectionsReducer = (state: Array<IConnection> = [], action: Action): Array<IConnection> => {
  switch (action.type) {
    case ConnectionActions.CREATE_CONNECTION:
    {
      const conn = (<AddConnectionAction>action).connection;
      return [...state, conn];
    }
    case ConnectionActions.REMOVE_CONNECTION:
    {
      const id = (<RemoveConnectionAction>action).id;
      return state.filter(con => con.id !== id);
    }
    default:
    {
      return state;
    }
  }
};
