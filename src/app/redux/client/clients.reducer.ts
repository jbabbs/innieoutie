import { Action } from 'redux';
import { Client } from './client.model';
import { ClientActions, CreateClientAction, RemoveClientAction, SetClientNameAction } from './client.actions';

export const ClientsReducer = (state: Array<Client> = [], action: Action): Array<Client> => {
  switch (action.type) {
    case ClientActions.SET_CLIENT_NAME:
    {
      const { id, name } = <SetClientNameAction>action;
      return state.map(c => {
        if (c.id === id) {
          return Object.assign({}, c, { name });
        } else {
          return c;
        }
      });
    }
    case ClientActions.CREATE_CLIENT:
    {
      const client = (<CreateClientAction>action).client;
      return [...state, client];
    }
    case ClientActions.REMOVE_CLIENT:
    {
      const id = (<RemoveClientAction>action).id;
      const connections = state.filter(con => con.id !== id);
      return Object.assign({}, state, { connections });
    }
    default:
    {
      return state;
    }

  }
};
