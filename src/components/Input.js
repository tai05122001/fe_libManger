import React, { useState } from 'react';

const Input = ({ label, value, placeholder, onChange, type}) => {

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div class="field">
      <label class="form-label">{label}</label>
        <br/>
      <input class="form-input" placeholder={placeholder} type={type} value={value} onChange={handleChange} />
    </div>
  );
};

export default Input;