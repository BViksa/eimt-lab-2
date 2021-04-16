import './AddBook.scss';
import React, { useState } from 'react';
import { RootState } from '../../store';
import { createStoreConnectedComponent } from '../../services/helpers/redux-helper';
import { Book } from '../../interfaces';
import { AddBook, addBookAction } from '../../store/books';
import { Category } from '../../enums';
import TextField from '@material-ui/core/TextField';
import { InputLabel, Select, MenuItem, Button } from '@material-ui/core';

interface AddBookProps {
  addBook: (book: Book) => void;
}

const AddBookPage: React.FC<AddBookProps> = (props: AddBookProps) => {
  const { addBook } = props;
  const [state, setState] = useState<Book>({} as Book);

  const handleSave = (): void => {
    addBook(state);
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
      <h2>Add new book</h2>
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
        Save Book
      </Button>
    </div>
  );
};

// Setup with Redux Observables
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mapStateToProps = (state: RootState): {} => ({});

const actionMap = {
  addBook: (book: Book): AddBook => addBookAction(book)
};

export default createStoreConnectedComponent<AddBookProps>(actionMap, mapStateToProps, AddBookPage);
