import { Action } from 'redux';
import { Client } from './client.model';
import { ClientActions, CreateClientAction, RemoveClientAction, SetClientNameAction } from './client.actions';

export const ClientsReducer = (state: Array<Client> = [], action: Action): Array<Client> => {
  switch (action.type) {
    case ClientActions.SET_CLIENT_NAME:
    {
      const id = (<SetClientNameAction>action).id;
      const name = (<SetClientNameAction>action).name;
      const client = state.find(c => c.id === id);
      Object.assign({})
      return Object.assign({}, state, { name });
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
