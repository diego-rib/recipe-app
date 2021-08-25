import React, { useState } from 'react';
import RenderCard from './RenderCard';

function RecipeList() {
  const recipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  const [typeRecipe, setTypeRecipe] = useState('');

  function filterRecipe(type) {
    setTypeRecipe(type);
  }

  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => filterRecipe('') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => filterRecipe('comida') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => filterRecipe('bebida') }
      >
        Drinks
      </button>
      {recipes.lenght > 0
        ? null : <RenderCard filter={ typeRecipe } />}
    </div>
  );
}

export default RecipeList;
