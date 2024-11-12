'use client';

import React, { useState } from 'react';
import InputField from 'hst/components/atoms/InputField';
import { useCreateUserMutation } from 'hst/store/services/users.api';
import { Button } from 'react-bootstrap';
import SocialLoginButtons from 'hst/components/molecules/SocialLoginButtons';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [createUser, { isUpdating }] = useCreateUserMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser({ username, email, password, name })
      .then(data => {
        !data.error ? window.location.href = '/auth/login' : alert(data.error.data.message)
      })
      .catch(err => alert(err.data.message));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container mt-5 max-width" style={{ maxWidth: '500px' }}>
        <h2 className="text-center">Registro de Usuario</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ingresa tu nombre"
          />
          <InputField
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingresa tu usuario"
          />
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu correo electrónico"
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
          />
          <Button type="submit" className="w-100 mt-3">Registrar</Button>
        </form>
        <div className="my-3">
          <p className="text-center">Or login with:</p>
          <SocialLoginButtons />
        </div>
        <p className="mt-3 text-center">
          ¿Ya tienes una cuenta? <a href="/auth/login">Inicia sesión aquí</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
