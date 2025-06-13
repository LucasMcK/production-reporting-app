import React from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ value, onChange, placeholder = "Search files..." }) => {
  return (
    <input
      className="search-bar"
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default SearchBar;
