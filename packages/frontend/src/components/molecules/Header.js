import { logOutSession } from "hst/utils/functions";
import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";

const Header = ({ roles, userId }) => {
  const dispatch = useDispatch();

  return (
    <>
      {roles && (
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="/">HighScore Tracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>

                {/* Opciones para ADMIN */}
                {roles?.includes("ADMIN") && (
                  <>
                    <Nav.Link href="/users/admin">Manage Users</Nav.Link>
                    <Nav.Link href="/users/admin/scores">
                      Manage Scores
                    </Nav.Link>
                  </>
                )}

                {/* Opciones para PLAYER */}
                {roles?.includes("PLAYER") && (
                  <>
                    <Nav.Link href={`/users/profile/${userId}`}>
                      Profile
                    </Nav.Link>
                    <Nav.Link href={`/scores/${userId}`}>Registrar Score</Nav.Link>
                  </>
                )}

                <Nav.Link onClick={() => logOutSession(dispatch)}>
                  Logout
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </>
  );
};

export default Header;
