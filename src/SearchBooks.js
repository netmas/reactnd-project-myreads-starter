import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {

  static propTypes = {
      //search: PropTypes.array.isRequired
    }

  state = {
      query: '',
      books: []
    }

  componentDidMount() {
    this.updateQuery("")
  }

  /*Required 1 && 2 - Done*/
  updateQuery = (query) => {
    BooksAPI.search(query,20).then((books) => {
      books === undefined?(
          this.setState({ books:[], query })
        ):(
          books.error?(
            this.setState({ books:[], query })
          ):(
            this.setState({ books, query }) 
          )
        )
    })
  }


	render(){
    const { onChangeShelf } = this.props
    const { query, books } = this.state
    const bookShelf = [  {code:'currentlyReading', description:'Currently Reading'}, 
              {code:'wantToRead', description:'Want to Read'}, 
              {code:'read', description:'Read'},
              {code:'none', description:'None'}]
    let flag = 0;

    let showingBooksTitle, showingBooksAuthors, showingAux
    let showingBooks = []
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingBooksTitle = books.filter((book) => match.test(book.title))
      showingBooksAuthors = books.filter((book) => match.test(book.authors))
      showingAux = showingBooksTitle.concat(showingBooksAuthors)
      showingBooks = Array.from(new Set(showingAux))
    } else {
      showingBooks = books
    }
    showingBooks.length > 0 && (
      showingBooks.sort(sortBy('title'))
    )
		return(
			<div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
             {showingBooks.length > 0 && (
               showingBooks.map((book) => (
                <li key={book.id !== undefined?(book.id):("")}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks !== undefined?(book.imageLinks.thumbnail !== undefined?(book.imageLinks.thumbnail):("")):("")})` }}></div>
                      <div className="book-shelf-changer">
                        <select onChange={(event) => onChangeShelf(book, event.target.value)}>
                          <option value="none" disabled>Move to...</option>
                          {bookShelf.map((shelf) => {
                            var string;
                            book.shelf === shelf.code?(
                                string = <option value={shelf.code} selected>{shelf.description}</option>,
                                flag = 1
                              ):(
                                book.shelf === 'none' && flag === 0 ?(
                                  string = <option value={shelf.code} selected>{shelf.description}</option>
                                ):(
                                  string = <option value={shelf.code}>{shelf.description}</option>,
                                  flag = 0
                                )
                              )

                            return string;
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title !== undefined?(book.title):("")}</div>
                    <div className="book-authors">{book.authors !== undefined?(book.authors):("")}</div>
                  </div>
                </li>
                ))
               )} 
          </ol>
        </div>
      </div>
		)
	}
}

export default SearchBooks