import { Action, ActionCreator } from 'redux';
import { Client } from './client.model';
import { ClientMessage, ClientMessageDirection } from './client-message.model';

export enum ClientActions {
  CREATE_CLIENT = 'CREATE_CLIENT',
  REMOVE_CLIENT = 'REMOVE_CLIENT',
  CLIENT_CLOSED = 'CLIENT_CLOSED',
  CLIENT_OPEN = 'CLIENT_OPENED',
  RECONNECT_CLIENT = 'RECONNECT_CLIENT',
  SEND_MESSAGE = 'SEND_MESSAGE',
  RECEIVE_MESSAGE = 'RECEIVE_MESSAGE',
}

export interface CreateClientAction extends Action {
  client: Client;
}

export const createClient: ActionCreator<CreateClientAction> = (client: Client) => ({
  type: ClientActions.CREATE_CLIENT,
  client,
});

export interface SendMessageAction extends Action {
  clientId: number;
  message: ClientMessage;
}

export const sendMessage: ActionCreator<SendMessageAction> = (clientId: number, data: any) => {
  const message: ClientMessage = {
    data,
    time: +new Date(),
    direction: ClientMessageDirection.SENT,
    len: data.length || data.size,
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

export const receiveMessage: ActionCreator<ReceiveMessageAction> = (clientId: number, data: any) => {
  const message: ClientMessage = {
    data,
    time: +new Date(),
    direction: ClientMessageDirection.RECEIVED,
    len: data.length || data.size,
  };

  return {
    type: ClientActions.RECEIVE_MESSAGE,
    clientId,
    message,
  }
};

export const clientOpened = (clientId: number) => ({
  type: ClientActions.CLIENT_OPEN,
  clientId: clientId,
  time: +new Date(),
})

export const closeClient = (clientId: number) => ({
  type: ClientActions.CLIENT_CLOSED,
  clientId: clientId,
})

export const removeClient = (clientId: number) => ({
  type: ClientActions.REMOVE_CLIENT,
  clientId: clientId,
});

export const reconnectClient = (socket, clientId) => ({
  type: ClientActions.RECONNECT_CLIENT,
  clientId,
  socket,
});





