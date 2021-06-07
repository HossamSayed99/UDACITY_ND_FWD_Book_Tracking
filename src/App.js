import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link, Route } from "react-router-dom";
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
class BooksApp extends React.Component {
  state = {
    books : []
  }

  updateBooks(){
    BooksAPI.getAll().then( (books) => {
      this.setState( (prevState) => ({
        books
      }))
    })
  }

  componentDidMount(){
    this.updateBooks();
  }

  handleChange = (id, shelf, e) =>{
    console.log(id, shelf, e.target.value);
    BooksAPI.update({id: id}, e.target.value).then(res => {
        this.updateBooks();
      })
  }


  render() {
    return (
      <div className="app">
        <Route path = '/search' render = {({history}) => (
          <SearchBooks booksOnShelves = {this.state.books} handleChange = {this.handleChange}></SearchBooks>
        )}></Route>
        <Route exact path = '/' render = {() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
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
