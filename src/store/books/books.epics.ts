import { Epic, ActionsObservable, ofType } from 'redux-observable';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import {
  BooksActionType,
  AddBook,
  DeleteBook,
  EditBook,
  GetBooks,
  setBooksAction
} from './books.actions';
import * as api from '../../services/api';

export const getBooksEpic: Epic = (actions$: ActionsObservable<GetBooks>, state$) =>
  actions$.pipe(
    ofType(BooksActionType.GET_BOOKS),
    withLatestFrom(state$),
    switchMap(([, state]) => {
      return api.getBooks().pipe(map((data) => setBooksAction(data)));
    })
  );

export const addBookEpic: Epic = (actions$: ActionsObservable<AddBook>, state$) =>
  actions$.pipe(
    ofType(BooksActionType.ADD_BOOK),
    switchMap((action) => {
      return api.addBook(action.payload).pipe(map((data) => ({ type: '@@NULL' })));
    })
  );

export const editBookEpic: Epic = (actions$: ActionsObservable<EditBook>, state$) =>
  actions$.pipe(
    ofType(BooksActionType.EDIT_BOOK),
    switchMap((action) => {
      return api.editBook(action.payload).pipe(map((data) => ({ type: '@@NULL' })));
    })
  );

export const deleteBookEpic: Epic = (actions$: ActionsObservable<DeleteBook>, state$) =>
  actions$.pipe(
    ofType(BooksActionType.DELETE_BOOK),
    switchMap((action) => {
      return api.deleteBook(action.payload).pipe(map((data) => ({ type: '@@NULL' })));
    })
  );

export const booksEpics = [getBooksEpic, addBookEpic, editBookEpic, deleteBookEpic];
