import { Category } from '../../enums';
import { Book } from '../../interfaces';
import { BooksActions, BooksActionType } from './books.actions';

export interface BooksState {
  books: Book[];
}

const defaultState: BooksState = {
  books: []
};

export function booksReducer(state: BooksState = defaultState, action: BooksActions): BooksState {
  switch (action.type) {
    case BooksActionType.SET_BOOKS:
      return {
        ...state,
        books: action.payload
      };

    default:
      return state;
  }
}
