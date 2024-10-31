import React from 'react'
import { Pagination } from 'react-bootstrap'

const Pag = ({ onClick, page, totalPages }) => {
    return (
        <Pagination className="justify-content-center">
            <Pagination.Prev onClick={() => onClick(page - 1)} disabled={page === 1} />
            <Pagination.Item active>{page}/{totalPages}</Pagination.Item>
            <Pagination.Next onClick={() => onClick(page + 1)} />
        </Pagination>
    )
}

export default Pag
