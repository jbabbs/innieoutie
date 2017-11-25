import { Project } from './project/project.model';

export enum AppActions {
  SET_CURRENT_PROJECT = 'SET_CURRENT_PROJECT',
  SET_SELECTED_CLIENT_TAB = 'SET_SELECTED_CLIENT_TAB',
}

export const setCurrentProject = (project: Project) => ({
  type: AppActions.SET_CURRENT_PROJECT,
  project,
});

export const setSelectedClientTab = (idx) => ({
  type: AppActions.SET_SELECTED_CLIENT_TAB,
  idx
});



