import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import Books from "./Books";
import PropTypes from "prop-types";
import ClosingSearchButton from "./ClosingSearchButton";

class Search extends Component {
  static propTypes = {
    onChangeShelf: PropTypes.func.isRequired,
    myArchive: PropTypes.array
  };

  state = {
    search: "",
    books: "",
    myBooks: ""
  };

  componentDidUpdate(pastProps) {
    const { myArchive } = this.props;
    if (JSON.stringify(myArchive) !== JSON.stringify(pastProps.myArchive)) {
      this.setState(pastState => ({
        ...pastState,
        myBooks: myArchive
      }));
    }
  }

  //API Call
  handleChange = e => {
    const { value } = e.target;
    const { myArchive } = this.props;
    this.setState(pastState => ({
      ...pastState,
      search: value
    }));

    if (value) {
      BooksAPI.search(value).then(books => {
        if (books !== "") {
          this.setState(pastState => ({
            ...pastState,
            books: books,
            myBooks: myArchive
          }));
        }
      });
    } else {
      this.setState(pastState => ({
        ...pastState,
        books: ""
      }));
    }
  };


  render() {
    const { search, books, myBooks } = this.state;
    const { onChangeShelf } = this.props;
    console.log(this.state);
    let booksOrNoBooks = "";
    if (books.error === "empty query" || books === "undefined") {
      booksOrNoBooks = (
        <h1 style={{ textAlign: `center` }}>
          We can't find anything... sorry, try again
        </h1>
      );
    } else {
      booksOrNoBooks = (
        <ol className="books-grid">
          {books && (
            <Books
              books={books}
              onChangeShelf={onChangeShelf}
              myBooks={myBooks}
            />
          )}
        </ol>
      );
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <ClosingSearchButton />
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={search}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="search-books-results">{booksOrNoBooks}</div>
      </div>
    );
  }
}

export default Search;
