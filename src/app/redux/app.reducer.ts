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
}

export const appReducer: Reducer<AppState> = (state: AppState = initialState, action: Action): AppState => {
  switch (action.type) {
    case AppActions.SET_CURRENT_PROJECT:
      const project: Project = (<SetCurrentProjectAction>action).project;
      return Object.assign({}, state, { currentProject: project});
    default:
      return {
        prefs: PrefsReducer(state.prefs, action),
        currentProject: state.currentProject ? ProjectReducer(state.currentProject, action) : null
      };
  }
}

export default appReducer;
