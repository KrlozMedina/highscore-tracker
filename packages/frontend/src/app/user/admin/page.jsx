"use client";

import withAuth from "hst/hoc/with-auth";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { useGetUsersQuery } from "hst/store/services/users.api";

export default function PlayersList() {
    const { data, error, isLoading } = useGetUsersQuery();

    return (
        // <p>Hello PlayersList!</p>
        <Container>
            <Row>
                <Col>
                {
                    isLoading ? 'Cargando ...' :
                    <ListGroup>
                        {data && data.length > 0 && data.map((item, index) => (
                            <ListGroup.Item key={item.id}>{index+1}.{item.name}, email {item.email}</ListGroup.Item>
                            // console.log('data', item)
                        ))}
                    </ListGroup>
                }
                </Col>
            </Row>
        </Container>
    );
}

// export default withAuth(PlayersList);