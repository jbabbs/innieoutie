import { Action, ActionCreator } from 'redux';
import { Project } from './project.model';
import { IConnection } from "../../db/connection.interface";

export enum ProjectActions {
  SET_PROJECT_NAME = 'SET_PROJECT_NAME',
  SET_SELECTED_CLIENT_TAB = 'SET_SELECTED_CLIENT_TAB',
}

export interface SetProjectNameAction extends Action {
  name: string;
}

export const setProjectName: ActionCreator<SetProjectNameAction> = (name) => ({
  type: ProjectActions.SET_PROJECT_NAME,
  name,
});

export const setSelectedClientTab = (idx) => ({
  type: ProjectActions.SET_SELECTED_CLIENT_TAB,
  idx
});

