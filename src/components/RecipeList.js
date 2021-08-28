import React, { useState } from 'react';
import RenderCard from './RenderCard';

function RecipeList() {
  const recipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  const [typeRecipe, setTypeRecipe] = useState('');

  function filterRecipe(type) {
    setTypeRecipe(type);
  }

  return (
    <>
      <div className="favorite-recipes-btns-container">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => filterRecipe('') }
          className="favorite-recipes-filter-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => filterRecipe('comida') }
          className="favorite-recipes-filter-btn"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterRecipe('bebida') }
          className="favorite-recipes-filter-btn"
        >
          Drinks
        </button>
      </div>
      {recipes.lenght > 0
        ? null : <RenderCard filter={ typeRecipe } />}
    </>
  );
}

export default RecipeList;
