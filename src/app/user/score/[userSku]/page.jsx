"use client";

import withAuth from "gsm/hoc/with-auth";

function ScoresList({params}) {
    return (
        <p>Hello ScoresList!</p>
    );
}

export default withAuth(ScoresList);