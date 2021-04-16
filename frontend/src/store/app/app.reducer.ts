import { AppActions } from './app.actions';

export interface AppState { }

const defaultState: AppState = {};

export function appReducer(
  state: AppState = defaultState,
  action: AppActions
): AppState {
  return {};
}
