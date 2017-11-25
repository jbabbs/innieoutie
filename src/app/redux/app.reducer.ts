import { Action, Reducer } from 'redux';
import { Project } from './project/project.model';
import { ProjectReducer } from './project/project.reducer';
import { Prefs } from './prefs/prefs.model';
import { PrefsReducer } from './prefs/prefs.reducer';
import { AppActions } from './app.actions';
import { ProjectActions } from './project/project.actions';
import { ClientActions } from './client/client.actions';

export interface AppState {
  prefs: Prefs;
  currentProject?: Project;
  nextClientNumber: number;
  activeClientTabIdx: number;
}

const initialState: AppState = {
  prefs: { },
  currentProject: null,
  nextClientNumber: 1,
  activeClientTabIdx: 0,
};

export const appReducer: Reducer<AppState> = (state: AppState = initialState, action: Action): AppState => {
  switch (action.type) {
    case AppActions.SET_SELECTED_CLIENT_TAB:
    {
      const { idx } = <any>action;
      return Object.assign({}, state, { activeClientTabIdx: idx })
    }
    case AppActions.SET_CURRENT_PROJECT:
    {
      const project: Project = (<any>action).project;
      return Object.assign({}, state, { currentProject: project });
    }
    case ClientActions.CREATE_CLIENT:
    {
      const nextId = state.nextClientNumber + 1;
      const currentProject = ProjectReducer(state.currentProject, action);
      return Object.assign({}, state, { currentProject, nextClientNumber: nextId });
    }
    default:
    {
      const prefs = PrefsReducer(state.prefs, action);
      const currentProject = state.currentProject === null ? null : ProjectReducer(state.currentProject, action);
      return Object.assign({}, state, { prefs, currentProject });
    }
  }
};

export default appReducer;
