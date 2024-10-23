"use client";

import React, { useState } from 'react';
import { useCreateUserMutation } from 'hst/store/services/users.api';
import SocialLoginButtons from 'hst/components/molecules/SocialLoginButtons';
import InputField from 'hst/components/atoms/InputField';
import Button from 'hst/components/atoms/Button';

const LoginPage = () => {
  const [createUser, { isUpdating }] = useCreateUserMutation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ username, password });
    createUser({username, password})
    // .unwrap()
    .then(data => console.log(data))
    .catch(error => console.error(error))
  };

  return (
    <div className="container max-width vh-100">
      <h2 className="text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Username"
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button text="Login" type="submit" className="btn-primary" />
      </form>
      <div className="my-3">
        <p className="text-center">Or login with:</p>
        <SocialLoginButtons />
      </div>
    </div>
  );
};

export default LoginPage;
