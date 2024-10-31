"use client";

import withAuth from "hst/hoc/with-auth";
import { Container, Table, Button, Spinner, Form, Pagination, Alert } from "react-bootstrap";
import { useGetUsersQuery, useUpdateUserMutation } from "hst/store/services/users.api";
import { useEffect, useState } from "react";
import Loading from "hst/components/atoms/Loading";
import { Danger, Warning } from "hst/components/atoms/Message";
import LimitChange from "hst/components/atoms/LimitChange";
import Pag from "hst/components/atoms/Pagination";

export default function PlayersList() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10)
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
            <h2>Lista de Usuarios</h2>
            {
                error !== undefined ? <Danger error={error} /> : 
                isLoading ? <Loading message='Cargando usuarios' /> :
                data.total === 0 ? <Warning message='No hay usuarios para mostrar.' /> :
                <div>
                    <LimitChange limit={limit} onChange={handleLimitChange} />
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
                                        <Button 
                                        variant={user.status==='Active' ? "warning" : "success"}
                                        href="/users/admin"
                                        onClick={() => handleToggleUserStatus(user.id, user.status)}>
                                            {user.status==='Active' ? "Desactivar" : "Activar"}
                                        </Button>
                                        {user.status !== 'Lock' && 
                                        <Button href="/users/admin" 
                                        variant="danger" 
                                        onClick={() => handleDeleteUser(user.id, user.status)}>
                                            Eliminar
                                        </Button>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Pag onClick={handlePageChange} page={page} totalPages={totalPages} />
                </div>
            }
        </Container>
    );
}

// export default withAuth(PlayersList);