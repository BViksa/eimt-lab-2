import { Action } from 'redux';

export enum AppActionType {
    APP_READY = '[App] App Ready'
};

export interface AppReadyAction extends Action {
    type: AppActionType.APP_READY;
}

export function appReadyAction(): AppReadyAction {
    return { type: AppActionType.APP_READY };
}

export type AppActions = AppReadyAction;
