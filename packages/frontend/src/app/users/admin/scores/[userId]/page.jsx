"use client"

import Loading from 'hst/components/atoms/Loading'
import { Danger, Warning } from 'hst/components/atoms/Message'
import { useDeleteScoreMutation, useGetScoreByIdQuery } from 'hst/store/services/scores.api'
import React from 'react'
import { Container, Spinner, Table, Button, Alert } from 'react-bootstrap'

const page = (params) => {
    const { data, error, isLoading } = useGetScoreByIdQuery([params.params.userId, 10, 1]);
    const [updateUser, { isUpdating }] = useDeleteScoreMutation();

    const deleteScore = (scoreId) => {
        updateUser(scoreId)
    }

    return (
        <Container className="mt-5">
            {
                error !== undefined ? <Danger error={error} /> : 
                isLoading ? <Loading message='Cargando información del usuario' /> :
                data.total === 0 ? <Warning message='No hay información para mostrar.' /> :
                <div>
                    <h2 className='mb-4'>Puntuaciones del Usuario {data.username}</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Juego</th>
                                <th>Puntuación</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data.map((score, index) => (
                                <tr key={index + 1}>
                                    <td>{index}</td>
                                    <td>{score.game}</td>
                                    <td>{score.score}</td>
                                    <td><Button variant='secondary' className='mt-3' onClick={() => deleteScore(score.scoreId)} href={`/users/admin/scores/${params.params.userId}`}>Eliminar</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            }
        </Container>
    )
}

export default page
