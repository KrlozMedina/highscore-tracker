"use client"
import withAuth from "hst/hoc/with-auth";
import { Container, Spinner, Table, Alert } from "react-bootstrap";
import { useGetBestScoresQuery} from "hst/store/services/scores.api";
import Loading from "hst/components/atoms/Loading";
import { Danger, Warning } from "hst/components/atoms/Message";
import { useState, useEffect } from "react";
import MainTemplate from "hst/components/templates/MainTemplate";

export default function BestScores(params) {
    const { data, error, isLoading } = useGetBestScoresQuery(params.searchParams.game);
    return (
        <MainTemplate className="mt-5">
            {console.log(data)}
            {console.log(params.searchParams.game)}
        </MainTemplate>
    );
}