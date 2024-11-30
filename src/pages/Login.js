import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate('/home');
        console.log(user);
      })
      .catch((error) => {
        setError('Špatné přihlašovací údaje');
      });
  }

  return (
    <Container fluid className="d-flex justify-content-center">
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <h1 className="text-center mb-4">Login</h1>
          <Form className="login-form" onSubmit={onLogin}>
            <Form.Group controlId="email-address" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
          {error && (
            <Alert variant="danger">
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
