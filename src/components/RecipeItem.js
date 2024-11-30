import React from 'react';

const RecipeItem = ({ recipe }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <h3>{recipe.title}</h3>
      <p>{recipe.instructions}</p>
    </div>
  );
};

export default RecipeItem;
