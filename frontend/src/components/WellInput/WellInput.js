import React, { useRef, useState } from 'react';
import './WellInput.css';

const WellInput = ({
    quadrantLSDValue,
    onQuadrantLSDChange,
    sectionValue,
    onSectionChange,
    townshipValue,
    onTownshipChange,
    rangeValue,
    onRangeChange,
    meridianValue,
    onMeridianChange,
    quadrantLSDPlaceholder = 'Quadrant/LSD',
    sectionPlaceholder = 'Section',
    townshipPlaceholder = 'Township',
    rangePlaceholder = 'Range',
    meridianPlaceholder = 'Meridian',
}) => {
    const quadrantLSDRef = useRef(null);
    const sectionRef = useRef(null);
    const townshipRef = useRef(null);
    const rangeRef = useRef(null);
    const meridianRef = useRef(null);

    const [quadrantLSDPlaceholderText, setQuadrantLSDPlaceholderText] =
        useState(quadrantLSDPlaceholder);
    const [sectionPlaceholderText, setSectionPlaceholderText] =
        useState(sectionPlaceholder);
    const [townshipPlaceholderText, setTownshipPlaceholderText] =
        useState(townshipPlaceholder);
    const [rangePlaceholderText, setRangePlaceholderText] =
        useState(rangePlaceholder);
    const [meridianPlaceholderText, setMeridianPlaceholderText] =
        useState(meridianPlaceholder);

    const onQuadrantLSDFocus = () => setQuadrantLSDPlaceholderText('');
    const onQuadrantLSDBlur = () =>
        setQuadrantLSDPlaceholderText(quadrantLSDPlaceholder);
    const onSectionFocus = () => setSectionPlaceholderText('');
    const onSectionBlur = () => setSectionPlaceholderText(sectionPlaceholder);
    const onTownshipFocus = () => setTownshipPlaceholderText('');
    const onTownshipBlur = () =>
        setTownshipPlaceholderText(townshipPlaceholder);
    const onRangeFocus = () => setRangePlaceholderText('');
    const onRangeBlur = () => setRangePlaceholderText(rangePlaceholder);
    const onMeridianFocus = () => setMeridianPlaceholderText('');
    const onMeridianBlur = () =>
        setMeridianPlaceholderText(meridianPlaceholder);

    const handleQuadrantLSDInput = (e) => {
        const val = e.target.value;
        onQuadrantLSDChange(val);

        if (val.length === 2) {
            sectionRef.current?.focus();
        }
    };

    const handleSectionInput = (e) => {
        const val = e.target.value;
        onSectionChange(val);

        if (val.length === 2) {
            townshipRef.current?.focus();
        }
    };

    const handleTownshipInput = (e) => {
        const val = e.target.value;
        onTownshipChange(val);

        if (val.length === 2) {
            rangeRef.current?.focus();
        }
    };

    const handleRangeInput = (e) => {
        const val = e.target.value;
        onRangeChange(val);

        if (val.length === 2) {
            meridianRef.current?.focus();
        }
    };

    const handleMeridianInput = (e) => {
        const val = e.target.value;
        onMeridianChange(val);
    };

    const handleKeyDown = (e) => {
        if (
            (e.key === 'Backspace' || e.key === 'Delete') &&
            sectionValue.length === 0
        ) {
            e.preventDefault();
            onQuadrantLSDChange(quadrantLSDValue.slice(0, 1));
            quadrantLSDRef.current?.focus();
        }
        if (
            (e.key === 'Backspace' || e.key === 'Delete') &&
            townshipValue.length === 0
        ) {
            e.preventDefault();
            onSectionChange(sectionValue.slice(0, 1));
            sectionRef.current?.focus();
        }
        if (
            (e.key === 'Backspace' || e.key === 'Delete') &&
            rangeValue.length === 0
        ) {
            e.preventDefault();
            onTownshipChange(townshipValue.slice(0, 1));
            sectionRef.current?.focus();
        }
        if (
            (e.key === 'Backspace' || e.key === 'Delete') &&
            meridianValue.length === 0
        ) {
            e.preventDefault();
            onRangeChange(rangeValue.slice(0, 1));
            rangeRef.current?.focus();
        }
    };

    return (
        <div className="well-input-container">
            <label className="well-input-label">Worksheet Name</label>
            <div className="well-inputs-row">
                <input
                    ref={quadrantLSDRef}
                    className="well-input date-input"
                    type="text"
                    maxLength={2}
                    value={quadrantLSDValue}
                    onChange={handleQuadrantLSDInput}
                    placeholder={quadrantLSDPlaceholderText}
                    onFocus={onQuadrantLSDFocus}
                    onBlur={onQuadrantLSDBlur}
                />
                <span className="non-input-text">—</span>
                <input
                    ref={sectionRef}
                    className="well-input date-input"
                    type="text"
                    maxLength={2}
                    value={sectionValue}
                    onChange={handleSectionInput}
                    onKeyDown={handleKeyDown}
                    placeholder={sectionPlaceholderText}
                    onFocus={onSectionFocus}
                    onBlur={onSectionBlur}
                />
                <span className="non-input-text">—</span>
                <input
                    ref={townshipRef}
                    className="well-input date-input"
                    type="text"
                    maxLength={2}
                    value={townshipValue}
                    onChange={handleTownshipInput}
                    onKeyDown={handleKeyDown}
                    placeholder={townshipPlaceholderText}
                    onFocus={onTownshipFocus}
                    onBlur={onTownshipBlur}
                />
                <span className="non-input-text">—</span>
                <input
                    ref={rangeRef}
                    className="well-input date-input"
                    type="text"
                    maxLength={2}
                    value={rangeValue}
                    onChange={handleRangeInput}
                    onKeyDown={handleKeyDown}
                    placeholder={rangePlaceholderText}
                    onFocus={onRangeFocus}
                    onBlur={onRangeBlur}
                />
                <span className="non-input-text">—</span>
                <input
                    ref={meridianRef}
                    className="well-input date-input"
                    type="text"
                    maxLength={2}
                    value={meridianValue}
                    onChange={handleMeridianInput}
                    onKeyDown={handleKeyDown}
                    placeholder={meridianPlaceholderText}
                    onFocus={onMeridianFocus}
                    onBlur={onMeridianBlur}
                />
            </div>
        </div>
    );
};

export default WellInput;
