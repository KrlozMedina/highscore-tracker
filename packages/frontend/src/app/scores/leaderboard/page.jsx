"use client"
import withAuth from "hst/hoc/with-auth";
import { Container, Spinner, Table, Alert } from "react-bootstrap";
import { useGetLeaderBoardQuery } from "hst/store/services/scores.api";
import Loading from "hst/components/atoms/Loading";
import { Danger, Warning } from "hst/components/atoms/Message";

export default function LeaderBoard() {
    // document.title = 'LeaderBoard'
    const { data, error, isLoading } = useGetLeaderBoardQuery();    

    return (
        <Container className="mt-5">
            <h2>LeaderBoard - Mejores Puntajes</h2>
            {
                error !== undefined ? <Danger error={error} /> : 
                isLoading ? <Loading message='Cargando LeaderBoard' /> :
                data.total === 0 ? <Warning message='No hay puntujes para mostrar.' /> :
                // console.log(data)
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Usuario</th>
                        <th>Juego</th>
                        <th>Puntaje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.data.map((score, index) => (
                            <tr key={score.id}>
                                <td>{index + 1}</td>
                                <td>{score.username}</td>
                                <td>{score.game}</td>
                                <td>{score.score.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            }
        </Container>
    );
}
// export default withAuth(Leaderboard);