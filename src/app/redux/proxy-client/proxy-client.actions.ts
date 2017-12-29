import { Action, ActionCreator } from 'redux';
import { ProxyClient } from './proxy-client.model';
import { ClientMessage, ClientMessageDirection } from '../client/client-message.model';

export enum ProxyClientActions {
  CREATE_PROXY_CLIENT = 'CREATE_PROXY_CLIENT',
  REMOVE_PROXY_CLIENT = 'REMOVE_PROXY_CLIENT',
  PROXY_CLIENT_CLOSED = 'PROXY_CLIENT_CLOSED',
  PROXY_CLIENT_OPEN = 'PROXY_CLIENT_OPENED',
  RECONNECT_PROXY_CLIENT = 'RECONNECT_PROXY_CLIENT',
  SEND_PROXY_MESSAGE = 'SEND_PROXY_MESSAGE',
  RECEIVE_PROXY_MESSAGE = 'RECEIVE_PROXY_MESSAGE',
}

export interface CreateClientAction extends Action {
  proxyClient: ProxyClient;
}

export const createProxyClient: ActionCreator<CreateClientAction> = (proxyClient: ProxyClient) => ({
  type: ProxyClientActions.CREATE_PROXY_CLIENT,
  proxyClient,
});


export interface SendProxyMessageAction extends Action {
  clientId: number;
  message: ClientMessage;
}

export const sendProxyMessage: ActionCreator<SendProxyMessageAction> = (clientId: number, data: any) => {
  const message: ClientMessage = {
    data,
    time: +new Date(),
    direction: ClientMessageDirection.SENT,
    len: data.length || data.size,
  };

  return {
    type: ProxyClientActions.SEND_PROXY_MESSAGE,
    clientId,
    message,
  }
};

export interface ReceiveMessageAction extends Action {
  clientId: number;
  message: ClientMessage;
}

export const receiveProxyMessage: ActionCreator<ReceiveMessageAction> = (clientId: number, data: any) => {
  const message: ClientMessage = {
    data,
    time: +new Date(),
    direction: ClientMessageDirection.RECEIVED,
    len: data.length || data.size,
  };

  return {
    type: ProxyClientActions.RECEIVE_PROXY_MESSAGE,
    clientId,
    message,
  }
};

// export const clientOpened = (clientId: number) => ({
//   type: ClientActions.CLIENT_OPEN,
//   clientId: clientId,
//   time: +new Date(),
// })
//
// export const closeClient = (clientId: number) => ({
//   type: ClientActions.CLIENT_CLOSED,
//   clientId: clientId,
// })
//
// export const removeClient = (clientId: number) => ({
//   type: ClientActions.REMOVE_CLIENT,
//   clientId: clientId,
// });
//
// export const reconnectClient = (socket, clientId) => ({
//   type: ClientActions.RECONNECT_CLIENT,
//   clientId,
//   socket,
// });





