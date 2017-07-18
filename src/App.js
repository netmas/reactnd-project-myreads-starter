import React from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    showSearchPage: false
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeBookShelf = (book, newShelf) => {
    this.setState((state) => ({
      books: state.books.map((b) => {
        if(b.id === book.id)
        {
          b.shelf = newShelf
        }
        return b;
      })
    }))

    BooksAPI.update(book, newShelf)
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={()=>(
          <ListBooks 
          onChangeShelf={this.changeBookShelf}
          books={this.state.books} />)}
        />
        {
          // you can use:
          //<Route exact path="/search" component={SearchBooks}/>
        }
        <Route exact path="/search" render={() => (
          <SearchBooks 
            books={this.state.books}
            onChangeShelf={this.changeBookShelf}
          />)}

        />

      </div>
    )
  }
}

export default BooksApp
