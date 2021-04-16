import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import BooksPage from './pages/Books/Books';
import AddBookPage from './pages/Add-Book/AddBook';
import EditBookPage from './pages/Edit-Book/EditBook';

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/books" component={BooksPage} />
        <Route path="/add-book" component={AddBookPage} />
        <Route path="/edit-book/:id" component={EditBookPage} />
        <Route exact path="/">
          <Redirect push to="/books" />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
