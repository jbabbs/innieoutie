import { Action } from 'redux';
import { Prefs } from './prefs.model';

const initialState: Prefs = {
  advancedMode: true,
};

export const PrefsReducer = (state: Prefs = initialState, action: Action): Prefs => {
  switch (action.type) {
    default:
      return state;
  }
}
