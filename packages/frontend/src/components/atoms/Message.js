import React from 'react'
import { Alert } from 'react-bootstrap'

const Danger = ({error}) => {
    return (
        <Alert variant="danger">
            {error.data.error}
        </Alert>
    )
}

const Warning = ({ message }) => {
    return (
        <Alert variant="warning">
            {message}
        </Alert>
    )
}

export { Danger, Warning }
