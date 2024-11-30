import React, { useState } from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import RecipeList from '../components/RecipeList';
import { fetchRecipes } from '../services/api';
import testResponse from '../testData/testResponse.json';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [odpovedJSON, setOdpovedJSON] = useState('');
  const [textResponse, setTextResponse] = useState('');

  const handleGenerateRecipes = async () => {
    try {
      const fetchedRecipes = await fetchRecipes();
      setRecipes(fetchedRecipes);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleGenerateRecipesJSON = () => {
    try {
      // Předpokládám, že testResponse.choices[0].message.content je textová odpověď
      const responseContent = testResponse.choices[0].message.content;
      setOdpovedJSON(JSON.stringify(testResponse, null, 2)); // Zobrazíme celý JSON kód
      setTextResponse(responseContent); // Textová odpověď pro výpis na stránce
    } catch (error) {
      console.log('Failed to generate recipes from JSON:', error);
    }
  };

  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <Button variant="primary" className="w-100" onClick={handleGenerateRecipes}>
            Generovat recepty z databáze
          </Button>
        </Col>
        <Col>
          <Button variant="warning" className="w-100" onClick={handleGenerateRecipesJSON}>
            Generovat ukázkové recepty z JSON
          </Button>
        </Col>
      </Row>

      {/* Zobrazení odpovědi JSON (kód) */}
      {odpovedJSON && (
        <Row className="mb-4">
          <Col>
            <Card style={{ backgroundColor: '#f5f5f5', padding: '20px' }}>
              <Card.Body>
                <h2>Předpokládaná odpověď JSON</h2>
                <pre
                  style={{
                    marginTop: '20px',
                    whiteSpace: 'pre-wrap', // zachování bílého prostoru a zalamování textu
                    wordWrap: 'break-word',
                    backgroundColor: '#1e1e1e',
                    color: '#d4d4d4',
                    padding: '15px',
                    borderRadius: '5px',
                    overflowX: 'auto',
                    textAlign: 'left',
                  }}
                >
                  {odpovedJSON} {/* Zobrazení formátovaného JSON kódu */}
                </pre>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Zobrazení textové odpovědi */}
      {textResponse && (
        <Row className="mb-4">
          <Col>
            <Card style={{ backgroundColor: '#f5f5f5', padding: '20px' }}>
              <Card.Body>
                <h2>Textová odpověď</h2>
                <p style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', fontSize: '1rem' }}>
                  {textResponse} {/* Textová odpověď vypsaná na stránce */}
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Recipe List */}
      <RecipeList recipes={recipes} />
    </Container>
  );
};

export default Recipes;
