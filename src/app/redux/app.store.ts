import { InjectionToken, Provider } from '@angular/core';
import { createStore, Store, compose, StoreEnhancer, applyMiddleware } from 'redux';
import { AppState, default as appReducer } from './app.reducer';

export const AppStore = new InjectionToken('App.store');

// Load browser dev tools
const devtools: StoreEnhancer<AppState> = window['devToolsExtension'] ? window['devToolsExtension']() : f => f;

const logger = store => next => action => {
  console.log('dispatching: ', action)
  const result = next(action)
  console.log('next state:  ', store.getState())
  return result;
}

export function createAppStore(): Store<AppState> {
  return createStore<AppState>(
    appReducer,
    applyMiddleware(logger),
    //compose(devtools),
  );
}

export const appStoreProviders: Provider = [
  { provide: AppStore, useFactory: createAppStore }
];
