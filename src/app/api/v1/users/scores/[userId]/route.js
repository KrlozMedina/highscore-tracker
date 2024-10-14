// GET /api/v1/users/scores/:userId: Listado de todas las puntuaciones del jugador.

import { NextResponse } from "next/server"
import data from 'hst/mocks/scores.json'

export async function GET(req, res) {
    const userId = res.params.userId
    return NextResponse.json(data)
}