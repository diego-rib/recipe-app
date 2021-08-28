import React, { useState } from 'react';
import DoneRecipesRender from './DoneRecipesRender';

function ReadyRecipeList() {
  const [typeRecipe, setTypeRecipe] = useState('');

  function filterRecipe(type) {
    setTypeRecipe(type);
  }

  return (
    <>
      <div className="done-recipes-btns-container">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => filterRecipe('') }
          className="done-recipes-filter-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => filterRecipe('comida') }
          className="done-recipes-filter-btn"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterRecipe('bebida') }
          className="done-recipes-filter-btn"
        >
          Drinks
        </button>
      </div>
      <DoneRecipesRender filter={ typeRecipe } />
    </>
  );
}

export default ReadyRecipeList;
