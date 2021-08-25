import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useCurrentMealRecipe } from '../hooks/useCurrentRecipe';
import { checkFavorite } from '../services/localStorageChecks';
import { handleFavoriteMealBtn } from '../services/favoriteButton';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

import '../styles/EmProgresso.css';

const copy = require('clipboard-copy');

export default function ComidaEmProgresso({ match }) {
  const { id } = match.params;
  const [currentMealRecipe,
    ingredients,
    checked,
    handleCheck,
    recipeDone,
    setRecipeDone,
    handleDoneRecipe] = useCurrentMealRecipe(id);
  const [isFavorite, setFavorite] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleShareBtn() {
    copy(`${window.location.origin}/comidas/${id}`);
    setCopied(true);
  }

  function redirect() {
    handleDoneRecipe();
    return <Redirect to="/receitas-feitas" />;
  }

  useEffect(() => {
    setFavorite(checkFavorite(id));
  }, [id]);

  return (
    <div>
      { recipeDone ? redirect() : null }
      <img
        alt=""
        src={ currentMealRecipe.strMealThumb }
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-title">{currentMealRecipe.strMeal}</p>
      <p data-testid="recipe-category">{currentMealRecipe.strCategory}</p>
      { copied ? <p>Link copiado!</p> : null }
      <button
        type="button"
        onClick={ handleShareBtn }
      >
        <img
          data-testid="share-btn"
          alt="Toque para copiar o link da receita para o clipboard"
          src={ shareIcon }
        />
      </button>
      <button
        type="button"
        onClick={ () => {
          handleFavoriteMealBtn(isFavorite, currentMealRecipe);
          setFavorite(!isFavorite);
        } }
      >
        <img
          data-testid="favorite-btn"
          alt="Toque para favoritar esta receita"
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        />
      </button>
      {
        ingredients.map((ingredient, index) => {
          const check = checked.includes(index);
          const dashed = check ? 'ingredient-done' : '';
          return (
            <div key={ index }>
              <label
                data-testid={ `${index}-ingredient-step` }
                className={ dashed }
                htmlFor={ `${index}-ingredient-step` }
              >
                <input
                  type="checkbox"
                  id={ `${index}-ingredient-step` }
                  checked={ check }
                  onChange={ () => handleCheck(index) }
                />
                { ingredient }
              </label>
            </div>
          );
        })
      }
      <p data-testid="instructions">{currentMealRecipe.strInstructions}</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ checked.length !== ingredients.length }
        onClick={ () => setRecipeDone(true) }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

ComidaEmProgresso.propTypes = {
  match: {
    params: {
      id: PropTypes.number,
    },
  },
}.isRequired;
