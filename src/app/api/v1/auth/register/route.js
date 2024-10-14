// POST /api/v1/auth/register: Registro de un nuevo jugador.

import { NextResponse } from "next/server";
import data from 'hst/mocks/users.json'

export async function POST() {
    return NextResponse.json(data[5], {status: 201})
}