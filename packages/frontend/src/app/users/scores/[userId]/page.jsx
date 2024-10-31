"use client";

// import withAuth from "gsm/hoc/with-auth";
import { Col, Container, ListGroup, Row, Table } from "react-bootstrap";
import { useGetScoreByIdQuery } from "hst/store/services/scores.api";
import { Danger, Warning } from "hst/components/atoms/Message";
import Loading from "hst/components/atoms/Loading";

export default function ScoresList({params}) {
    // console.log(params)
    const { data, error, isLoading } = useGetScoreByIdQuery(params.userId);
    return (
        <Container>
            <h2>Puntajes por Usuario</h2>
            {
                error !== undefined ? <Danger error={error} /> : 
                isLoading ? <Loading message='Cargando juegos' /> :
                data.total === 0 ? <Warning message='No hay juegos para mostrar.' /> :
                <div>
                    <h3>{data.username}</h3>
                    <Table>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Juego</th>
                            <th>Puntaje</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr key={data.id}>
                            <td>1</td>
                            <td>{data.game}</td>
                            <td>{data.score}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            }
        </Container>
    );
}

// export default withAuth(ScoresList);