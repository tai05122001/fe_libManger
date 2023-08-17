import React, { useState } from 'react';

const InputDate = ({ label, placeholder, type, onChange}) => {
    const [valueDate, setVaueDate] = useState('');



  return (
    <div class="field">
      <label class="form-label">{label}</label>
        <br/>
      <input class="form-input" placeholder={placeholder} type={type}  onChange={onChange} />
    </div>
  );
};

export default InputDate;