import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RiArrowGoBackFill as GoBackBtn } from 'react-icons/ri';
import { useCurrentMealRecipe } from '../hooks/useCurrentRecipe';
import { checkFavorite } from '../services/localStorageChecks';
import { handleFavoriteMealBtn } from '../services/favoriteButton';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

import '../styles/RecipeDetails.css';

const copy = require('clipboard-copy');

export default function ComidaEmProgresso({ match, history }) {
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
    <div className="in-progress-recipe-page">
      { recipeDone ? redirect() : null }
      <button
        type="button"
        className="go-home-button"
        onClick={ () => history.push(`/comidas/${id}`) }
      >
        <GoBackBtn size="1.5em" />
      </button>
      <img
        alt=""
        src={ currentMealRecipe.strMealThumb }
        data-testid="recipe-photo"
        className="details-img"
      />
      <p
        data-testid="recipe-title"
        className="details-title"
      >
        {currentMealRecipe.strMeal}
      </p>
      <div className="title-interactions-wrapper">
        <p
          data-testid="recipe-category"
          className="details-category"
        >
          {currentMealRecipe.strCategory}
        </p>
        { copied ? <p className="link-warning">Link copiado!</p> : null }
        <div>
          <button
            type="button"
            onClick={ handleShareBtn }
            className="interaction-btn"
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
            className="interaction-btn"
          >
            <img
              data-testid="favorite-btn"
              alt="Toque para favoritar esta receita"
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            />
          </button>
        </div>
      </div>
      <div className="details-section-container">
        <p className="details-section-title">Ingredientes:</p>
        <div className="details-section-list">
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
        </div>
      </div>
      <div className="details-section-container">
        <p className="details-section-title">Instruções</p>
        <p
          data-testid="instructions"
          className="details-section-list"
        >
          {currentMealRecipe.strInstructions}
        </p>
      </div>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        className="finish-recipe-btn"
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
