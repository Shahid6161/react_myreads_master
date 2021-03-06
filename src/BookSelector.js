import React, { Component } from "react";
import PropTypes from "prop-types";

class BookSelector extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    myBooks: PropTypes.array,
    onChangeShelf: PropTypes.func.isRequired,
    moveBook: PropTypes.func.isRequired
  };

  state = {
    shelf: ""
  };

  componentDidMount() {
    const { book, myBooks } = this.props;
    if (book.shelf === undefined) {
      this.setState({ shelf: "none" });
    }
    if (book.shelf !== undefined) {
      this.setState({
        shelf: book.shelf
      });
    } else {
      myBooks.forEach(b => {
        if (b.id === book.id) {
          this.setState({
            shelf: b.shelf
          });
        }
      });
    }
  }

  componentDidUpdate(pastProps) {
    const { book, myBooks } = this.props;
    if (JSON.stringify(myBooks) !== JSON.stringify(pastProps.myBooks)) {
      if (book.shelf === undefined) {
        this.setState({ shelf: "none" });
      }
      if (book.shelf !== undefined) {
        this.setState({
          shelf: book.shelf
        });
      } else {
        myBooks.forEach(b => {
          if (b.id === book.id) {
            this.setState({
              shelf: b.shelf
            });
          }
        });
      }
    }
  }

  handleChange = e => {
    const { value } = e.target;
    const { book, onChangeShelf, moveBook } = this.props;
    onChangeShelf(book, value);
    moveBook(value);
  };

  render() {
    const { shelf } = this.state;

    return (
      <div className="book-shelf-changer">
        <select value={shelf} onChange={this.handleChange}>
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default BookSelector;
