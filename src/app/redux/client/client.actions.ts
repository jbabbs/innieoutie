import { Action, ActionCreator } from 'redux';
import { Client } from './client.model';
import { ClientError, ClientMessage, ClientMessageDirection } from './client-message.model';

export enum ClientActions {
  CREATE_CLIENT = 'CREATE_CLIENT',
  REMOVE_CLIENT = 'REMOVE_CLIENT',
  CLIENT_CLOSED = 'CLIENT_CLOSED',
  CLIENT_OPEN = 'CLIENT_OPENED',
  RECONNECT_CLIENT = 'RECONNECT_CLIENT',
  SEND_MESSAGE = 'SEND_MESSAGE',
  LOG_ERROR = 'LOG_ERROR',
  RECEIVE_MESSAGE = 'RECEIVE_MESSAGE',
  UPDATE_CLIENT = 'UPDATE_CLIENT',
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
  const message = new ClientMessage();
  message.data = data;
  message.direction = ClientMessageDirection.SENT;
  message.len = data.length || data.size;

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
  const message = new ClientMessage();
  message.data = data;
  message.direction = ClientMessageDirection.RECEIVED;
  message.len = data.length || data.size;

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
});

export const closeClient = (clientId: number) => ({
  type: ClientActions.CLIENT_CLOSED,
  clientId: clientId,
});

export const removeClient = (clientId: number) => ({
  type: ClientActions.REMOVE_CLIENT,
  clientId: clientId,
});

export const reconnectClient = (socket, clientId) => ({
  type: ClientActions.RECONNECT_CLIENT,
  clientId,
  socket,
});

export const updateClient = (client) => ({
  type: ClientActions.UPDATE_CLIENT,
  client,
});

export const logError = (clientId: number, message) => {
  const errorEvent = new ClientError();
  errorEvent.message = message;

  return {
    type: ClientActions.LOG_ERROR,
    clientId,
    errorEvent,
  };
};





