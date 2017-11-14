import { Action } from 'redux';
import { Project } from './project.model';
import { ProjectActions, SetProjectNameAction } from './project.actions';

const initialState: Project = {
  id: null,
  name: null,
};

export const ProjectReducer = (state: Project = initialState, action: Action): Project => {
  switch (action.type) {
    case ProjectActions.SET_PROJECT_NAME:
      const name: string = (<SetProjectNameAction>action).name;
      return Object.assign({}, state, { name });
    default:
      return state;
  }
}
