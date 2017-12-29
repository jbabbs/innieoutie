import { Action, ActionCreator } from 'redux';
import { IServer } from '../../db/server.interface';
import { EchoServerUrl } from '../../../constants';

export enum ServerActions {
  CREATE_SERVER = 'CREATE_SERVER',
  REMOVE_SERVER = 'REMOVE_SERVER',
  UPDATE_SERVER = 'UPDATE_SERVER',
}

export interface AddServerAction extends Action {
  server: IServer;
}

export const createServer: ActionCreator<AddServerAction> = (server: IServer) => {
  return {
    type: ServerActions.CREATE_SERVER,
    server
  }
};

export interface RemoveServerAction extends Action {
  id: number;
}

export const removeServer: ActionCreator<RemoveServerAction> = (id: number) => ({
  type: ServerActions.REMOVE_SERVER,
  id
});

export const updateServer = (server: IServer) => ({
  type: ServerActions.UPDATE_SERVER,
  server,
})
