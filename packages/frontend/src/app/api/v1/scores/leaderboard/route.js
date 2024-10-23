// GET /api/v1/scores/leaderboard: Obtener el ranking global de los mejores jugadores.

import { NextResponse } from "next/server";
import data from 'hst/mocks/scores.json'

export async function GET() {
    return NextResponse.json(data)
}