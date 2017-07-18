import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListBooks extends Component {

	static propTypes = {
    	books: PropTypes.array.isRequired
  	}

	render(){
		const { books, onChangeShelf } = this.props

		let currentlyReadingBooks, wantToReadBooks, readBooks

		const matchCurrentlyReadingBooks = new RegExp(escapeRegExp('currentlyReading'))
		const matchWantToReadBooks = new RegExp(escapeRegExp('wantToRead'))
		const matchReadBooks = new RegExp(escapeRegExp('read'))
		const bookShelf = [	{code:'currentlyReading', description:'Currently Reading'}, 
							{code:'wantToRead', description:'Want to Read'}, 
							{code:'read', description:'Read'},
							{code:'none', description:'None'}]


      	currentlyReadingBooks = books.filter((book) => matchCurrentlyReadingBooks.test(book.shelf))
      	wantToReadBooks = books.filter((book) => matchWantToReadBooks.test(book.shelf))
      	readBooks = books.filter((book) => matchReadBooks.test(book.shelf))

      	currentlyReadingBooks.sort(sortBy('title'))
      	wantToReadBooks.sort(sortBy('title'))
      	readBooks.sort(sortBy('title'))

      	let flag = 0;

		return(
			<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {currentlyReadingBooks.map((book) => (
			            <li key={book.id}>
	                        <div className="book">
	                          <div className="book-top">
	                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
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
	                          <div className="book-title">{book.title}</div>
	                          <div className="book-authors">{book.authors}</div>
	                        </div>
	                      </li>
			          	))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {wantToReadBooks.map((book) => (
			            <li key={book.id}>
	                        <div className="book">
	                          <div className="book-top">
	                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
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
	                          <div className="book-title">{book.title}</div>
	                          <div className="book-authors">{book.authors}</div>
	                        </div>
	                      </li>
			          	))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {readBooks.map((book) => (
			            <li key={book.id}>
	                        <div className="book">
	                          <div className="book-top">
	                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
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
	                          <div className="book-title">{book.title}</div>
	                          <div className="book-authors">{book.authors}</div>
	                        </div>
	                      </li>
			          	))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
		)
	}
}

export default ListBooks
