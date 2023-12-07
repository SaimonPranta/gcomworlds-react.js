import React from "react";
import "./SearchBox.css";
import { BsSearch } from "react-icons/bs";

const SearchBox = ({ placeholder, setSearchInput, searchInput }) => {
  return (
    <div className="search-box">
      <BsSearch />
      <input
        placeholder={placeholder}
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBox;
