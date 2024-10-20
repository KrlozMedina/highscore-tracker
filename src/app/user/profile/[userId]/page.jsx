"use client";

import withAuth from "hst/hoc/with-auth";
import { useGetUserQuery } from "hst/store/services/users.api";
import { Col, Container, ListGroup, Row } from "react-bootstrap";

export default function UserDetail({params}){
    const { data, error, isLoading } = useGetUserQuery(params);

    return (
        <Container>
            {
                isLoading ? 'Cargando...' :
                <>
                    <h2>Nombre: {data.name}</h2>
                    <h3>Username: {data.username}</h3>
                    <p>Email: {data.email}</p>
                    <p>Ruta: {params.userId}</p>
                </>
            }
        </Container>
    );
}

// export default withAuth(UserDetail);