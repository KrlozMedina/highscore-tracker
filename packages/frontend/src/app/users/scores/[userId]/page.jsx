"use client";

// import withAuth from "gsm/hoc/with-auth";
import { Container, Table } from "react-bootstrap";
import { useGetScoreByIdQuery } from "hst/store/services/scores.api";
import { Danger, Warning } from "hst/components/atoms/Message";
import Loading from "hst/components/atoms/Loading";
import LimitChange from "hst/components/atoms/LimitChange";
import { useEffect, useState } from "react";
import Pag from "hst/components/atoms/Pagination";

export default function ScoresList({params}) {
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0)
  
  const { data, error, isLoading } = useGetScoreByIdQuery([params.userId, limit, page]);
  
  useEffect(() => {
      !isLoading && setTotalPages(data.totalPages)
  }, [data])

  const handleLimitChange = (e) => {
      setLimit(Number(e.target.value));
      setPage(1);
  };

  const handlePageChange = (newPage) => {
      page < totalPages && setPage(newPage)
  };

  return (
    <Container>
      <h2>Puntajes por Usuario</h2>
      {
          error !== undefined ? <Danger error={error} /> : 
          isLoading ? <Loading message='Cargando juegos' /> :
          data.total === 0 ? <Warning message='No hay juegos para mostrar.' /> :
          <div>
            {/* <h3>{data.data.username}</h3> */}
            <LimitChange limit={limit} onChange={handleLimitChange} />
            <Table>
              <thead>
              <tr>
                <th>#</th>
                <th>Juego</th>
                <th>Puntaje</th>
              </tr>
              </thead>
              <tbody>
                {data.data.map((score, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{score.game}</td>
                    <td>{score.score}</td>
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

// export default withAuth(ScoresList);