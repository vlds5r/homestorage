import React from 'react';
import RecipeItem from './RecipeItem';

const RecipeList = ({ recipes = [] }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
      {recipes.length > 0 ? (
        recipes.map((recipe, index) => <RecipeItem key={index} recipe={recipe} />)
      ) : (
        <p>Žádné generované recepty z databáze k zobrazení</p>
      )}
    </div>
  );
};

export default RecipeList;
