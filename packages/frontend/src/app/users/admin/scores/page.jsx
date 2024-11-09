'use client'

import LimitChange from 'hst/components/atoms/LimitChange';
import Loading from 'hst/components/atoms/Loading';
import { Danger, Warning } from 'hst/components/atoms/Message';
import Pag from 'hst/components/atoms/Pagination';
import Footer from 'hst/components/molecules/Footer';
import Header from 'hst/components/molecules/Header';
import { useDeleteScoreMutation, useGetAllScoresQuery } from 'hst/store/services/scores.api';
import { useGetUserQuery } from 'hst/store/services/users.api';
import { getToken, parseJwt, validateExpireToken } from 'hst/utils/functions';
import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

const page = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10)
  const { data: dataScore, error: errorScore, isLoading: isLoadingScore } = useGetAllScoresQuery({ page, limit });
  const [updateUser, { isUpdating }] = useDeleteScoreMutation()

  const tokenJwt = parseJwt(getToken());
  const userRoles = tokenJwt?.roles;
  const userId = tokenJwt?.sub;

  const dispatch = useDispatch();

  useEffect(() => {
    validateExpireToken(tokenJwt, dispatch);
  }, [tokenJwt, dispatch]);

  useEffect(() => {
    !isLoadingScore && setTotalPages(dataScore.totalPages)
  }, [dataScore])

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    page <= totalPages && setPage(newPage)
  };

  const handleDelete = (scoreId) => {
    updateUser(scoreId)
  }

  return (
    <>
      <Header roles={userRoles} userId={userId} />
      <Container className="mt-5">
        <h2 className="mb-4">Puntuaciones de Todos los Jugadores</h2>
        {
          errorScore !== undefined ? <Danger error={error} /> :
            isLoadingScore ? <Loading message='Cargando usuarios' /> :
              dataScore.total === 0 ? <Warning message='No hay puntajes para mostrar.' /> :
                <div>
                  <LimitChange limit={limit} onChange={handleLimitChange} />
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Jugador</th>
                        <th>Juego</th>
                        <th>Puntuación</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataScore.data.map((score, index) => (
                        <tr key={index}>
                          <td>{index + 1 + (page * limit - limit)}</td>
                          <td><a href={`scores/${score.userId}`}>{score.userId}</a></td>
                          <td>{score.game}</td>
                          <td>{score.score.toLocaleString()}</td>
                          <td>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(score.scoreId)}
                              href='scores'
                            >
                              Eliminar
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                  <Pag onClick={handlePageChange} page={page} totalPages={totalPages} />
                </div>
        }
      </Container>
      <Footer />
    </>
  )
}

export default page
