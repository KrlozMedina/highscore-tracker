"use client";

import withAuth from "gsm/hoc/with-auth";

function PlayersList() {
    return (
        <p>Hello PlayersList!</p>
    );
}

export default withAuth(PlayersList);