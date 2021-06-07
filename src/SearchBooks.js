import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
class SerchBooks extends Component{
    state = {
        query:'',
        books : []
    }
    updateQuery = (query) => {
        this.setState(() => ({
          query: query
        }))
        this.getRequiredBooks(query);
    }

    getRequiredBooks = (query) =>{
        BooksAPI.search(query).then(obj => {
            if(!obj['error']){
                for( let b in obj){
                    obj[b].shelf = 'none'
                    for(let shelvedBook in this.props.booksOnShelves){
                        if(this.props.booksOnShelves[shelvedBook].id === obj[b].id){
                            obj[b].shelf = this.props.booksOnShelves[shelvedBook].shelf
                            console.log(obj[b].title)
                            break;
                        }
                    }
                }
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
    handleChange = (id, shelf, e) =>{
        this.props.handleChange(id, shelf, e);
        this.setState((currentState) => {
            let newState = currentState;
            for(let b in newState.books){
                if(newState.books[b].id === id){
                    newState.books[b].shelf = shelf;
                }
            }
            return {newState};
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