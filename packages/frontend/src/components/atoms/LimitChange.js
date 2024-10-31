import React from 'react'
import { Form } from 'react-bootstrap'

function LimitChange({ limit, onChange }) {
    return (
        <Form.Group controlId="limitSelect" className="mb-3">
            <Form.Label>Datos por página:</Form.Label>

            <Form.Control as="select" value={limit} onChange={onChange}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
            </Form.Control>
        </Form.Group>
    )
}

export default LimitChange
