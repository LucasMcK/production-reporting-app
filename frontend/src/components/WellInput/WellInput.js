// files general purpose: create reusable search bar component

// import React and two hooks:
// useRef: to manage local references
// useState: to manage local state
import React, { useRef } from 'react';
// import styling for react component
import './WellInput.css';

// define functional searchBar component with the following props:
// yearValue: holds current value of year input field
// onYearChange: holds event handler function to call when year input changes
// monthValue: holds current value of month input field
// onMonthChange: holds event handler function to call when month input changes
// searchValue: holds current value of main search input field
// onLocationChange: holds event handler function to call when search input changes
// yearPlaceholder: placeholder text of the year input
// monthPlaceholder: placeholder text of the month input
// searchPlaceholder: placeholder text of the search input
const WellInput = ({ yearValue, onYearChange, monthValue, onMonthChange }) => {
    // initialize references to control input box focus
    const yearRef = useRef(null);
    const monthRef = useRef(null);
    const locationRef = useRef(null);

    // update yearValue state via onYearChange
    const handleYearInput = (e) => {
        const val = e.target.value;
        onYearChange(val);

        // automatically switch focus to month input when user inputs two digits
        if (val.length === 2) {
            monthRef.current?.focus();
        }
    };

    // update monthValue state via onMonthChange
    const handleMonthInput = (e) => {
        const val = e.target.value;
        onMonthChange(val);

        // automatically switch focus to location input when user inputs two digits
        if (val.length === 2) {
            locationRef.current?.focus();
        }
    };

    // switches focus back to year input when user clicks backspace or delete
    const handleMonthKeyDown = (e) => {
        if (
            (e.key === 'Backspace' || e.key === 'Delete') &&
            monthValue.length === 0
        ) {
            e.preventDefault();
            if (yearValue.length === 2) {
                // delete tens digit from year
                onYearChange(yearValue.slice(0, 1));
            }
            yearRef.current?.focus();
        }
    };

    return (
        <div className="search-bar-container">
            <label className="search-bar-label">Worksheet Name</label>
            <div className="search-inputs-row">
                <input
                    ref={yearRef}
                    className="search-bar date-input"
                    type="text"
                    maxLength={2}
                    value={yearValue}
                    onChange={handleYearInput}
                />
                <span className="default-text">—</span>
                <input
                    ref={monthRef}
                    className="search-bar date-input"
                    type="text"
                    maxLength={1}
                    value={monthValue}
                    onChange={handleMonthInput}
                    onKeyDown={handleMonthKeyDown}
                />
            </div>
        </div>
    );
};

// export component so it can be used in other files
export default WellInput;

// NOTE: to use this component in other files, you must do two things:
// 1. add the following import to the top of the file you wish to add it to:
// import SearchBar from '../components/SearchBar';
// 2. implement the SearchBar component using this statement:
// <SearchBar
// yearValue={year}
// onYearChange={setYear}
// monthValue={month}
// onMonthChange={setMonth}
// searchValue={location}
// onLocationChange={setSearch}
// />
