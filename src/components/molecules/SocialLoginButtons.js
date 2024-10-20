import React from 'react';
import IconButton from '../atoms/IconButton';

const SocialLoginButtons = () => {
  return (
    <div className="d-flex justify-content-between">
      <IconButton
        iconClass="fab fa-github"
        text="Login with GitHub"
        className="btn-dark"
        onClick={() => console.log('GitHub login')}
      />
      <IconButton
        iconClass="fab fa-google"
        text="Login with Gmail"
        className="btn-danger"
        onClick={() => console.log('Gmail login')}
      />
    </div>
  );
};

export default SocialLoginButtons;
