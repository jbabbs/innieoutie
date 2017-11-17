import { Action, Reducer } from 'redux';
import { Project } from './project/project.model';
import { ProjectReducer } from './project/project.reducer';
import { Prefs } from './prefs/prefs.model';
import { PrefsReducer } from './prefs/prefs.reducer';
import { AppActions, SetCurrentProjectAction } from './app.actions';

export interface AppState {
  prefs: Prefs;
  currentProject?: Project;
}

const initialState: AppState = {
  prefs: { },
  currentProject: null,
};

export const appReducer: Reducer<AppState> = (state: AppState = initialState, action: Action): AppState => {
  switch (action.type) {
    case AppActions.SET_CURRENT_PROJECT:
    {
      const projectIn: Project = (<SetCurrentProjectAction>action).project;
      const projectOut: Project = Object.assign({}, projectIn, {nextClientNumber: 1});
      return Object.assign({}, state, { currentProject: projectOut });
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
