import React from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

/*SUGGESTION 1 - Done*/
class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  /*SUGGESTION 2 - Done*/
  changeBookShelf = (book, newShelf) => {
    var aux = this
    BooksAPI.update(book, newShelf).then(() =>{
      aux.setState((state) => ({
        books: state.books.map((b) => {
          if(b.id === book.id)
          {
            b.shelf = newShelf
          }
          return b;
        })
      }))
    })  

    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    }) 
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
            onChangeShelf={this.changeBookShelf}
          />)}

        />

      </div>
    )
  }
}

export default BooksApp
