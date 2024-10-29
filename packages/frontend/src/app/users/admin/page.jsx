"use client";

import withAuth from "hst/hoc/with-auth";
import { Container, Table, Button, Spinner, Form, Pagination, Alert } from "react-bootstrap";
import { useGetUsersQuery, useUpdateUserMutation } from "hst/store/services/users.api";
import { useEffect, useState } from "react";

export default function PlayersList(params) {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10)
    // const [totalUsers, setTotalUsers] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const { data, error, isLoading } = useGetUsersQuery({page, limit});
    const [updateUser, { isUpdating }] = useUpdateUserMutation();

    useEffect(() => {
        !isLoading && setTotalPages(data.totalPages)
    }, [data])

    const handleLimitChange = (e) => {
        setLimit(Number(e.target.value));
        setPage(1);
    };

    const handlePageChange = (newPage) => {
        page < totalPages && setPage(newPage)
    };

    const handleToggleUserStatus = (id, status) => {
        if (status !== 'Lock') {
            status === 'Disable' && updateUser({id, status: 'Active'})
            status === 'Active' && updateUser({id, status: 'Disable'})
        } else {
            updateUser({id, status: 'Active'})
        }
    };

    const handleDeleteUser = (id, status) => {
        status !== 'Lock' && updateUser({id, status: 'Lock'})
    };

    return (
        <Container className="mt-5">
            {
                isLoading 
                ? 
                    <div className="text-center">
                        <Spinner animation="border" />
                        <p>Cargando usuarios...</p>
                    </div> 
                :
                    <div>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {!isLoading && data.length === 0 && <Alert variant="warning">No hay usuarios para mostrar.</Alert>}
                        
                        <h2>Lista de Usuarios</h2>


                    <Form.Group controlId="limitSelect" className="mb-3">
                        <Form.Label>Usuarios por página:</Form.Label>
                        <Form.Control as="select" value={limit} onChange={handleLimitChange}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        </Form.Control>
                    </Form.Group>

                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Usuario</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.data.map((user, index) => (
                            <tr key={user.id}>
                            <td>{index + 1 + (page * limit - limit)}</td>
                            <td><img src={user.avatar} alt="Avatar" width="40" height="40" /></td>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                {/* <Button variant="danger" href={`/users/admin/${user.id}`}>Ver Detalles</Button> */}
                                <Button 
                                variant={user.status==='Active' ? "warning" : "success"}
                                href="/users/admin"
                                onClick={() => handleToggleUserStatus(user.id, user.status)}>
                                    {
                                        user.status==='Active' ? "Desactivar" : "Activar"
                                    }
                                </Button>{' '}
                                {user.status !== 'Lock' && <Button href="/users/admin" variant="danger" onClick={() => handleDeleteUser(user.id, user.status)}>Eliminar</Button>}
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>

                    <Pagination className="justify-content-center">
                        <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 1} />
                        <Pagination.Item active>{page}/{totalPages}</Pagination.Item>
                        <Pagination.Next onClick={() => handlePageChange(page + 1)} />
                    </Pagination>
                    </div>
            }
        </Container>
    );
}

// export default withAuth(PlayersList);