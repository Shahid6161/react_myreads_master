import React from "react";
import { Link } from "react-router-dom";

const ClosingSearchButton = () => {
  return (
    <Link to="/">
      <button className="closing-search">Close</button>
    </Link>
  );
};

export default ClosingSearchButton;
