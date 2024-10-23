"use client"
import withAuth from "hst/hoc/with-auth";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { useGetLeaderboardQuery } from "hst/store/services/scores.api";

export default function Leaderboard() {
    const { data, error, isLoading } = useGetLeaderboardQuery();
    return (
        <Container>
            <Row>
                <Col>
                {
                    isLoading ? 'Cargando ...' :
                    <ListGroup>
                        {data && data.length > 0 && data.map((item, index) => (
                            <ListGroup.Item key={item.scoreId}>{index+1}.{item.game}, score {item.score}</ListGroup.Item>
                        ))}
                    </ListGroup>
                }
                </Col>
            </Row>
        </Container>
    );
}
// export default withAuth(Leaderboard);