// GET /api/v1/users/admin: Listar y gestionar jugadores (solo admin).

import { NextResponse } from "next/server";
import data from 'hst/mocks/users.json'

export async function GET() {
    return NextResponse.json(data)
}