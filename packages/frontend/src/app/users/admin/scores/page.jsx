'use client'

import LimitChange from 'hst/components/atoms/LimitChange';
import Loading from 'hst/components/atoms/Loading';
import { Danger, Warning } from 'hst/components/atoms/Message';
import Pag from 'hst/components/atoms/Pagination';
import { useDeleteScoreMutation, useGetAllScoresQuery, useGetScoreByIdQuery } from 'hst/store/services/scores.api';
import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Form } from 'react-bootstrap';

const page = () => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10)
    const { data, error, isLoading } = useGetAllScoresQuery({page, limit});
    const [updateUser, { isUpdating }] = useDeleteScoreMutation()

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

    const handleDelete = (scoreId) => {
        // console.log(scoreId)
        updateUser(scoreId)
    }

    return (
        <Container className="mt-5">
            <h2 className="mb-4">Puntuaciones de Todos los Jugadores</h2>
            {/* {isLoading ? console.log(error) : console.log(data)} */}
            {
                error !== undefined ? <Danger error={error} /> : 
                isLoading ? <Loading message='Cargando usuarios' /> :
                data.total === 0 ? <Warning message='No hay puntajes para mostrar.' /> :
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
                            {data.data.map((score, index) => (
                            <tr key={score.id}>
                                <td>{index + 1 + (page * limit - limit)}</td>
                                <td>{score.username || "N/A"}</td>
                                <td>{score.game}</td>
                                <td>{score.score.toLocaleString()}</td>
                                <td>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(score.id)}
                                    href='scores'
                                >
                                    Eliminar
                                </Button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>

                    {/* <Pagination className="justify-content-center">
                        <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 1} />
                        <Pagination.Item active>{page}/{totalPages}</Pagination.Item>
                        <Pagination.Next onClick={() => handlePageChange(page + 1)} />
                    </Pagination> */}

                    <Pag onClick={handlePageChange} page={page} totalPages={totalPages} />
                </div>
            }
        </Container>
    )
}

export default page
