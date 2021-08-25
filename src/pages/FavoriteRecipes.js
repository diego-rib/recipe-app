import React from 'react';
import Header from '../components/Header';
import RecipeList from '../components/RecipeList';

function FavoriteRecipes() {
  return (
    <div>
      <Header title="Receitas Favoritas" showButton={ false } />
      <RecipeList />
    </div>
  );
}

export default FavoriteRecipes;
