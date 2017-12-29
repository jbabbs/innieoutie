import { Action, ActionCreator } from 'redux';
import { Project } from './project.model';
import { IServer } from "../../db/server.interface";

export enum ProjectActions {
  SET_PROJECT_NAME = 'SET_PROJECT_NAME',
}

export interface SetProjectNameAction extends Action {
  name: string;
}

export const setProjectName: ActionCreator<SetProjectNameAction> = (name) => ({
  type: ProjectActions.SET_PROJECT_NAME,
  name,
});
