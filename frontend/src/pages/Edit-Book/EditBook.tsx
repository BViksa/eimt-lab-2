import './EditBook.scss';
import React, { useEffect, useState } from 'react';
import { RootState } from '../../store';
import { createStoreConnectedComponent } from '../../services/helpers/redux-helper';
import { Author, Book } from '../../interfaces';
import { EditBook, editBookAction } from '../../store/books';
import { Category } from '../../enums';
import { useParams } from 'react-router-dom';
import { TextField, InputLabel, Select, MenuItem, Button } from '@material-ui/core';

interface EditBookProps {
  books: Book[];
  editBook: (book: Book) => void;
}

const EditBookPage: React.FC<EditBookProps> = (props: EditBookProps) => {
  const { editBook, books } = props;
  const { id } = useParams<{ id: string }>();
  const book = books.find((book) => book.id.toString() === id) as Book;
  const [state, setState] = useState<Book>(book);

  const handleSave = (): void => {
    editBook(state);
  };

  const onNameChange = (event: any): void => {
    setState({ ...state, name: event.target.value });
  };

  const onCategoryChange = (event: any): void => {
    setState({ ...state, category: event.target.value });
  };

  const onAuthorNameChange = (event: any): void => {
    setState({ ...state, author: { ...state.author, name: event.target.value } });
  };

  const onAuthorSurnameChange = (event: any): void => {
    setState({ ...state, author: { ...state.author, surname: event.target.value } });
  };

  const onAuthorCountryNameChange = (event: any): void => {
    setState({
      ...state,
      author: {
        ...state.author,
        country: {
          ...state.author.country,
          name: event.target.value
        }
      }
    });
  };

  const onAuthorCountryContinentChange = (event: any): void => {
    setState({
      ...state,
      author: {
        ...state.author,
        country: {
          ...state.author.country,
          continent: event.target.value
        }
      }
    });
  };

  return (
    <div className="container">
      <h2>Edit book</h2>
      <div>
        <TextField id="name" label="Name" value={state.name} onChange={onNameChange} />
      </div>
      <div>
        <InputLabel id="category-label">Cateogry</InputLabel>
        <Select labelId="category-label" id="category" value={state.category} onChange={onCategoryChange}>
          <MenuItem value={Category.BIOGRAPHY}>{Category.BIOGRAPHY}</MenuItem>
          <MenuItem value={Category.NOVEL}>{Category.NOVEL}</MenuItem>
          <MenuItem value={Category.THRILER}>{Category.THRILER}</MenuItem>
          <MenuItem value={Category.HISTORY}>{Category.HISTORY}</MenuItem>
          <MenuItem value={Category.FANTASY}>{Category.FANTASY}</MenuItem>
          <MenuItem value={Category.CLASSICS}>{Category.CLASSICS}</MenuItem>
          <MenuItem value={Category.DRAMA}>{Category.DRAMA}</MenuItem>
        </Select>
      </div>
      <div>
        <TextField id="author" label="Author Name" value={state.author.name} onChange={onAuthorNameChange} />
      </div>
      <div>
        <TextField id="author" label="Author Surname" value={state.author.surname} onChange={onAuthorSurnameChange} />
      </div>
      <div>
        <TextField
          id="author"
          label="Author Country Name"
          value={state.author.country.name}
          onChange={onAuthorCountryNameChange}
        />
      </div>
      <div>
        <TextField
          id="author"
          label="Author Country Continent"
          value={state.author.country.continent}
          onChange={onAuthorCountryContinentChange}
        />
      </div>

      <Button variant="contained" onClick={handleSave}>
        Edit Book
      </Button>
    </div>
  );
};

// Setup with Redux Observables
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mapStateToProps = (state: RootState): {} => ({
  books: state.books.books
});

const actionMap = {
  editBook: (book: Book): EditBook => editBookAction(book)
};

export default createStoreConnectedComponent<EditBookProps>(actionMap, mapStateToProps, EditBookPage);
