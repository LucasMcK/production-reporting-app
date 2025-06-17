import React from 'react';
import './InputField.css';

export default function InputField({ label, type = "text", value, onChange, disabled, step, name }) {
    return (
        <div className="input-wrapper">
            <label className="input-label">{label}</label>
            <input
                className="input-field"
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                disabled={disabled}
                step={step}
            />
        </div>
    );
}