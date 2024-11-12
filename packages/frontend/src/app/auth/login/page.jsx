"use client";

import React, { useState } from 'react';
import SocialLoginButtons from 'hst/components/molecules/SocialLoginButtons';
import InputField from 'hst/components/atoms/InputField';
import { Button } from 'react-bootstrap';
import { setToken } from 'hst/store/slices/token.slices';
import { useDispatch } from 'react-redux';
import { useLoginUserMutation } from 'hst/store/services/users.api';

const LoginPage = () => {
  const [createUser, { isUpdating }] = useLoginUserMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    createUser({ email, password })
      .then((data) => {
        const error = data.error;

        if (error) {
          setMessage(error.data.message);
        } else {
          dispatch(
            setToken({
              token: data.data.token,
            })
          );
          window.location.href = '/dashboard';
        }
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="container p-4 shadow-sm rounded" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p style={{ textAlign: 'center', color: 'red' }}>{message}</p>
          <Button type="submit" className="w-100 btn-primary mt-3">Login</Button>
        </form>
        <div className="my-3">
          <p className="text-center">Or login with:</p>
          <SocialLoginButtons />
        </div>
        <div className="text-center mt-4">
          <p>¿No tienes una cuenta?</p>
          <Button
            variant="link"
            className="btn-secondary"
            onClick={() => window.location.href = '/auth/register'}
          >
            Crear cuenta
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
