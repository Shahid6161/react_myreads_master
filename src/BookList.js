import React from "react";
import BookShelf from "./BookShelf";
import AddBook from "./AddBook";
import PropTypes from "prop-types";
import ShelfTitle from "./ShelfTitle";

const BookList = props => {
  const { books, onChangeShelf } = props;

  const groupBy = (objectArray, property) => {
    return objectArray.reduce((acc, obj) => {
      let key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  };

  let booksByShelf = {};
  if (books) {
    booksByShelf = groupBy(books, "shelf");
  }

  return (
    <div className="listing-books">
      <div className="listing-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="listing-books-content">
        <div>
          <div className="bookshelf">
            {Object.keys(booksByShelf).map(shelf => {
              return (
                <div key={shelf}>
                  <ShelfTitle shelf={shelf} />
                  <BookShelf
                    books={booksByShelf[shelf]}
                    onChangeShelf={onChangeShelf}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <AddBook />
    </div>
  );
};

BookList.propTypes = {
  books: PropTypes.array,
  onChangeShelf: PropTypes.func.isRequired
};

export default BookList;
