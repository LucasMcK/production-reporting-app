import React from 'react';
import './InputField.css';

export default function InputField({
    label,
    h6,
    type = 'text',
    value,
    onChange,
    disabled,
    step,
    name,
    width,
}) {
    return (
        <div className="input-wrapper">
            <label className="input-label">{label}</label>
            <h6 className="input-unit-label">{h6}</h6>
            <input
                className="input-field"
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                disabled={disabled}
                step={step}
                style={width ? { width } : {}}
            />
        </div>
    );
}
