import React from 'react';

const IconButton = ({ iconClass, text, onClick, className }) => {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      <i className={iconClass}></i> {text}
    </button>
  );
};

export default IconButton;
