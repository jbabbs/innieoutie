import { Action } from 'redux';
import { Client } from './client.model';
import {
  ClientActions, CreateClientAction, ReceiveMessageAction, RemoveClientAction, SendMessageAction,
  SetClientNameAction
} from './client.actions';

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
      const connections = state.filter(client => client.id !== id);
      return Object.assign({}, state, { connections });
    }
    case ClientActions.SEND_MESSAGE:
    {
      const message = (<SendMessageAction>action).message;
      const clientId = (<SendMessageAction>action).clientId;
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
      const message = (<ReceiveMessageAction>action).message;
      const clientId = (<ReceiveMessageAction>action).clientId;
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
    default:
    {
      return state;
    }

  }
};
