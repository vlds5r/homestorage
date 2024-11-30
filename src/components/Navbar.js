import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { Link } from 'react-router-dom'; // Import Link pro navigaci

const NavbarComponent = () => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
    }, []);

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/home">HomeStorage</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    {user ? (
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/home">Databáze</Nav.Link>
                            <Nav.Link as={Link} to="/recipes">Recepty</Nav.Link>
                        </Nav>
                    ) : null}
                    {user ? (
                        <Nav className="ms-auto">
                            <Nav.Item as={Button} onClick={() => auth.signOut()}>Odhlásit</Nav.Item>
                        </Nav>
                    ) : null}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;
