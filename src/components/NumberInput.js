import React, { useState } from 'react';
import { IoIosBarcode } from "react-icons/io";
import 'bootstrap/dist/css/bootstrap.css';
const NumberInput = ({ value, placeholder, onChange, length}) => {
    const handleChange = (e) => {
        if (e.target.value.length < 7 ) {
            onChange(e.target.value);
        }
    };

  return (
    <div class="digit-input position-relative">

          <IoIosBarcode className='icon-custom' size={16} class="position-absolute" />
          <input class="input-custom " placeholder={placeholder} type="tel" value={value} onChange={handleChange} />
          
    </div>
  );
};

export default NumberInput;