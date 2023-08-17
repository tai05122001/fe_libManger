import React from 'react';

const ImageButton = ({ onClick, children, src }) => {
  return (
    <button class="img-button" onClick={onClick}>
          <img src={ src} width="24" height="24"/>
    </button>
  );
};
 
 
export default ImageButton;