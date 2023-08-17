import React, { useState } from 'react';

import { BsQrCode } from "react-icons/bs";
const InputSecretKey = ({ label, value, placeholder, onChange, type}) => {

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
     <div class="digit-input position-relative">
        <BsQrCode className='icon-custom' size={16} class="position-absolute" />
        <input class="input-custom " placeholder={placeholder} type="tel" value={value} onChange={handleChange} />
    </div>
  );
};

export default InputSecretKey;