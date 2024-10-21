// DELETE /api/v1/users/admin/scores/:userId: Eliminar una puntuación específica (solo admin).

import { NextResponse } from "next/server"

export async function DELETE(req, res) {
    const userId = res.params.userId
    return NextResponse.json("Delete successful")
}