"use client";

import { useGetUserQuery } from "hst/store/services/users.api";
import { Container, Card, Button, Form, Image, Spinner } from "react-bootstrap";

export default function UserByAdmin({params}){
  const { data, error, isLoading } = useGetUserQuery(params.userId);

  return (
    <div>
      {
        isLoading 
        ?
        <div className="text-center">
          <Spinner animation="border" />
          <p>Cargando usuarios...</p>
        </div> 
        :
        <Container className="mt-5">
          <h2>Detalles del Usuario</h2>
          <div className="d-flex align-items-center mb-4">
            <Image src={data.avatar} alt="Avatar" roundedCircle width="100" height="100" />
            <h4 className="ml-3">{data.username}</h4>
          </div>
          <p><strong>ID:</strong> {data.id}</p>
          <p><strong>Nombre Completo:</strong> {data.name}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Rol:</strong> {data.role}</p>
          <p><strong>Estado:</strong> {data.status}</p>
          <Button variant="primary" href="/users/admin">Volver a la lista de usuarios</Button>
        </Container>
      }
    </div>
  );
}