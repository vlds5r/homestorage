import React from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';

export default function ItemForm({
  inputName,
  setInputName,
  inputType,
  setInputType,
  inputQuantity,
  setInputQuantity,
  inputPurchased,
  setInputPurchased,
  inputExpire,
  setInputExpire,
  handleSubmit,
  isEditing,
}) {
  return (
    <Container className='d-flex justify-content-center'>
      <Form onSubmit={handleSubmit}>
        {/* Název */}
        <Row className="mb-3">
          <Col xs={12}>
            <Form.Group controlId="formName">
              <Form.Label>Název</Form.Label>
              <Form.Control
                type="text"
                placeholder="Název..."
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Typ */}
        <Row className="mb-3">
          <Col xs={12}>
            <Form.Group controlId="formType">
              <Form.Label>Typ</Form.Label>
              <Form.Control
                as="select"
                value={inputType}
                onChange={(e) => setInputType(e.target.value)}
                required
              >
                <option value="">Typ...</option>
                <option value="Ovoce">Ovoce</option>
                <option value="Zelenina">Zelenina</option>
                <option value="Maso">Maso</option>
                <option value="Těstoviny">Těstoviny</option>
                <option value="Mléčné výrobky">Mléčné výrobky</option>
                <option value="Pití">Pití</option>
                <option value="Ostatní">Ostatní</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        {/* Počet */}
        <Row className="mb-3">
          <Col xs={12}>
            <Form.Group controlId="formQuantity">
              <Form.Label>Počet</Form.Label>
              <Form.Control
                type="number"
                placeholder="Počet..."
                value={inputQuantity}
                onChange={(e) => setInputQuantity(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Koupeno */}
        <Row className="mb-3">
          <Col xs={12}>
            <Form.Group controlId="formPurchased">
              <Form.Label>Koupeno</Form.Label>
              <Form.Control
                type="date"
                value={inputPurchased}
                onChange={(e) => setInputPurchased(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Expirace */}
        <Row className="mb-3">
          <Col xs={12}>
            <Form.Group controlId="formDateExpire">
              <Form.Label>Expirace</Form.Label>
              <Form.Control
                type="date"
                value={inputExpire}
                onChange={(e) => setInputExpire(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Tlačítko */}
        <Button
          type="submit"
          variant={isEditing ? 'warning' : 'primary'}
          className="mt-3"
        >
          {isEditing ? 'Uložit' : 'Přidat'}
        </Button>
      </Form>
    </Container>
  );
}
