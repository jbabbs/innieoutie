import { Action, ActionCreator } from 'redux';
import { Client, WebSocketReadyState } from './client.model';
import { Subscription } from 'rxjs/Subscription';

export enum ClientActions {
  SET_CLIENT_NAME = 'SET_CLIENT_NAME',
  CREATE_CLIENT = 'CREATE_CLIENT',
  REMOVE_CLIENT = 'REMOVE_CLIENT',
  CONNECT_CLIENT = 'CONNECT_CLIENT',
  RECONNECT_CLIENT = 'RECONNECT_CLIENT',
}

export interface SetClientNameAction extends Action {
  id: number;
  name: string,
}

export interface CreateClientAction extends Action {
  client: Client;
}

export interface ConnectClientAction extends Action {
  clientId: number;
  subscription: Subscription;
  readyState: WebSocketReadyState;
}

export interface RemoveClientAction extends Action {
  id: number;
}

export const setClientName: ActionCreator<SetClientNameAction> = (id: number, name: string) => ({
  type: ClientActions.SET_CLIENT_NAME,
  id,
  name,
})

export const createClient: ActionCreator<CreateClientAction> = (client: Client) => ({
  type: ClientActions.CREATE_CLIENT,
  client,
});

export const connectClient: ActionCreator<ConnectClientAction> =
  (clientId: number, subscription: Subscription, readyState: WebSocketReadyState) => ({
    type: ClientActions.CONNECT_CLIENT,
    clientId,
    subscription,
    readyState,
  });

export const removeClient: ActionCreator<RemoveClientAction> = (id: number) => ({
  type: ClientActions.REMOVE_CLIENT,
  id,
});



