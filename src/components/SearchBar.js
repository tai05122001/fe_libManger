import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { GrClose } from 'react-icons/gr';

const SearchBar = ({ placeholder, onChange , value }) => {
    const [valueDate, setVaueDate] = useState('');



  return (
    <div class="searchbar">
      <input class="form-input" placeholder={placeholder} type="text" onChange={onChange} value={value} />

      <div class="icon-search">
        <BiSearch />
      </div>
      <div class="icon-clean hidden">
        <GrClose />
      </div>
      
    </div>
  );
};

export default SearchBar;