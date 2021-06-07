import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

class SerchBooks extends Component{
    static propTypes = {
        booksOnShelves: PropTypes.array.isRequired,
        handleChange: PropTypes.func.isRequired
    }
    // The state is the query string and the books we should show
    state = {
        query:'',
        books : []
    }
    // This updates the query whenever the user types
    updateQuery = (query) => {
        this.setState(() => ({
          query: query
        }))
        this.getRequiredBooks(query);
    }

    // This calls the api to search for the quried books
    getRequiredBooks = (query) =>{
        BooksAPI.search(query).then(obj => {
            if(!obj['error']){ // Sanitizer check
                for( let b in obj){ // Adding the shelf attribute to each book
                    obj[b].shelf = 'none'
                    for(let shelvedBook in this.props.booksOnShelves){
                        if(this.props.booksOnShelves[shelvedBook].id === obj[b].id){
                            obj[b].shelf = this.props.booksOnShelves[shelvedBook].shelf
                            console.log(obj[b].title)
                            break;
                        }
                    }
                }
                // updating the state
                this.setState(() => ({
                    books : obj
                }))
            }
            else{
                this.setState(() => ({
                    books : []
                }))
            }
        }).catch((err) => {
            console.log(err);
            this.setState(() => ({
                books : []
                }))}
            )
    }
    // This handles the change in the search page, it first calls the parents' handel change (which calls the api update)
    // Then change its own state
    handleChange = (id, shelf, e) =>{
        const {target} = e;
        // Calling parent's handle change
        this.props.handleChange(id, shelf, e);
        this.setState((currentState) => {
            currentState.books.map(book => {
                if(book.id === id){
                    book.shelf = target.value;
                }
                return book;
            })
        } );
    }
    render(){
        const { query } = this.state
        return (
            <div className="search-books">
            <div className="search-books-bar">
                <Link  to = "/">
                    <button className="close-search">Close</button>
                </Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value = {query} onChange = {(event) => this.updateQuery(event.target.value)}/>

              </div>
            </div>
            <div className="search-books-results">
              <ListBooks books = {this.state.books} handleChange = {this.handleChange}></ListBooks>
            </div>
          </div>
        )
    }
}

export default SerchBooks