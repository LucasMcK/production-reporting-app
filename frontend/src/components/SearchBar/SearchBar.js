// files general purpose: create reusable search bar component

// import React to define component
import React from 'react';
// import styling for react component
import './SearchBar.css';

// define functional searchBar component:
    // value: current text in the search bar
    // onChange: handles changes to the input
    // placeholder: default text to show when there is no input
const SearchBar = ({ value, onChange, placeholder = "Search files..." }) => {
    return (
        <input
            // sets class to search bar for styling defined in SearchBar.css
            className="search-bar"
            // sets type to text—allow only text input to the search bar
            type="text"
            // binds input value to prop component
            value={value}
            // call onChange whenever user types something—allows for dynamic search results
            onChange={onChange}
            // display placeholder text when input is empty
            placeholder={placeholder}
        />
    );
};

// export component so it can be used in other files
export default SearchBar;

// NOTE: to use this component in other files, you must do two things:
    // 1. add the following import to the top of the file you wish to add it to:
        // import SearchBar from '../components/SearchBar';
    // 2. implement the SearchBar component using this statement:
        // <SearchBar value={value} onChange={functionality for change in input} placeholder/>
        // value (REQUIRED): binds search bar input to state variable—query sets value of the input to the user text input
        // onChange (REQUIRED): updates value every time user types—setQuery(e.target.value)} sets query as target value for dynamic results
        // placeholder: default text searchBar will display when empty