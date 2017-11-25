import { Action, ActionCreator } from 'redux';
import { IConnection } from '../../db/connection.interface';

export enum ConnectionActions {
  CREATE_CONNECTION = 'CREATE_CONNECTION',
  REMOVE_CONNECTION = 'REMOVE_CONNECTION',
  UPDATE_CONNECTION = 'UPDATE_CONNECTION',
}

export interface AddConnectionAction extends Action {
  connection: IConnection;
}

export const createConnection: ActionCreator<AddConnectionAction> = (connection: IConnection) => ({
  type: ConnectionActions.CREATE_CONNECTION,
  connection
});

export interface RemoveConnectionAction extends Action {
  id: number;
}

export const removeConnection: ActionCreator<RemoveConnectionAction> = (id: number) => ({
  type: ConnectionActions.REMOVE_CONNECTION,
  id
});

export const updateConnection = (connection: IConnection) => ({
  type: ConnectionActions.UPDATE_CONNECTION,
  connection,
})
