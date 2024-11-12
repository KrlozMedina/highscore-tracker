'use client'

import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { validateExpireToken, getToken, parseJwt, logOutSession } from 'hst/utils/functions';
import Header from 'hst/components/molecules/Header';
import Footer from 'hst/components/molecules/Footer';

export default function Dashboard() {
  const dispatch = useDispatch();
  const tokenJwt = parseJwt(getToken());
  const userRoles = tokenJwt?.roles;
  const userId = tokenJwt?.sub
  const isAdmin = userRoles?.includes('ADMIN');
  const isPlayer = userRoles?.includes('PLAYER');

  useEffect(() => {
    validateExpireToken(tokenJwt, dispatch);
  }, [])

  return (
    <>
      <Header roles={userRoles} userId={userId} />
      <main className="my-5">
        <Container>
          <h1 className="text-center">Bienvenido al Dashboard</h1>
          <div className="text-center mb-4">
            <Button variant="danger" onClick={() => logOutSession(dispatch)}>
              Cerrar Sesión
            </Button>
          </div>
          {isAdmin && <AdminDashboard />}
          {isPlayer && <PlayerDashboard userId={userId} />}
        </Container>
      </main>
      <Footer />
    </>
  );
}

// Componente específico para el dashboard del Admin
const AdminDashboard = () => (
  <Row>
    <Col md={6}>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Gestión de Usuarios</Card.Title>
          <Card.Text>
            Administra la información de los usuarios, asigna roles y realiza otras configuraciones administrativas.
          </Card.Text>
          <Button href='/users/admin' variant="primary">Ir a Gestión de Usuarios</Button>
        </Card.Body>
      </Card>
    </Col>
    <Col md={6}>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Gestión de scores</Card.Title>
          <Card.Text>
            Administra las puntuaciones.
          </Card.Text>
          <Button href='/users/admin/scores' variant="primary">Ir a Gestión de Scores</Button>
        </Card.Body>
      </Card>
    </Col>
  </Row>
);

// Componente específico para el dashboard del Player
const PlayerDashboard = (userId) => (
  <Row>
    <Col md={6}>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Mis Puntuaciones</Card.Title>
          <Card.Text>
            Consulta tus puntuaciones, analiza tu rendimiento y mejora tus habilidades.
          </Card.Text>
          <Button href={`/users/scores/${userId.userId}`} variant="success">Ver Mis Puntuaciones</Button>
        </Card.Body>
      </Card>
    </Col>
    <Col md={6}>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Ranking Global</Card.Title>
          <Card.Text>
            Consulta el ranking global y compara tu rendimiento con otros jugadores.
          </Card.Text>
          <Button href='/scores/leaderboard' variant="success">Ver Ranking Global</Button>
        </Card.Body>
      </Card>
    </Col>
  </Row>
);
