import { Epic, ActionsObservable, ofType } from "redux-observable";
import { map } from 'rxjs/operators';
import { AppReadyAction, AppActionType } from "./app.actions";

export const appReadyEpic: Epic = (actions$: ActionsObservable<AppReadyAction>) =>
    actions$.pipe(
        ofType(AppActionType.APP_READY),
        map(() => {
            console.log('App Ready!');
            return { type: '@@NULL' };
        })
    );

export const appEpics = [
    appReadyEpic
];
