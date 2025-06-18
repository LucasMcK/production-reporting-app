import React, { useRef, useState } from 'react';
import './WorkbookInput.css';

const Workbook = ({
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
    const yearRef = useRef(null);
    const monthRef = useRef(null);
    const locationRef = useRef(null);

    const [yearPlaceholderText, setYearPlaceholderText] =
        useState(yearPlaceholder);
    const [monthPlaceholderText, setMonthPlaceholderText] =
        useState(monthPlaceholder);
    const [locationPlaceholderText, setLocationPlaceholderText] =
        useState(locationPlaceholder);

    const onYearFocus = () => setYearPlaceholderText('');
    const onYearBlur = () => setYearPlaceholderText(yearPlaceholder);
    const onMonthFocus = () => setMonthPlaceholderText('');
    const onMonthBlur = () => setMonthPlaceholderText(monthPlaceholder);
    const onLocationFocus = () => setLocationPlaceholderText('');
    const onLocationBlur = () =>
        setLocationPlaceholderText(locationPlaceholder);

    const handleYearInput = (e) => {
        const val = e.target.value;
        onYearChange(val);

        if (val.length === 2) {
            monthRef.current?.focus();
        }
    };

    const handleMonthInput = (e) => {
        const val = e.target.value;
        onMonthChange(val);

        if (val.length === 2) {
            locationRef.current?.focus();
        }
    };

    const handleMonthKeyDown = (e) => {
        if (
            (e.key === 'Backspace' || e.key === 'Delete') &&
            monthValue.length === 0
        ) {
            e.preventDefault();
            if (yearValue.length === 2) {
                onYearChange(yearValue.slice(0, 1));
            }
            yearRef.current?.focus();
        }
    };

    const handleLocationInput = (e) => {
        const val = e.target.value;
        onLocationChange(val);
    };

    const handleLocationKeyDown = (e) => {
        if (
            (e.key === 'Backspace' || e.key === 'Delete') &&
            searchValue.length === 0
        ) {
            e.preventDefault();
            if (monthValue.length === 2) {
                onMonthChange(monthValue.slice(0, 1));
            }
            monthRef.current?.focus();
        }
    };

    return (
        <div className="workbook-input-container">
            <label className="label">Workbook Name</label>
            <div className="workbook-inputs input-fields-row">
                <input
                    ref={yearRef}
                    className="workbook-input date-input"
                    type="text"
                    maxLength={2}
                    value={yearValue}
                    onChange={handleYearInput}
                    placeholder={yearPlaceholderText}
                    onFocus={onYearFocus}
                    onBlur={onYearBlur}
                />
                <span className="non-input-text">—</span>
                <input
                    ref={monthRef}
                    className="workbook-input date-input"
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
                    className="workbook-input location-input"
                    type="text"
                    value={searchValue}
                    onChange={handleLocationInput}
                    onKeyDown={handleLocationKeyDown}
                    placeholder={locationPlaceholderText}
                    onFocus={onLocationFocus}
                    onBlur={onLocationBlur}
                />
                <span className="non-input-text">.xls</span>
            </div>
        </div>
    );
};

export default Workbook;
