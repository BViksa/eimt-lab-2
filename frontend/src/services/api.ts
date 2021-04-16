import Axios from 'axios-observable';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Book } from '../interfaces';

const baseUrl = process.env['REACT_APP_BASE_URL'];
const environment = process.env['REACT_APP_ENVIRONMENT'];

// creates a common instance of the API
const api = Axios.create({
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
});

export function getBooks(): Observable<Book[]> {
  return api.get<Book[]>(`${baseUrl}/books`).pipe(
    map((response) => {
      const { status, data, statusText } = response;

      if (status !== 200) {
        throw new Error(statusText);
      }

      return data;
    }),
    catchError((error) => {
      return of(error);
    })
  );
}

export function addBook(body: Partial<Book>): Observable<Book> {
  return api.post(`${baseUrl}/book`, body).pipe(
    map((response) => {
      const { status, data, statusText } = response;

      if (status !== 200) {
        throw new Error(statusText);
      }

      return data;
    }),
    catchError((error) => {
      return of(error);
    })
  );
}

export function editBook(body: Partial<Book>): Observable<Book> {
  return api.put(`${baseUrl}/book`, body).pipe(
    map((response) => {
      const { status, data, statusText } = response;

      if (status !== 200) {
        throw new Error(statusText);
      }

      return data;
    }),
    catchError((error) => {
      return of(error);
    })
  );
}

export function deleteBook(id: string): Observable<void> {
  return api.delete(`${baseUrl}/book/:${id}`).pipe(
    map((response) => {
      const { status, statusText } = response;

      if (status !== 200) {
        throw new Error(statusText);
      }

      return;
    }),
    catchError((error) => {
      return of(error);
    })
  );
}
