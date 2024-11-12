"use client";

import Loading from "hst/components/atoms/Loading";
import { Danger, Warning } from "hst/components/atoms/Message";
import { useGetUserQuery } from "hst/store/services/users.api";
import { getToken } from "hst/utils/functions";
import { Container, Card, Button, Form, Image, Spinner } from "react-bootstrap";

export default function UserByAdmin({params}){
  const token = getToken()
  const { data, error, isLoading } = useGetUserQuery([params.userId, token]);

  return (
    <div>
      {
        error !== undefined ? <Danger error={error} /> : 
        isLoading ? <Loading message='Cargando información del usuario' /> :
        data.total === 0 ? <Warning message='No hay información para mostrar.' /> :
        <Container className="mt-5">
          <h2>Detalles del Usuario</h2>
          <div className="d-flex align-items-center mb-4">
            <Image src={data.avatar} alt="Avatar" roundedCircle width="100" height="100" />
            <h4 className="ml-3">{data.username}</h4>
          </div>
          <p><strong>ID:</strong> {params.userId}</p>
          <p><strong>Nombre Completo:</strong> {data.name}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Rol:</strong> {data.roles}</p>
          <p><strong>Estado:</strong> {data.status}</p>
          <Button variant="primary" href="/users/admin">Volver a la lista de usuarios</Button>
        </Container>
      }
    </div>
  );
}