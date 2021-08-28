import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { RiArrowGoBackFill as GoBackBtn } from 'react-icons/ri';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

import RecommendMeal from '../components/RecommendMeal';
import {
  checkDoneRecipes,
  checkInProgressDrinks,
  checkFavorite } from '../services/localStorageChecks';
import { handleFavoriteDrinkBtn } from '../services/favoriteButton';
import getIngredients from '../services/getIngredients';

import '../styles/RecipeDetails.css';

const copy = require('clipboard-copy');

export default function DetalhesBebida({ match, history }) {
  const { id } = match.params;
  const [drink, setDrink] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [isFavorite, setFavorite] = useState(false);
  const [copied, setCopied] = useState(false);
  const cardLimit = 6;

  useEffect(() => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
      .then((response) => {
        response.json()
          .then((data) => {
            setDrink(data.drinks[0]);
            setFavorite(checkFavorite(id));
          });
      });
  }, [id]);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => {
        response.json()
          .then(({ meals }) => setRecommendations(meals.slice(0, cardLimit)));
      });
  }, []);

  function handleShareBtn() {
    copy(window.location.href);
    setCopied(true);
    const TWO_SECONDS = 2000;
    setTimeout(() => {
      setCopied(false);
    }, TWO_SECONDS);
  }

  const ingredients = getIngredients(drink);

  const loading = !drink.idDrink && recommendations.length > 0;

  const isDone = checkDoneRecipes(id);
  const btnMessage = checkInProgressDrinks(id);

  return (
    loading
      ? (
        <div className="spinner-border">
          <p className="visually-hidden" />
        </div>
      )
      : (
        <div className="recipe-details-page">
          <button
            type="button"
            className="go-home-button"
            onClick={ () => history.push('/bebidas') }
          >
            <GoBackBtn size="1.5em" />
          </button>
          <img
            data-testid="recipe-photo"
            alt=""
            src={ drink.strDrinkThumb }
            className="details-img"
          />
          <p
            data-testid="recipe-title"
            className="details-title"
          >
            {drink.strDrink}
          </p>
          <div className="title-interactions-wrapper">
            <p
              data-testid="recipe-category"
              className="details-category"
            >
              {drink.strAlcoholic}
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
                  handleFavoriteDrinkBtn(isFavorite, drink);
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
                ingredients.map((ingredient, index) => (
                  <p
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {`- ${ingredient}`}
                  </p>
                ))
              }
            </div>
          </div>
          <div className="details-section-container">
            <p className="details-section-title">Instruções</p>
            <p
              data-testid="instructions"
              className="details-section-list"
            >
              {drink.strInstructions}
            </p>
          </div>
          <RecommendMeal items={ recommendations } />
          {
            isDone
              ? null
              : (
                <Link
                  to={ `/bebidas/${id}/in-progress` }
                >
                  <button
                    type="button"
                    className="start-recipe-btn"
                    data-testid="start-recipe-btn"
                  >
                    {btnMessage}
                  </button>
                </Link>
              )
          }
          <div className="clear-start-recipe-btn" />
        </div>
      )
  );
}

DetalhesBebida.propTypes = {
  match: {
    params: {
      id: PropTypes.number,
    },
  },
}.isRequired;
