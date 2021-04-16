import { Action } from 'redux';
import { Book } from '../../interfaces';

export enum BooksActionType {
  GET_BOOKS = '[Books] Get Books',
  SET_BOOKS = '[Books] Set Books',
  ADD_BOOK = '[Books] Add Book',
  EDIT_BOOK = '[Books] Edit Book',
  DELETE_BOOK = '[Books] Delete Book'
}

export interface GetBooks extends Action {
  type: BooksActionType.GET_BOOKS;
}

export interface SetBooks extends Action {
  type: BooksActionType.SET_BOOKS;
  payload: Book[];
}

export interface AddBook extends Action {
  type: BooksActionType.ADD_BOOK;
  payload: Partial<Book>;
}

export interface EditBook extends Action {
  type: BooksActionType.EDIT_BOOK;
  payload: Partial<Book>;
}
export interface DeleteBook extends Action {
  type: BooksActionType.DELETE_BOOK;
  payload: string;
}

export function getBooksAction(): GetBooks {
  return { type: BooksActionType.GET_BOOKS };
}

export function setBooksAction(books: Book[]): SetBooks {
  return { type: BooksActionType.SET_BOOKS, payload: books };
}

export function addBookAction(book: Partial<Book>): AddBook {
  return { type: BooksActionType.ADD_BOOK, payload: book };
}

export function editBookAction(book: Partial<Book>): EditBook {
  return { type: BooksActionType.EDIT_BOOK, payload: book };
}

export function deleteBookAction(id: string): DeleteBook {
  return { type: BooksActionType.DELETE_BOOK, payload: id };
}

export type BooksActions = GetBooks | SetBooks | AddBook | EditBook | DeleteBook;
