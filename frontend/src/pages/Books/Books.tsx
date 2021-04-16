import './Books.scss';
import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { RootState } from '../../store';
import { createStoreConnectedComponent } from '../../services/helpers/redux-helper';
import { Book } from '../../interfaces';
import { GetBooks, getBooksAction } from '../../store/books';
import { GoTo, goToAction } from '../../store/router';
import { Routes } from '../../enums';
import { makeStyles } from '@material-ui/core/styles';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

interface BooksProps {
  books: Book[];
  getBooks: () => void;
  editBook: (bookId: number) => void;
  addBook: () => void;
}

const BooksPage: React.FC<BooksProps> = (props: BooksProps) => {
  const { getBooks, addBook, editBook, books } = props;
  const classes = useStyles();

  useEffect(() => {
    getBooks();
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <h1>Books Page</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.length > 0 &&
              books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell component="th" scope="row">
                    {book.name}
                  </TableCell>
                  <TableCell align="right">
                    <Button variant="contained" onClick={() => editBook(book.id)}>
                      Edit Book
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

// Setup with Redux Observables
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mapStateToProps = (state: RootState): {} => ({
  books: state.books.books
});

const actionMap = {
  getBooks: (): GetBooks => getBooksAction(),
  editBook: (bookId: number): GoTo => goToAction(`${Routes.EditBookPage}/${bookId}`),
  addBook: (): GoTo => goToAction(Routes.AddBookPage)
};

export default createStoreConnectedComponent<BooksProps>(actionMap, mapStateToProps, BooksPage);
