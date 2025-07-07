import React from 'react';
import './Fieldset.css';

export default function Fieldset({ title, children }) {
    return (
        <fieldset>
            <legend>
                <strong>{title}</strong>
            </legend>
            <div>{children}</div>
        </fieldset>
    );
}
