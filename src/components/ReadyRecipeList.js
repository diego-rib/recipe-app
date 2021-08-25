import React, { useState } from 'react';
import DoneRecipesRender from './DoneRecipesRender';

function ReadyRecipeList() {
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
      <DoneRecipesRender filter={ typeRecipe } />
    </div>
  );
}

export default ReadyRecipeList;
