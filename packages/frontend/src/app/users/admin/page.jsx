"use client";

import React, { useEffect, useState } from 'react';
import withAuth from "hst/hoc/with-auth";
import { Container, Table, Button } from "react-bootstrap";
import { useGetUsersQuery, useEnableUserMutation, useLockUserMutation } from "hst/store/services/users.api";
import { useSelector } from "react-redux";
import { selectToken } from "hst/store/slices/token.slices";
import Loading from "hst/components/atoms/Loading";
import { Danger, Warning } from "hst/components/atoms/Message";
import LimitChange from "hst/components/atoms/LimitChange";
import Pag from "hst/components/atoms/Pagination";
import Header from 'hst/components/molecules/Header';
import Footer from 'hst/components/molecules/Footer';
import { getToken, parseJwt, validateExpireToken } from 'hst/utils/functions';
import { useDispatch } from 'react-redux';

export default function PlayersList() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const token = useSelector(selectToken);
  const { data, error, isLoading } = useGetUsersQuery([{ page, limit }, token]);
  const [enableUser] = useEnableUserMutation();
  const [lockUser] = useLockUserMutation();
  const tokenJwt = parseJwt(getToken());
  const userRoles = tokenJwt?.roles;
  const userId = tokenJwt?.sub;

  const dispatch = useDispatch();

  useEffect(() => {
    validateExpireToken(tokenJwt, dispatch);
  }, [tokenJwt, dispatch]);

  useEffect(() => {
    !isLoading && setTotalPages(data.totalPages);
  }, [data]);

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    page <= totalPages && setPage(newPage);
  };

  return (
    <>
      <Header roles={userRoles} userId={userId} />
      <Container className="mt-5">
        <h2>Lista de Usuarios</h2>
        {
          error ? <Danger error={error} /> :
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
                  <tr key={index}>
                    <td>{index + 1 + (page * limit - limit)}</td>
                    <td><img src={user.avatar} alt="Avatar" width="40" height="40" /></td>
                    <td><a href={`/users/admin/${user.userId}`}>{user.name}</a></td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.roles.map((role, index) => <p key={index}>{role}</p>)}</td>
                    <td>
                      <Button
                        variant={user.status === 'ACTIVE' ? "warning" : "success"}
                        href="/users/admin"
                        onClick={() => enableUser([user.userId, token])}>
                        {user.status === 'ACTIVE' ? "Desactivar" : "Activar"}
                      </Button>
                      {user.status !== 'INACTIVE' &&
                        <Button
                          href="/users/admin"
                          variant="danger"
                          onClick={() => lockUser([user.userId, token])}>
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
      <Footer />
    </>
  );
}