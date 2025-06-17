import React from 'react';
import './Fieldset.css'

export default function Fieldset({ title, children }) {
    return (
        <fieldset style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <legend><strong>{title}</strong></legend>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {children}
            </div>
        </fieldset>
    );
}