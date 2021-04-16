import { RouterActionType, GoTo, GoBack, GoForward } from "./router.actions";
import { ofType, Epic, ActionsObservable } from "redux-observable";
import { map } from "rxjs/operators";
import { push, goBack, goForward } from "connected-react-router";

export const goToEpic: Epic = (actions$: ActionsObservable<GoTo>) =>
    actions$.pipe(
        ofType(RouterActionType.GO_TO),
        map((action) => push(action.payload))
    );

export const goBackEpic: Epic = (actions$: ActionsObservable<GoBack>) =>
    actions$.pipe(
        ofType(RouterActionType.GO_BACK),
        map(() => goBack())
    );

export const goForwardEpic: Epic = (actions$: ActionsObservable<GoForward>) =>
    actions$.pipe(
        ofType(RouterActionType.GO_FORWARD),
        map(() => goForward())
    );

export const routerEpics = [
    goToEpic,
    goBackEpic,
    goForwardEpic
];