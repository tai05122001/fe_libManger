import React from 'react';

const ButtonSubmit = ({ onClick, children,toggle, target,classes }) => {
  return (
    <button class={ classes } onClick={onClick} data-bs-toggle={ toggle} data-bs-target={target}>
      {children}
    </button>
  );
};


 
export default ButtonSubmit;