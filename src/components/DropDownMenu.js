import React, { useState } from 'react';

function DropdownMenu(props) {
    const  values  = props.values;
    const  value  = props.value;
    // alert(JSON.stringify(values));
    
  const [selectedOption, setSelectedOption] = useState('');

  return (
    <div class="field">
          < label class="form-label" htmlFor="dropdown">Gender</label>
        <br/>
        <select value={value}  onChange={props.onChange}>
              <option value="">-- Choose gender --</option>
              {
                  values.map((value, index) => (
                <option value={value}>{value}</option>
                  ))
              }
      </select>
    </div>
  );
}

export default DropdownMenu;