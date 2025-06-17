import React from 'react';

export default function Fieldset({ title, children }) {
  return (
    <fieldset style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <legend><strong>{title}</strong></legend>
      {children}
    </fieldset>
  );
}