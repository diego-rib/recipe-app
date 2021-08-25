import React from 'react';
import Header from '../components/Header';
import ReadyRecipeList from '../components/ReadyRecipeList';

function ReadyRecipe() {
  return (
    <div>
      <Header title="Receitas Feitas" showButton={ false } />
      <ReadyRecipeList />
    </div>
  );
}

export default ReadyRecipe;
