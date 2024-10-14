// PATCH /api/v1/users/admin/:userId: habilitar o bloquear usuarios (solo admin).
// DELETE /api/v1/users/admin/:userId: Eliminar usuarios (solo admin).

import { NextResponse } from "next/server"
import data from 'hst/mocks/users.json'

export async function PATCH(req, res) {
    const userId = res.params.userId
    return NextResponse.json(data, {status: 200})
}

export async function DELETE(req, res) {
    const userId = res.params.userId
    return NextResponse.json('Delete Successful')
}