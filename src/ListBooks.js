import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
class ListBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired
    }
    render(){
        return (
            <div className="bookshelf-books">
            <ol className="books-grid">
              { this.props.books ? (
                  this.props.books.map((book) => 
                    (<Book key = {book.id} 
                        imageLink = {book.imageLinks ? book.imageLinks.thumbnail : ''} 
                        title = {book.title} 
                        authors = {Array.isArray(book.authors) ? book.authors : []} 
                        shelf = {book.shelf}
                        id = {book.id}
                        handleChange = {this.props.handleChange}></Book>)
                  )
                ) :
                (
                    <p>Although we have millions of books, we can not find what you are searching for! Try searching for a different book!</p>
                )
              }
            </ol>
          </div>
        )
    }

}

export default ListBooks;