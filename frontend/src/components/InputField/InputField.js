import React from 'react';

export default function InputField({ label, type = "text", value, onChange, disabled, step, name }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>
        {label}
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          step={step}
          style={{ marginLeft: '1rem' }}
        />
      </label>
    </div>
  );
}