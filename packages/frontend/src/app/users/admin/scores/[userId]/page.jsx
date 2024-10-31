"use client"

import { useDeleteScoreMutation, useGetScoreByIdQuery } from 'hst/store/services/scores.api'
import React from 'react'
import { Container, Spinner, Table, Button, Alert } from 'react-bootstrap'

const page = (params) => {
    const { data, error, isLoading } = useGetScoreByIdQuery(params.params.userId);
    const [updateUser, { isUpdating }] = useDeleteScoreMutation();

    console.log(params.params.userId)

    const deleteScore = () => {
        // console.log(params.params.userId)
        updateUser(params.params.userId)
    }

    return (
        <Container className="mt-5">
            {/* {isLoading && console.log(data)} */}
            {
                isLoading ?
                    <div className="text-center">
                        <Spinner animation="border" />
                        <p>Cargando usuarios...</p>
                    </div> : 
                    data === null ? 
                    <Alert variant="warning">No hay puntuaciones para mostrar.</Alert> :
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
                                <tr key={data.id}>
                                    <td>1</td>
                                    <td>{data.game}</td>
                                    <td>{data.score}</td>
                                    <td><Button variant='secondary' className='mt-3' onClick={deleteScore} href={`/users/admin/scores/${params.params.userId}`}>Eliminar</Button></td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
            }
        </Container>
    )
}

export default page
