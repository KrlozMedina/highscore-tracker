// POST /api/v1/auth/login: Inicio de sesión y generación de token JWT.

import { NextResponse } from "next/server";
import data from 'hst/mocks/users.json'

export async function POST() {
    return NextResponse.json(data[5], {status: 201})
}