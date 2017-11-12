import { Action, ActionCreator } from 'redux';
import { Project } from './project/project.model';

export enum AppActions {
  SET_CURRENT_PROJECT = 'SET_CURRENT_PROJECT',
}

export interface SetCurrentProjectAction extends Action {
  project: Project;
}

export const setCurrentProject: ActionCreator<SetCurrentProjectAction> = (project) => ({
  type: AppActions.SET_CURRENT_PROJECT,
  project,
})



