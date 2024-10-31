"use client";

import React, {useState} from 'react';
import InputField from 'hst/components/atoms/InputField';
import { useCreateUserMutation } from 'hst/store/services/users.api';
import { Button } from 'react-bootstrap';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [createUser, { isUpdating }] = useCreateUserMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser({username, email, password, name})
    .then(data => console.log(data))
    .catch(err => console.error(err))
  };

  return (
    <div className="container mt-5 max-width">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
      <InputField
          label="Name"
          type="text"
          value={username}
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
        <Button
          type='submit'
        >Registrar</Button>
      </form>
      <p className="mt-3">
        ¿Ya tienes una cuenta? <a href="/auth/login">Inicia sesión aquí</a>
      </p>
    </div>
  );
};

export default RegisterPage;
