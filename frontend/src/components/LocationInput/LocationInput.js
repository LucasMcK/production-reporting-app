// files general purpose: create reusable search bar component

// import React and two hooks:
// useRef: to manage local references
// useState: to manage local state
import React, { useRef, useState } from 'react';
// import styling for react component
import './LocationInput.css';

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
const SearchBar = ({
    yearValue,
    onYearChange,
    monthValue,
    onMonthChange,
    searchValue,
    onLocationChange,
    yearPlaceholder = 'YY',
    monthPlaceholder = 'MM',
    locationPlaceholder = 'Location...',
}) => {
    // initialize references to control input box focus
    const yearRef = useRef(null);
    const monthRef = useRef(null);
    const locationRef = useRef(null);
    // create states for managing place holder text of each input field
    const [yearPlaceholderText, setYearPlaceholderText] =
        useState(yearPlaceholder);
    const [monthPlaceholderText, setMonthPlaceholderText] =
        useState(monthPlaceholder);
    const [locationPlaceholderText, setLocationPlaceholderText] =
        useState(locationPlaceholder);

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

    // update locationValue state via onLocationChange
    const handleLocationInput = (e) => {
        const val = e.target.value;
        onLocationChange(val);
    };

    // switches focus back to month input when user clicks backspace or delete
    const handleLocationKeyDown = (e) => {
        if (
            (e.key === 'Backspace' || e.key === 'Delete') &&
            searchValue.length === 0
        ) {
            e.preventDefault();
            if (monthValue.length === 2) {
                // delete tens digit from month
                onMonthChange(monthValue.slice(0, 1));
            }
            monthRef.current?.focus();
        }
    };

    // clear place holder text for input box when focused, reset on blur
    const onYearFocus = () => setYearPlaceholderText('');
    const onYearBlur = () => setYearPlaceholderText(yearPlaceholder);
    const onMonthFocus = () => setMonthPlaceholderText('');
    const onMonthBlur = () => setMonthPlaceholderText(monthPlaceholder);
    const onLocationFocus = () => setLocationPlaceholderText('');
    const onLocationBlur = () =>
        setLocationPlaceholderText(locationPlaceholder);

    return (
        <div className="search-bar-container">
            <label className="search-bar-label">Workbook Name</label>
            <div className="search-inputs-row">
                <input
                    ref={yearRef}
                    className="search-bar date-input"
                    type="text"
                    maxLength={2}
                    value={yearValue}
                    onChange={handleYearInput}
                    placeholder={yearPlaceholderText}
                    onFocus={onYearFocus}
                    onBlur={onYearBlur}
                />
                <span className="default-text">—</span>
                <input
                    ref={monthRef}
                    className="search-bar date-input"
                    type="text"
                    maxLength={2}
                    value={monthValue}
                    onChange={handleMonthInput}
                    onKeyDown={handleMonthKeyDown}
                    placeholder={monthPlaceholderText}
                    onFocus={onMonthFocus}
                    onBlur={onMonthBlur}
                />
                <input
                    ref={locationRef}
                    className="search-bar location-input"
                    type="text"
                    value={searchValue}
                    onChange={handleLocationInput}
                    onKeyDown={handleLocationKeyDown}
                    placeholder={locationPlaceholderText}
                    onFocus={onLocationFocus}
                    onBlur={onLocationBlur}
                />
                <span className="default-text">.xls</span> {/* moved here */}
            </div>
        </div>
    );
};

// export component so it can be used in other files
export default SearchBar;

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
