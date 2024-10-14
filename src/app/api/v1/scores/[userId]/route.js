// POST /api/v1/scores/:userId: Añadir una nueva puntuación desde el videojuego.

import { NextResponse } from "next/server"
import data from 'hst/mocks/scores.json'

export async function POST(req, res) {
    const userId = res.params.userId
    console.log(userId)
    return NextResponse.json(data, {status:201})
}