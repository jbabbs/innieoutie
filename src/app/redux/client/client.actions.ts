import { Action, ActionCreator } from 'redux';
import { Client } from './client.model';
import { Subscription } from 'rxjs/Subscription';
import { ClientMessage, ClientMessageDirection } from './client-message.model';

export enum ClientActions {
  SET_CLIENT_NAME = 'SET_CLIENT_NAME',
  CREATE_CLIENT = 'CREATE_CLIENT',
  REMOVE_CLIENT = 'REMOVE_CLIENT',
  CONNECT_CLIENT = 'CONNECT_CLIENT',
  CLIENT_CLOSED = 'CLIENT_CLOSED',
  CLIENT_ERROR = 'CLIENT_ERROR',
  RECONNECT_CLIENT = 'RECONNECT_CLIENT',
  SEND_MESSAGE = 'SEND_MESSAGE',
  RECEIVE_MESSAGE = 'RECEIVE_MESSAGE',
}

export interface SetClientNameAction extends Action {
  id: number;
  name: string,
}

export const setClientName: ActionCreator<SetClientNameAction> = (id: number, name: string) => ({
  type: ClientActions.SET_CLIENT_NAME,
  id,
  name,
})

export interface CreateClientAction extends Action {
  client: Client;
}

export const createClient: ActionCreator<CreateClientAction> = (client: Client) => ({
  type: ClientActions.CREATE_CLIENT,
  client,
});


export interface ConnectClientAction extends Action {
  clientId: number;
  subscription: Subscription;
}

export const connectClient: ActionCreator<ConnectClientAction> =
  (clientId: number, subscription: Subscription) => ({
    type: ClientActions.CONNECT_CLIENT,
    clientId,
    subscription,
  });

export interface RemoveClientAction extends Action {
  id: number;
}

export const removeClient: ActionCreator<RemoveClientAction> = (id: number) => ({
  type: ClientActions.REMOVE_CLIENT,
  id,
});

export interface SendMessageAction extends Action {
  clientId: number;
  message: ClientMessage;
}

export const sendMessage: ActionCreator<SendMessageAction> = (clientId: number, data: string) => {
  const message: ClientMessage = {
    data,
    time: +new Date(),
    direction: ClientMessageDirection.SENT,
    size: data.length,
  };

  return {
    type: ClientActions.SEND_MESSAGE,
    clientId,
    message,
  }
};

export interface ReceiveMessageAction extends Action {
  clientId: number;
  message: ClientMessage;
}

export const receiveMessage: ActionCreator<ReceiveMessageAction> = (clientId: number, data: string) => {
  const message: ClientMessage = {
    data,
    time: +new Date(),
    direction: ClientMessageDirection.RECEIVED,
    size: data.length,
  };

  return {
    type: ClientActions.RECEIVE_MESSAGE,
    clientId,
    message,
  }
};





