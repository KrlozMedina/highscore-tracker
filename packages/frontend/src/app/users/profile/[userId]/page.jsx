'use client'

import Loading from "hst/components/atoms/Loading";
import { Danger, Warning } from "hst/components/atoms/Message";
import Footer from "hst/components/molecules/Footer";
import Header from "hst/components/molecules/Header";
import { useGetUserQuery, useUpdateAvatarUserMutation, useUpdateUserMutation } from "hst/store/services/users.api";
import { getToken, parseJwt, validateExpireToken } from "hst/utils/functions";
import { useEffect, useState } from "react";
import { Container, Card, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";

export default function UserDetail({ params }) {
  const token = getToken()
  const tokenJwt = parseJwt(token);
  const userRoles = tokenJwt?.roles;
  const userId = tokenJwt?.sub;

  const { data, error, isLoading } = useGetUserQuery([params.userId, token]);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [updateAvatar, { isLoading: isUpdatingAvatar }] = useUpdateAvatarUserMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [avatarImage, setAvatarImage] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [roles, setRoles] = useState([]);
  const [avatarOld, setAvatarOld] = useState('');

  

  const dispatch = useDispatch();

  useEffect(() => {
    validateExpireToken(tokenJwt, dispatch);
  }, [tokenJwt, dispatch]);

  useEffect(() => {
    if (!isLoading && data) {
      setAvatar(data.avatar);
      setName(data.name);
      setUsername(data.username);
      setEmail(data.email);
      setRoles(data.roles);
      setAvatarImage(`data:image/png;base64,${data.avatarImage}`);
    }
  }, [data, isLoading]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setAvatarImage(reader.result);
      };
      setAvatar(file);
    }

    const formData = new FormData();
    formData.append('file', file);

    console.log(formData.get('file'))

    updateAvatar([params.userId, formData, token]);
  };

  const handleSave = async () => {
    const formData = new FormData();
    // formData.append('avatar', avatar);
    // formData.append('name', name);
    // formData.append('email', email);
    // formData.append('roles', JSON.stringify(role));
    // formData.append('username', username);

    try {
      await updateUser([params.userId, {name, email, username, roles}, token]);
      setIsEditing(false);
    } catch (err) {
      console.error("Error al actualizar el usuario:", err);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleRoleChange = (e) => {
    const selectedRoles = Array.from(e.target.selectedOptions, option => option.value);
    setRoles(selectedRoles);
  };

  return (
    <>
      <Header roles={userRoles} userId={userId} />
      <Container className="mt-5" style={{ maxWidth: '500px' }}>
        {error ? <Danger error={error} /> : 
        isLoading ? <Loading message="Cargando usuario..." />: 
        data ? (
          <Card>
            <Card.Img
              variant="top"
              src={avatarImage || 'https://via.placeholder.com/150'}
              alt="User Avatar"
            />
            <Card.Body>
              {isEditing ? (
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Cambiar Avatar</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  {userRoles.includes('ADMIN') && (
                    <Form.Group className="mb-3">
                      <Form.Label>Roles</Form.Label>
                      <Form.Control
                        as="select"
                        multiple
                        name="roles"
                        value={roles}
                        onChange={handleRoleChange}
                      >
                        <option value="ADMIN">ADMIN</option>
                        <option value="PLAYER">PLAYER</option>
                      </Form.Control>
                    </Form.Group>
                  )}
                  <Button variant="success" onClick={handleSave} disabled={isUpdating}>
                    {isUpdating ? 'Guardando...' : 'Guardar'}
                  </Button>
                </Form>
              ) : (
                <>
                  <Card.Title>{name}</Card.Title>
                  <Card.Text>
                    <strong>Username:</strong> {username} <br />
                    <strong>Email:</strong> {email} <br />
                    <strong>Roles:</strong> {roles.join(', ')}
                  </Card.Text>
                  <Button variant="primary" onClick={handleEditToggle}>
                    Editar
                  </Button>
                </>
              )}
            </Card.Body>
          </Card>
        ) : (
          <Warning message="Usuario no existe" />
        )}
      </Container>
      <Footer />
    </>
  );
}