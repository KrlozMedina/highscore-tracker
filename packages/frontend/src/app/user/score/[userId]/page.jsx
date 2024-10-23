"use client";

// import withAuth from "gsm/hoc/with-auth";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { useGetScoresQuery } from "hst/store/services/scores.api";

export default function ScoresList({params}) {
  const { data, error, isLoading } = useGetScoresQuery(params);
  return (
      <Container>
          {
              isLoading ? 'Cargando...' :
              <>
                  <h2>Juego: {data.game}</h2>
                  <p>Puntuación: {data.score}</p>
              </>
          }
      </Container>
  );
}

// export default withAuth(ScoresList);