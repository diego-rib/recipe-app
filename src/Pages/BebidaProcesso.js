import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';
import nonFavoriteIcon from '../images/whiteHeartIcon.svg';

import RenderIngredientCheckBox from '../components/RenderIngredientCheckBox';

const copy = require('clipboard-copy');
//  implementar risco nos ingredientes

const getIngredients2 = (obj, type) => {
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  const indexes = keys.reduce(((arr, key, index) => {
    if (key.includes(type)) return [...arr, index];
    return arr;
  }), []);
  const response = [];
  indexes.forEach((ind, index) => {
    if (!['', ' ', null].includes(values[ind])) {
      const tag = (
        <RenderIngredientCheckBox
          index={ index }
          values={ values[ind] }
          id={ obj.idDrink }
        />
      );
      response.push(tag);
    }
  });
  return response;
};

const deleteFavorite = (idRecipe) => {
  const arrayStoraged = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const arrayToStorage = arrayStoraged.filter(({ id }) => id !== idRecipe);
  localStorage.setItem('favoriteRecipes', JSON.stringify(arrayToStorage));
};

const setFavorite = (recipe) => {
  const { strDrinkThumb, strDrink, idDrink, strCategory, strAlcoholic } = recipe;

  const objToStorage = {
    id: idDrink,
    type: 'bebida',
    area: '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
  };
  const arrayStoraged = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const arrayToStorage = [...arrayStoraged, objToStorage];
  localStorage.setItem('favoriteRecipes', JSON.stringify(arrayToStorage));
};

const verifyFavorite = () => {
  const { pathname } = window.location;
  const recipeID = pathname.split('/')[2];
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  return favorites.some(({ id }) => id === recipeID);
};

function BebidaProcesso() {
  const { disabledButton } = useSelector((state) => state.fetchReceitas);
  const [recipe, setRecipe] = useState({});
  const [copyOk, setCopyOk] = useState(false);
  const [isFavorite, setIsFavorite] = useState(verifyFavorite());

  const fetchUrl = (url) => {
    fetch(url)
      .then((data) => data.json())
      .then((recipeData) => setRecipe(recipeData.drinks[0]));
  };

  useEffect(() => {
    const { pathname } = window.location;
    const recipeID = pathname.split('/')[2];
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeID}`;
    fetchUrl(URL);
  }, []);

  if (Object.keys(recipe).length === 0) {
    return <p>Loading..</p>;
  }

  const guide = () => {
    if (isFavorite) {
      deleteFavorite(recipe.idDrink);
      setIsFavorite(false);
    } else {
      setFavorite(recipe);
      setIsFavorite(true);
    }
  };

  function handleDoneRecipe() {
    const { strDrinkThumb, strDrink, idDrink, strCategory, strAlcoholic } = recipe;

    const currentDate = new Date(Date.now()).toLocaleString().split(',')[0];

    const newDrinkDone = {
      id: idDrink,
      type: 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
      doneDate: currentDate, //  implementar função para buscar tempo
      tags: '',
    };

    let currentDoneRecipesStoraged = [];
    if (localStorage.getItem('doneRecipes')) {
      currentDoneRecipesStoraged = JSON.parse(localStorage.getItem('doneRecipes'));
      localStorage.setItem('doneRecipes',
        JSON.stringify([...currentDoneRecipesStoraged, newDrinkDone]));
    } else {
      localStorage.setItem('doneRecipes',
        JSON.stringify([...currentDoneRecipesStoraged, newDrinkDone]));
    }
  }

  return (
    <div>
      <img
        src={ recipe.strDrinkThumb }
        alt={ recipe.strDrink }
        data-testid="recipe-photo"
        width="100%"
      />
      <section className="details-header">
        <span className="name-category-container">
          <h2 data-testid="recipe-title">{ recipe.strDrink }</h2>
          <p data-testid="recipe-category">{ recipe.strAlcoholic }</p>
        </span>
        <span className="copy-favorite-btn-container">
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => {
              copy(`http://localhost:3000/bebidas/${recipe.idDrink}`);
              setCopyOk(true);
            } }
          >
            <img src={ shareIcon } alt="share" />
          </button>
          { copyOk && <p>Link copiado!</p> }
          <button
            type="button"
            onClick={ guide }
          >
            <img
              src={ isFavorite ? favoriteIcon : nonFavoriteIcon }
              data-testid="favorite-btn"
              alt="share"
              width="100%"
            />
          </button>
        </span>
      </section>
      <section className="details-ingredients-container">
        <h3>Ingredients</h3>
        { getIngredients2(recipe, 'strIngredient') }
      </section>
      <section className="instructions-container progress-recipes">
        <h3>Instructions</h3>
        <p data-testid="instructions">{ recipe.strInstructions }</p>
      </section>
      <span className="go-to-progress">
        <Link to="/receitas-feitas">
          <button
            disabled={ disabledButton }
            type="button"
            data-testid="finish-recipe-btn"
            onClick={ handleDoneRecipe }
          >
            Finalizar Receita
          </button>
        </Link>
      </span>
    </div>
  );
}

export default BebidaProcesso;
