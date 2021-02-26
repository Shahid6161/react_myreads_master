import React from "react";
import { Link } from "react-router-dom";

const AddBook = () => {
  return (
    <Link className="open-search" to="/search">
      <button>Add Book</button>
    </Link>
  );
};

export default AddBook;
