import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loading = ({ message }) => {
    return (
        <div className="text-center">
            <Spinner animation="border" />
            <p>{message}...</p>
        </div>
    )
}

export default Loading
