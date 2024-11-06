"use client";

import Loading from "hst/components/atoms/Loading";
import { Danger, Warning } from "hst/components/atoms/Message";
// import withAuth from "hst/hoc/with-auth";
import { useGetUserQuery, useUpdateUserMutation } from "hst/store/services/users.api";
import { useEffect, useState } from "react";
import { Container, Card, Button, Form } from "react-bootstrap";

export default function UserDetail({params}){
    const { data, error, isLoading } = useGetUserQuery(params.userId);
    const [updateUser, { isUpdating }] = useUpdateUserMutation();
    
    const [isEditing, setIsEditing] = useState(false);
    const [avatar, setAvatar] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (!isLoading && data !== null) {
            setAvatar(data.avatar);
            setName(data.name);
            setUsername(data.username);
            setEmail(data.email);
        }
    }, [data])

    const handleSave = () => {
        isUpdating ? 'Updating...' : 
        updateUser([params.userId, {name, avatar, username, email}])
        .then(data => {
            setIsEditing(!isEditing);
        })
        .catch(err => console.error(err))
    }

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    return (
        <Container className="mt-5" style={{ maxWidth: '500px' }}>
            {
                error !== undefined ? <Danger error={error} /> : 
                isLoading ? <Loading message='Cargando usuarios' /> :
                data === null ? <Warning message='Usuario no existe' /> :
                <Card>
                    <Card.Img
                    variant="top"
                    src={data.avatar || 'https://via.placeholder.com/150'}
                    alt="User Avatar"
                    />
                    <Card.Body>
                    {isEditing ? (
                        <Form>
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
                        <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                            type="text"
                            name="role"
                            value={data.roles}
                            disabled
                            />
                        </Form.Group>
                        <Button variant="success" onClick={handleSave}>
                            Guardar
                        </Button>
                        </Form>
                    ) : (
                        <>
                        <Card.Title>{name}</Card.Title>
                        <Card.Text>
                            <strong>Username:</strong> {username} <br />
                            <strong>Email:</strong> {email} <br />
                            <strong>Role:</strong> {data.roles}
                        </Card.Text>
                        <Button variant="primary" onClick={handleEditToggle}>
                            Editar
                        </Button>
                        </>
                    )}
                    </Card.Body>
                </Card>
            }
        </Container>
    );
}

// export default withAuth(UserDetail);