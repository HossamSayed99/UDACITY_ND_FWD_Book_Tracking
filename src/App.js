import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link, Route } from "react-router-dom";
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  // The state is the function retrieved by API
  state = {
    books : []
  }

  // Update Books calls the api and update state accordingly
  async updateBooks(){
    const books = await BooksAPI.getAll();
    this.setState({ books });
  }

  // We call the update books as soon as the product mounts
  componentDidMount(){
    this.updateBooks();
  }

  // The function that handles changing of shelves of books
  // It is passed down as prop to all children
  handleChange = (id, shelf, e) =>{
    console.log(id, shelf, e.target.value);
    BooksAPI.update({id: id}, e.target.value).then(res => {
        this.updateBooks();
      })
  }


  render() {
    return (
      <div className="app">
        <Route path = '/search' render = { () => (
          <SearchBooks booksOnShelves = {this.state.books} handleChange = {this.handleChange}></SearchBooks>
        )}></Route>
        <Route exact path = '/' render = {() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            {/* Filtering each shelf to only show the books on this shelf */}
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <ListBooks books = {this.state.books.filter((book) => 
                    book.shelf === "currentlyReading"
                  )}
                  handleChange = {this.handleChange}/>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <ListBooks books = {this.state.books.filter((book) => 
                    book.shelf === "wantToRead"
                  )}
                  handleChange = {this.handleChange}/>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <ListBooks books = {this.state.books.filter((book) => 
                    book.shelf === "read"
                  )}
                  handleChange = {this.handleChange}/>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to = '/search' >
                <button>Add a book</button>
              </Link>
            </div>
          </div>
        )}></Route>
      </div>
    )
  }
}

export default BooksApp
