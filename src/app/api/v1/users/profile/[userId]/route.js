// GET /api/v1/users/profile/:userId: Obtener el perfil del jugador autenticado.
// PUT /api/v1/users/profile/:userId: data para modificar el jugador.

import { NextResponse } from "next/server";
import data from 'hst/mocks/users.json'

export async function GET(req, res) {
  const userId = res.pa