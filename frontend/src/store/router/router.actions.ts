import { Action } from 'redux';
import { Routes } from '../../enums';

export enum RouterActionType {
    GO_TO = '[Router] Go To',
    GO_BACK = '[Router] Go Back',
    GO_FORWARD = '[Router] Go Forward'
};

export interface GoTo extends Action {
    type: RouterActionType.GO_TO;
    payload: string
}

export interface GoBack extends Action {
    type: RouterActionType.GO_BACK
}

export interface GoForward extends Action {
    type: RouterActionType.GO_FORWARD
}

export function goToAction(path: string): GoTo {
    return {
        type: RouterActionType.GO_TO,
        payload: path
    };
}

export function goBackAction(): GoBack {
    return {
        type: RouterActionType.GO_BACK
    }
}

export function goForwardAction(): GoForward {
    return {
        type: RouterActionType.GO_FORWARD
    }
}

export type RouterActions =
    | GoTo
    | GoBack
    | GoForward;
