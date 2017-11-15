import { Action, ActionCreator } from 'redux';
import { Project } from './project.model';
import { IConnection } from "../../db/connection.interface";

export enum ProjectActions {
  SET_PROJECT_NAME = 'SET_PROJECT_NAME',
  ADD_CONNECTION = 'ADD_CONNECTION',
  REMOVE_CONNECTION = 'REMOVE_CONNECTION',
}

export interface SetProjectNameAction extends Action {
  name: string;
}

export interface AddConnectionAction extends Action {
  connection: IConnection;
}

export interface RemoveConnectionAction extends Action {
  connectionId: number;
}

export const setProjectName: ActionCreator<SetProjectNameAction> = (projectName) => ({
  type: ProjectActions.SET_PROJECT_NAME,
  name: projectName
});

export const addConnection: ActionCreator<AddConnectionAction> = (connection: IConnection) => ({
  type: ProjectActions.ADD_CONNECTION,
  connection
});

export const removeConnection: ActionCreator<RemoveConnectionAction> = (connectionId: number) => ({
  type: ProjectActions.REMOVE_CONNECTION,
  connectionId
});



