import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { combineReducers, createStore, applyMiddleware, Store, compose } from 'redux';

import { AppActions, appEpics, appReducer, appReadyAction, AppState } from './app';

import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createHashHistory } from 'history';
import { RouterActions, routerEpics } from './router';
import { BooksActions, booksEpics, booksReducer, BooksState } from './books';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
  }
}

export type RootState = {
  router: any;
  app: AppState;
  books: BooksState;
};

export type Actions = AppActions | RouterActions | BooksActions;

export const history = createHashHistory();

const epics = [...appEpics, ...routerEpics, ...booksEpics];
const reducers = {
  app: appReducer,
  books: booksReducer
};

const rootEpic = combineEpics(...epics);
const rootReducer = (history: any): any => combineReducers({ router: connectRouter(history), ...reducers });

const epicMiddleware = createEpicMiddleware<Actions, Actions, RootState>();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function configureStore(initialState?: RootState): Store {
  const enhancer = composeEnhancers(applyMiddleware(routerMiddleware(history), epicMiddleware));
  const store = createStore(rootReducer(history), initialState, enhancer);
  return store;
}

const store = configureStore();

epicMiddleware.run(rootEpic);

// Init application with action.
store.dispatch(appReadyAction());

export { store };
