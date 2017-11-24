import { Client } from './client.model';
import {
  ClientActions, CreateClientAction, SetClientNameAction
} from './client.actions';

export const ClientsReducer = (state: Array<Client> = [], action: any): Array<Client> => {
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
    case ClientActions.RECONNECT_CLIENT:
    {
      const { webSocket$, clientId } = <any>action;
      const client = state.find(c => c.id === clientId );
      const newClient = Object.assign({}, client, { webSocket$ });
      const newState = state.map(c => {
        if (c.id === clientId) {
          return newClient;
        } else {
          return c;
        }
      })
      return newState;
    }
    case ClientActions.REMOVE_CLIENT:
    {
      const clientId = action.clientId;
      return state.filter(client => client.id !== clientId);
    }
    case ClientActions.CLIENT_CLOSED:
    {
      return state;
    }
    case ClientActions.SEND_MESSAGE:
    {
      const { message, clientId } = <any>action;
      const client = state.find(c => c.id === clientId );
      const messages = [...client.messages, message];
      const newClient = Object.assign({}, client, { messages });
      const newState = state.map(c => {
        if (c.id === clientId) {
          return newClient;
        } else {
          return c;
        }
      })
      return newState;
    }
    case ClientActions.RECEIVE_MESSAGE:
    {
      const { message, clientId } = <any>action;
      const client = state.find(c => c.id === clientId );
      const messages = [...client.messages, message];
      const newClient = Object.assign({}, client, { messages });
      const newState = state.map(c => {
        if (c.id === clientId) {
          return newClient;
        } else {
          return c;
        }
      })
      return newState;
    }
    case ClientActions.CLIENT_OPEN:
    {
      const  { time, clientId } = action;
      const client = state.find(c => c.id === clientId );
      const newClient = Object.assign({}, client, { connectedAtTime: time });
      const newState = state.map(c => {
        if (c.id === clientId) {
          return newClient;
        } else {
          return c;
        }
      })
      return newState;
    }
    default:
    {

      return state;
    }

  }
};
