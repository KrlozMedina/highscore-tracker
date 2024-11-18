"use client"
import withAuth from "hst/hoc/with-auth";
import { Container, Spinner, Table, Alert } from "react-bootstrap";
import { useGetLeaderBoardQuery } from "hst/store/services/scores.api";
import Loading from "hst/components/atoms/Loading";
import { Danger, Warning } from "hst/components/atoms/Message";
import { useState, useEffect } from "react";
import LimitChange from "hst/components/atoms/LimitChange";
import Pag from "hst/components/atoms/Pagination";

export default function LeaderBoard() {
  // document.title = 'LeaderBoard'
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { data, error, isLoading } = useGetLeaderBoardQuery([limit, page]);

  useEffect(() => {
    !isLoading && setTotalPages(data.totalPages)
  }, [data])

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    page <= totalPages && setPage(newPage)
  };


  return (
    <Container className="mt-5">
      <h2>LeaderBoard - Mejores Puntajes</h2>
      {
        error !== undefined ? <Danger error={error} /> :
          isLoading ? <Loading message='Cargando LeaderBoard' /> :
            data.total === 0 ? <Warning message='No hay puntujes para mostrar.' /> :
              <div>
                <LimitChange limit={limit} onChange={handleLimitChange} />
                <Table>
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
                <Pag onClick={handlePageChange} page={page} totalPages={totalPages} />
              </div>
      }
    </Container>
  );
}
// export default withAuth(Leaderboard);